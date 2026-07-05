// ── MW Portfolio Proxy Worker ──
// Secrets (Cloudflare Dashboard → Workers → mw-portfolio → Settings → Variables):
//   FINNHUB_KEY    → Finnhub API Key
//   ETORO_API_KEY  → eToro Public API Key
//   ETORO_USER_KEY → eToro User Key (Scope: Read)
//
// KV Namespace:
//   CACHE          → Instrument-Metadaten-Cache (24h TTL)

// Erlaubte Origins: nur deine eigene Domain + lokale Entwicklung
const ALLOWED_ORIGINS = [
  'https://marvin-wegener.de',
  'https://www.marvin-wegener.de',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin':  allowed,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
    'Content-Type': 'application/json',
  };
}

// Preisendpunkte sind öffentlich (nur Marktdaten) — kein Origin-Check nötig
const PUBLIC_CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const ok     = (data, hdrs=PUBLIC_CORS) => new Response(JSON.stringify(data),        { headers: hdrs });
const fail   = (msg, s=502)             => new Response(JSON.stringify({error:msg}),  { status: s, headers: PUBLIC_CORS });
const deny   = ()                       => new Response(JSON.stringify({error:'Forbidden'}), { status: 403, headers: PUBLIC_CORS });

// Erkennt europäische Börsenticker (Kurs bereits in EUR → kein USD-Umrechnung nötig)
const EU_SUFFIX = /\.(DE|AS|PA|MC|CO|ST|MI|VX|HE|OL|LI|BR|LS|AT|BE|PR|WA)$/i;
const isEuroTicker = t => EU_SUFFIX.test(t);

function etoroHeaders(env) {
  return {
    'x-api-key':    env.ETORO_API_KEY,
    'x-user-key':   env.ETORO_USER_KEY,
    'x-request-id': crypto.randomUUID(),
  };
}

// Einzelkurs via Finnhub (US-Aktien, USD)
async function finnhubQuote(ticker, key) {
  try {
    const r = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(ticker)}&token=${key}`
    );
    const d = await r.json();
    if (d.error || !d.c) return { c: 0, pc: 0 };
    return { c: d.c, pc: d.pc ?? 0 };
  } catch { return { c: 0, pc: 0 }; }
}

// Einzelkurs via Yahoo Finance (EU-Aktien/ETFs, direkt in EUR)
async function yahooQuote(ticker) {
  try {
    const r = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=1d`,
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; mw-portfolio/1.0)' } }
    );
    const d    = await r.json();
    const meta = d?.chart?.result?.[0]?.meta;
    if (!meta?.regularMarketPrice) return { c: 0, pc: 0 };
    return { c: meta.regularMarketPrice, pc: meta.previousClose ?? meta.chartPreviousClose ?? 0 };
  } catch { return { c: 0, pc: 0 }; }
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

    const { pathname, searchParams } = new URL(request.url);

    // ── GET /prices?tickers=NVDA,MSFT,IUSQ.DE ──
    // US-Ticker → Finnhub, EU-Ticker → Yahoo Finance, EUR/USD → frankfurter.app
    if (pathname === '/prices') {
      const tickers = (searchParams.get('tickers') ?? '').split(',').filter(Boolean);
      if (!tickers.length) return ok({ prices: {}, eurUsd: null });

      const usTickers = tickers.filter(t => !isEuroTicker(t));
      const euTickers = tickers.filter(t =>  isEuroTicker(t));

      const [usResults, euResults, fxData] = await Promise.all([
        Promise.all(usTickers.map(async t => [t, await finnhubQuote(t, env.FINNHUB_KEY)])),
        Promise.all(euTickers.map(async t => [t, await yahooQuote(t)])),
        fetch('https://api.frankfurter.app/latest?from=USD&to=EUR').then(r => r.json()).catch(() => null),
      ]);

      return ok({
        prices: Object.fromEntries([...usResults, ...euResults]),
        eurUsd: fxData?.rates?.EUR ?? null,
      });
    }

    // ── GET /crypto?ids=bitcoin,ethereum,ripple ──
    if (pathname === '/crypto') {
      const ids = searchParams.get('ids') ?? '';
      if (!ids) return ok({});
      try {
        const r = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=eur&include_24hr_change=true`,
          { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; mw-portfolio/1.0)' } }
        );
        return ok(await r.json());
      } catch { return fail('CoinGecko nicht erreichbar'); }
    }

    // ── GET /etoro ──
    // Positionen aus eToro API — nur von erlaubten Origins abrufbar
    if (pathname === '/etoro') {
      const origin = request.headers.get('Origin') ?? '';
      if (!ALLOWED_ORIGINS.includes(origin)) return deny();

      if (!env.ETORO_API_KEY || !env.ETORO_USER_KEY) {
        return fail('eToro-Keys nicht konfiguriert', 503);
      }

      try {
        // 1. Portfolio laden
        const portfolioR = await fetch(
          'https://public-api.etoro.com/api/v1/trading/info/portfolio',
          { headers: etoroHeaders(env) }
        );
        const portfolioData = await portfolioR.json();
        const positions = (portfolioData.clientPortfolio?.positions ?? []).filter(p => p.units > 0);
        if (!positions.length) return ok({ positions: [] });

        const ids = [...new Set(positions.map(p => p.instrumentID))];

        // 2. Instrument-Metadaten (KV-Cache, TTL 24h)
        const CACHE_KEY = `instruments_${ids.sort().join('_')}`;
        let instruments = null;

        if (env.CACHE) {
          const cached = await env.CACHE.get(CACHE_KEY, 'json');
          if (cached) instruments = cached;
        }

        if (!instruments) {
          const metaR = await fetch(
            `https://api.etorostatic.com/sapi/instrumentsmetadata/V1.1/instruments?Ids=${ids.join(',')}`
          );
          const metaData = await metaR.json();
          const metaList  = metaData?.InstrumentDisplayDatas ?? metaData?.Instruments ?? [];

          instruments = {};
          metaList.forEach(m => {
            const id = m.InstrumentID ?? m.instrumentID;
            if (id) instruments[id] = {
              ticker: m.SymbolFull ?? m.Symbol ?? String(id),
              name:   m.InstrumentDisplayName ?? m.DisplayName ?? String(id),
            };
          });

          // In KV cachen
          if (env.CACHE && Object.keys(instruments).length > 0) {
            await env.CACHE.put(CACHE_KEY, JSON.stringify(instruments), { expirationTtl: 86400 });
          }
        }

        // 3. EUR/USD
        const fxData = await fetch('https://api.frankfurter.app/latest?from=USD&to=EUR')
          .then(r => r.json()).catch(() => null);
        const eurUsd = fxData?.rates?.EUR ?? 0.88;

        // 4. Positionen anreichern
        const raw = positions.map(p => {
          const inst   = instruments[p.instrumentID] ?? {};
          let ticker   = inst.ticker ?? String(p.instrumentID);
          ticker       = ticker.replace(/\.US$/i, ''); // .US Suffix entfernen
          return {
            ticker,
            company:  inst.name ?? ticker,
            shares:   p.units,
            avgPrice: p.openRate * eurUsd,
            openDate: p.openDateTime,
          };
        });

        // 5. Mehrfach-Positionen aggregieren (eToro behandelt jeden Kauf einzeln)
        const grouped = {};
        raw.forEach(p => {
          if (!grouped[p.ticker]) {
            grouped[p.ticker] = { ...p, _cost: p.shares * p.avgPrice };
          } else {
            const g       = grouped[p.ticker];
            const newCost = g._cost + p.shares * p.avgPrice;
            g.shares      = g.shares + p.shares;
            g.avgPrice    = newCost / g.shares;
            g._cost       = newCost;
            g.openDate    = p.openDate;
          }
        });

        const enriched = Object.values(grouped).map(({ _cost, ...p }) => p);
        return ok({ positions: enriched, eurUsd }, corsHeaders(origin));

      } catch(e) {
        return fail('eToro Fehler: ' + e.message);
      }
    }

    // ── GET /lookup?q=ISIN_ODER_SUCHBEGRIFF ──
    if (pathname === '/lookup') {
      const q = searchParams.get('q') ?? '';
      if (!q) return ok([]);
      try {
        const r = await fetch(
          `https://finnhub.io/api/v1/search?q=${encodeURIComponent(q)}&token=${env.FINNHUB_KEY}`
        );
        const d = await r.json();
        return ok((d.result ?? []).slice(0, 8));
      } catch { return ok([]); }
    }

    return new Response('Not found', { status: 404 });
  },
};
