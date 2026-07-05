// ── CRYPTO-MAPPING (Ticker → CoinGecko ID) ──
const CRYPTO_IDS = {
  'BTC':  'bitcoin',
  'ETH':  'ethereum',
  'XRP':  'ripple',
  'SOL':  'solana',
  'DOGE': 'dogecoin',
  'ADA':  'cardano',
};

// ── DEFAULT PORTFOLIO (Platzhalter — per Bearbeiten-Modal befüllen) ──
const DEFAULT_PORTFOLIO = {
  tr: {
    positions: [
      { ticker: 'NVDA',   company: 'NVIDIA Corp.',      shares: 0, avgPrice: 0 },
      { ticker: 'MSFT',   company: 'Microsoft Corp.',   shares: 0, avgPrice: 0 },
      { ticker: 'AAPL',   company: 'Apple Inc.',         shares: 0, avgPrice: 0 },
      { ticker: 'V',      company: 'Visa Inc.',           shares: 0, avgPrice: 0 },
      { ticker: 'NOVO-B', company: 'Novo Nordisk A/S',   shares: 0, avgPrice: 0 },
      { ticker: 'JNJ',    company: 'Johnson & Johnson',   shares: 0, avgPrice: 0 },
      { ticker: 'ASML',   company: 'ASML Holding',        shares: 0, avgPrice: 0 },
    ],
  },
  sc: {
    positions: [
      { ticker: 'META',  company: 'Meta Platforms',  shares: 0, avgPrice: 0 },
      { ticker: 'AMZN',  company: 'Amazon.com Inc.', shares: 0, avgPrice: 0 },
      { ticker: 'GOOGL', company: 'Alphabet Inc.',   shares: 0, avgPrice: 0 },
      { ticker: 'ASML',  company: 'ASML Holding',    shares: 0, avgPrice: 0 },
      { ticker: 'SAP',   company: 'SAP SE',           shares: 0, avgPrice: 0 },
      { ticker: 'BNTX',  company: 'BioNTech SE',      shares: 0, avgPrice: 0 },
      { ticker: 'ALV',   company: 'Allianz SE',        shares: 0, avgPrice: 0 },
    ],
  },
};

// ── STATISCHE PLATZHALTER (bleiben bis zur späteren Automatisierung) ──
const ALLOC = [
  { name: 'Aktien', pct: 62, val: '€ 29.958', cls: 'tm-aktien' },
  { name: 'ETFs',   pct: 24, val: '€ 11.597', cls: 'tm-etf'    },
  { name: 'Krypto', pct:  9, val: '€ 4.349',  cls: 'tm-krypto' },
  { name: 'Cash',   pct:  5, val: '€ 2.416',  cls: 'tm-cash'   },
];

const MONTHS_PERF = [
  { m: 'Jan', p: +2.1 }, { m: 'Feb', p: +4.8 }, { m: 'Mär', p: -1.3 },
  { m: 'Apr', p: +3.2 }, { m: 'Mai', p: +6.1 }, { m: 'Jun', p: -0.8 },
  { m: 'Jul', p: +1.9 }, { m: 'Aug', p: +5.4 }, { m: 'Sep', p: -2.1 },
  { m: 'Okt', p: +3.7 }, { m: 'Nov', p: +2.2 }, { m: 'Dez', p: +4.1 },
];

const DIV_SUMMARY = { total: '€ 824', count: 18, avgYield: '2.3 %' };
const DIVIDENDEN = [
  { date: '12.06.25', ticker: 'MSFT',   company: 'Microsoft Corp.',   amount: '€ 48,20',  yield: '0.8 %' },
  { date: '05.06.25', ticker: 'V',      company: 'Visa Inc.',          amount: '€ 31,40',  yield: '0.7 %' },
  { date: '28.05.25', ticker: 'ASML',   company: 'ASML Holding N.V.', amount: '€ 112,60', yield: '5.7 %' },
  { date: '15.05.25', ticker: 'NOVO-B', company: 'Novo Nordisk A/S',  amount: '€ 94,80',  yield: '4.3 %' },
  { date: '02.05.25', ticker: 'AAPL',   company: 'Apple Inc.',         amount: '€ 22,10',  yield: '0.5 %' },
  { date: '18.04.25', ticker: 'GOOGL',  company: 'Alphabet Inc.',      amount: '€ 18,90',  yield: '0.5 %' },
  { date: '03.04.25', ticker: 'MSFT',   company: 'Microsoft Corp.',    amount: '€ 48,20',  yield: '0.8 %' },
];

const BROKER_DETAIL = {
  tr: {
    chart: [100, 104, 102, 109, 107, 114, 111, 118, 116, 122, 119, 128, 131],
    sectors: [
      { name: 'Technologie', pct: 48 }, { name: 'Gesundheit', pct: 18 },
      { name: 'Finanzen',    pct: 14 }, { name: 'Konsumgüter', pct: 12 },
      { name: 'Industrie',   pct:  8 },
    ],
  },
  sc: {
    chart: [100, 103, 101, 106, 108, 105, 112, 110, 115, 113, 117, 121, 119],
    sectors: [
      { name: 'Technologie',    pct: 55 }, { name: 'Kommunikation', pct: 20 },
      { name: 'Finanzen',       pct: 13 }, { name: 'Energie',        pct:  8 },
      { name: 'Rohstoffe',      pct:  4 },
    ],
  },
  et: {
    chart: [100, 108, 105, 115, 112, 122, 118, 130, 124, 135, 128, 140, 136],
    sectors: [
      { name: 'Krypto',     pct: 62 }, { name: 'Tech-Aktien', pct: 22 },
      { name: 'Rohstoffe',  pct: 10 }, { name: 'Cash',         pct:  6 },
    ],
  },
};

// ── STATE ──
let portfolioData = {};
let livePrices    = {};  // { 'NVDA': { c: 142.5, pc: 140.0 }, ... }
let cryptoPrices  = {};  // { 'bitcoin': { eur: 58000, eur_24h_change: 2.1 }, ... }
let eurUsd        = null;
let etoroData     = { positions: [] };
let priceStatus   = 'idle'; // 'idle' | 'loading' | 'ok' | 'error'

// ── DATEN LADEN / SPEICHERN ──
function loadPortfolioData() {
  const saved = localStorage.getItem('mw-portfolio');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Migration: altes Format mit val/share/perf → neues Format mit shares/avgPrice
      if (parsed.tr?.positions?.[0]?.val !== undefined) {
        portfolioData = {
          tr: { positions: (parsed.tr?.positions ?? []).map(p => ({ ticker: p.ticker, company: p.company, shares: 0, avgPrice: 0 })) },
          sc: { positions: (parsed.sc?.positions ?? []).map(p => ({ ticker: p.ticker, company: p.company, shares: 0, avgPrice: 0 })) },
        };
      } else {
        portfolioData = parsed;
      }
      return;
    } catch(e) {}
  }
  portfolioData = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO));
}

function savePortfolioData() {
  localStorage.setItem('mw-portfolio', JSON.stringify(portfolioData));
}

function formatEuro(val) {
  return '€ ' + Math.round(val).toLocaleString('de-DE');
}

// ── LIVE-PREIS BERECHNUNG ──
function isEurTicker(ticker) {
  return /\.(DE|AS|PA|MC|CO|ST|MI|VX|L|BR|LSE)$/i.test(ticker);
}

function calcVal(pos) {
  if (!pos.shares) return null;
  if (CRYPTO_IDS[pos.ticker]) {
    const price = cryptoPrices[CRYPTO_IDS[pos.ticker]]?.eur;
    return price != null ? pos.shares * price : null;
  }
  const raw = livePrices[pos.ticker]?.c;
  if (!raw) return null;
  if (isEurTicker(pos.ticker)) return pos.shares * raw;
  return eurUsd != null ? pos.shares * raw * eurUsd : null;
}

function calcPerf(pos) {
  const val = calcVal(pos);
  if (val === null || !pos.avgPrice) return null;
  const cost = pos.shares * pos.avgPrice;
  return cost > 0 ? (val - cost) / cost * 100 : null;
}

function calcGrandTotal() {
  return [
    ...(portfolioData.tr?.positions ?? []),
    ...(portfolioData.sc?.positions ?? []),
    ...(etoroData.positions ?? []),
  ].reduce((s, p) => s + (calcVal(p) ?? 0), 0);
}

function calcBrokerStats(brokerId) {
  const positions = brokerId === 'et'
    ? (etoroData.positions ?? [])
    : (portfolioData[brokerId]?.positions ?? []);
  const total    = positions.reduce((s, p) => s + (calcVal(p) ?? 0), 0);
  const cost     = positions.reduce((s, p) => s + p.shares * p.avgPrice, 0);
  const perf     = cost > 0 ? (total - cost) / cost * 100 : 0;
  return { total, perf };
}

// ── KURS-FETCH ──
async function fetchEtoroPositions() {
  if (!WORKER_URL) return;
  try {
    const r = await fetch(`${WORKER_URL}/etoro`);
    if (!r.ok) return;
    const data = await r.json();
    if (data.error) return;

    // Worker liefert bereits angereicherte Positionen mit ticker, company, shares, avgPrice (EUR)
    etoroData.positions = (data.positions ?? []).filter(p => p.ticker && p.shares > 0);

    // EUR/USD vom eToro-Endpunkt übernehmen falls noch nicht gesetzt
    if (data.eurUsd && !eurUsd) eurUsd = data.eurUsd;
  } catch(e) {
    console.warn('eToro:', e.message);
  }
}

async function fetchPrices() {
  if (!WORKER_URL) { renderAll(); return; }

  priceStatus = 'loading';
  updatePriceStatus();

  const stockTickers = [
    ...(portfolioData.tr?.positions ?? []),
    ...(portfolioData.sc?.positions ?? []),
    ...(etoroData.positions ?? []).filter(p => !CRYPTO_IDS[p.ticker]),
  ].map(p => p.ticker).filter((v, i, a) => v && a.indexOf(v) === i);

  const cryptoIds = Object.values(CRYPTO_IDS).join(',');

  try {
    await Promise.all([
      stockTickers.length
        ? fetch(`${WORKER_URL}/prices?tickers=${stockTickers.join(',')}`)
            .then(r => r.json())
            .then(d => { livePrices = d.prices ?? {}; if (d.eurUsd) eurUsd = d.eurUsd; })
        : Promise.resolve(),
      fetch(`${WORKER_URL}/crypto?ids=${cryptoIds}`)
        .then(r => r.json())
        .then(d => { cryptoPrices = d; }),
    ]);
    priceStatus = 'ok';
  } catch(e) {
    priceStatus = 'error';
  }

  updatePriceStatus();
  renderAll();
}

function updatePriceStatus() {
  const el = document.getElementById('priceStatus');
  if (!el) return;
  if (priceStatus === 'ok') {
    const t = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    el.textContent = `Kurs ${t}`;
    el.style.color = 'var(--teal)';
  } else if (priceStatus === 'loading') {
    el.textContent = 'Aktualisiere…';
    el.style.color = 'var(--text-muted)';
  } else if (priceStatus === 'error') {
    el.textContent = 'Offline';
    el.style.color = '#c0524a';
  } else {
    el.textContent = WORKER_URL ? '' : 'Worker nicht konfiguriert';
    el.style.color = 'var(--text-muted)';
  }
}

// ── RENDER-FUNKTIONEN ──
function renderAll() {
  renderBrokerCards();
  renderPositions();
  updateHeroStats();
}

function renderBrokerCards() {
  const grid = document.getElementById('brokerGrid');
  if (!grid) return;

  const brokers = [
    { id: 'tr', name: 'Trade Republic',  type: 'Finnhub Live' },
    { id: 'sc', name: 'Scalable Capital', type: 'Finnhub Live' },
    { id: 'et', name: 'eToro',            type: etoroData.positions.length ? 'eToro API · Live' : 'API (lädt…)' },
  ];

  grid.innerHTML = brokers.map(b => {
    const { total, perf } = calcBrokerStats(b.id);
    const hasData = total > 0;
    return `
      <div class="broker-card" data-broker="${b.id}">
        <div class="broker-name">${b.name}</div>
        <div class="broker-type">${b.type}</div>
        <div class="broker-value"><span class="private-val">${hasData ? formatEuro(total) : '— —'}</span></div>
        <div class="broker-perf ${perf >= 0 ? 'pos' : 'neg'}">${hasData ? (perf >= 0 ? '+' : '') + perf.toFixed(1) + ' %' : '—'}</div>
      </div>`;
  }).join('');
}

function updateHeroStats() {
  const total    = calcGrandTotal();
  const allPos   = [
    ...(portfolioData.tr?.positions ?? []),
    ...(portfolioData.sc?.positions ?? []),
    ...(etoroData.positions ?? []),
  ];
  const posCount = allPos.length;

  const elTotal = document.getElementById('heroGesamtwert');
  if (elTotal) elTotal.textContent = total > 0 ? formatEuro(total) : '€ —';

  const elPos = document.getElementById('heroPosCount');
  if (elPos) elPos.textContent = posCount;
}

function renderPositions() {
  const el = document.getElementById('posRows');
  if (!el) return;

  const grandTotal = calcGrandTotal();
  const all = [
    ...(portfolioData.tr?.positions ?? []).map(p => ({ ...p, broker: 'TR' })),
    ...(portfolioData.sc?.positions ?? []).map(p => ({ ...p, broker: 'SC' })),
    ...(etoroData.positions ?? []).map(p => ({ ...p, broker: 'eT' })),
  ]
    .map(p => ({ ...p, _val: calcVal(p) ?? 0, _perf: calcPerf(p) ?? null }))
    .sort((a, b) => b._val - a._val)
    .slice(0, 10);

  el.innerHTML = all.map((p, i) => {
    const share = grandTotal > 0 && p._val ? (p._val / grandTotal * 100).toFixed(1) : '—';
    return `
      <div class="pos-row">
        <span class="pos-rank">${i + 1}</span>
        <div class="pos-name-wrap">
          <div class="pos-ticker">${p.ticker}</div>
          <div class="pos-company">${p.company}</div>
        </div>
        <div><span class="pos-broker-tag">${p.broker}</span></div>
        <div class="pos-value"><span class="private-val">${p._val ? formatEuro(p._val) : '—'}</span></div>
        <div class="pos-share-val">${share !== '—' ? share + ' %' : '—'}</div>
        <div class="pos-perf-val ${(p._perf ?? 0) >= 0 ? 'pos' : 'neg'}">
          ${p._perf != null ? (p._perf >= 0 ? '+' : '') + p._perf.toFixed(1) + ' %' : '—'}
        </div>
      </div>`;
  }).join('');
}

function renderTreemap() {
  const tm = document.getElementById('treemap');
  if (!tm) return;
  tm.innerHTML = `
    <div class="tm-col" style="flex:${ALLOC[0].pct}">
      <div class="tm-cell ${ALLOC[0].cls}" style="flex:1"><div class="tm-cell-inner">
        <span class="tm-pct">${ALLOC[0].pct} %</span>
        <span class="tm-name">${ALLOC[0].name}</span>
        <span class="tm-val private-val">${ALLOC[0].val}</span>
      </div></div>
    </div>
    <div class="tm-col" style="flex:${ALLOC[1].pct}">
      <div class="tm-cell ${ALLOC[1].cls}" style="flex:1"><div class="tm-cell-inner">
        <span class="tm-pct">${ALLOC[1].pct} %</span>
        <span class="tm-name">${ALLOC[1].name}</span>
        <span class="tm-val private-val">${ALLOC[1].val}</span>
      </div></div>
    </div>
    <div class="tm-col" style="flex:${ALLOC[2].pct + ALLOC[3].pct}">
      <div class="tm-cell ${ALLOC[2].cls}" style="flex:${ALLOC[2].pct}"><div class="tm-cell-inner">
        <span class="tm-pct">${ALLOC[2].pct} %</span>
        <span class="tm-name">${ALLOC[2].name}</span>
        <span class="tm-val private-val">${ALLOC[2].val}</span>
      </div></div>
      <div class="tm-cell ${ALLOC[3].cls}" style="flex:${ALLOC[3].pct}"><div class="tm-cell-inner">
        <span class="tm-pct">${ALLOC[3].pct} %</span>
        <span class="tm-name">${ALLOC[3].name}</span>
        <span class="tm-val private-val">${ALLOC[3].val}</span>
      </div></div>
    </div>`;
}

function renderMonthHeatmap() {
  const el = document.getElementById('monthHeatmap');
  if (!el) return;
  const maxAbs = Math.max(...MONTHS_PERF.map(m => Math.abs(m.p)));
  el.innerHTML = MONTHS_PERF.map(m => {
    const cls       = m.p > 0.3 ? 'pos' : m.p < -0.3 ? 'neg' : 'flat';
    const intensity = Math.abs(m.p) / maxAbs;
    let bg = 'transparent';
    if (m.p >  0.3) bg = `rgba(29,158,117,${(0.08 + intensity * 0.22).toFixed(2)})`;
    if (m.p < -0.3) bg = `rgba(192,82,74,${(0.08 + intensity * 0.22).toFixed(2)})`;
    const barColor = m.p > 0 ? 'var(--teal)' : '#c0524a';
    const barW     = (Math.abs(m.p) / maxAbs * 100).toFixed(1);
    return `<div class="month-cell" style="background:${bg}">
      <span class="month-name">${m.m}</span>
      <span class="month-perf ${cls}">${m.p > 0 ? '+' : ''}${m.p.toFixed(1)} %</span>
      <div class="month-bar" style="background:${barColor};width:${barW}%;opacity:0.5"></div>
    </div>`;
  }).join('');
}

function renderDividenden() {
  const summaryEl = document.getElementById('divSummary');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="div-card">
        <div class="div-card-label">Erhalten YTD</div>
        <div class="div-card-val"><span class="private-val">${DIV_SUMMARY.total}</span></div>
        <div class="div-card-sub">2025</div>
      </div>
      <div class="div-card">
        <div class="div-card-label">Zahlungen</div>
        <div class="div-card-val">${DIV_SUMMARY.count}</div>
        <div class="div-card-sub">Transaktionen</div>
      </div>
      <div class="div-card">
        <div class="div-card-label">Ø Dividendenrendite</div>
        <div class="div-card-val">${DIV_SUMMARY.avgYield}</div>
        <div class="div-card-sub">Portfolio</div>
      </div>`;
  }
  const listEl = document.getElementById('divList');
  if (listEl) {
    listEl.innerHTML = `
      <div class="div-list-header">
        <span>Datum</span><span>Position</span>
        <span style="text-align:right">Betrag</span>
        <span style="text-align:right">Rendite</span>
      </div>` +
      DIVIDENDEN.map(d => `
      <div class="div-row">
        <span class="div-date">${d.date}</span>
        <div><div class="div-ticker">${d.ticker}</div><div class="div-company">${d.company}</div></div>
        <div class="div-amount"><span class="private-val">${d.amount}</span></div>
        <div class="div-yield">${d.yield}</div>
      </div>`).join('');
  }
}

// ── BROKER DETAIL MODAL ──
function openModal(brokerId) {
  const detail = BROKER_DETAIL[brokerId];
  if (!detail) return;

  const positions   = brokerId === 'et' ? etoroData.positions : (portfolioData[brokerId]?.positions ?? []);
  const { total, perf } = calcBrokerStats(brokerId);
  const hasData     = total > 0;

  const brokerNames = { tr: 'Trade Republic', sc: 'Scalable Capital', et: 'eToro' };
  const brokerSubs  = {
    tr: 'Finnhub Live · Detailansicht',
    sc: 'Finnhub Live · Detailansicht',
    et: etoroData.positions.length ? 'eToro API · Detailansicht' : 'API (lädt…) · Detailansicht',
  };

  document.getElementById('bmTitle').textContent    = brokerNames[brokerId];
  document.getElementById('bmSubtitle').textContent = brokerSubs[brokerId];

  const sharpe   = { tr: '1.42', sc: '1.18', et: '0.87' }[brokerId];
  const drawdown = { tr: '-14,3 %', sc: '-11,7 %', et: '-28,4 %' }[brokerId];
  document.getElementById('bmKpis').innerHTML = `
    <div class="bm-kpi">
      <div class="bm-kpi-label">Gesamtwert</div>
      <div class="bm-kpi-val"><span class="private-val">${hasData ? formatEuro(total) : '—'}</span></div>
      <div class="bm-kpi-sub">Aktuell</div>
    </div>
    <div class="bm-kpi">
      <div class="bm-kpi-label">Performance</div>
      <div class="bm-kpi-val ${perf >= 0 ? 'pos' : 'neg'}">${hasData ? (perf >= 0 ? '+' : '') + perf.toFixed(1) + ' %' : '—'}</div>
      <div class="bm-kpi-sub">Gesamt</div>
    </div>
    <div class="bm-kpi">
      <div class="bm-kpi-label">Sharpe Ratio</div>
      <div class="bm-kpi-val">${sharpe}</div>
      <div class="bm-kpi-sub">12 Monate</div>
    </div>
    <div class="bm-kpi">
      <div class="bm-kpi-label">Max Drawdown</div>
      <div class="bm-kpi-val neg">${drawdown}</div>
      <div class="bm-kpi-sub">12 Monate</div>
    </div>`;

  renderModalChart(detail.chart);

  const withPerf = positions.map(p => ({ ...p, _perf: calcPerf(p) ?? 0 }));
  const best  = withPerf.length ? withPerf.reduce((a, b) => b._perf > a._perf ? b : a) : null;
  const worst = withPerf.length ? withPerf.reduce((a, b) => b._perf < a._perf ? b : a) : null;

  document.getElementById('bmHighlights').innerHTML = best ? `
    <div class="bm-highlight">
      <div class="bm-hl-tag best">▲ Beste Position</div>
      <div class="bm-hl-ticker">${best.ticker}</div>
      <div class="bm-hl-company">${best.company}</div>
      <div class="bm-hl-perf pos">${best._perf >= 0 ? '+' : ''}${best._perf.toFixed(1)} %</div>
    </div>
    <div class="bm-highlight">
      <div class="bm-hl-tag worst">▼ Schlechteste Position</div>
      <div class="bm-hl-ticker">${worst.ticker}</div>
      <div class="bm-hl-company">${worst.company}</div>
      <div class="bm-hl-perf neg">${worst._perf.toFixed(1)} %</div>
    </div>` : '<div style="color:var(--text-muted);font-size:12px">Keine Positionen</div>';

  const maxS = Math.max(...detail.sectors.map(s => s.pct));
  document.getElementById('bmSectors').innerHTML = detail.sectors.map(s => `
    <div class="bm-sector-row">
      <span class="bm-sector-name">${s.name}</span>
      <div class="bm-sector-track"><div class="bm-sector-bar" style="width:${(s.pct/maxS*100).toFixed(1)}%"></div></div>
      <span class="bm-sector-pct">${s.pct} %</span>
    </div>`).join('');

  document.getElementById('bmPositions').innerHTML = positions.map(p => {
    const val  = calcVal(p);
    const perf = calcPerf(p);
    const share = val && total > 0 ? (val / total * 100).toFixed(1) : '—';
    return `
      <div class="bm-pos-row">
        <div><div class="bm-pos-ticker">${p.ticker}</div><div class="bm-pos-company">${p.company}</div></div>
        <div class="bm-pos-val"><span class="private-val">${val ? formatEuro(val) : '—'}</span></div>
        <div class="bm-pos-share">${share !== '—' ? share + ' %' : '—'}</div>
        <div class="bm-pos-perf ${(perf ?? 0) >= 0 ? 'pos' : 'neg'}">${perf != null ? (perf >= 0 ? '+' : '') + perf.toFixed(1) + ' %' : '—'}</div>
      </div>`;
  }).join('');

  document.getElementById('brokerModal').classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('brokerModal').classList.remove('visible');
  document.body.style.overflow = '';
}

function renderModalChart(points) {
  const svg = document.getElementById('bmChart');
  if (!svg) return;
  const w = 840, h = 160, pad = 12;
  const min   = Math.min(...points), max = Math.max(...points);
  const range = max - min || 1;
  const xs = points.map((_, i) => pad + (i / (points.length - 1)) * (w - pad * 2));
  const ys = points.map(p => h - pad - ((p - min) / range) * (h - pad * 2));
  const pathD = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ');
  const areaD = pathD + ` L${xs[xs.length - 1]},${h} L${xs[0]},${h} Z`;
  svg.innerHTML = `
    <defs>
      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#1D9E75" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#1D9E75" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="${areaD}" fill="url(#chartGrad)"/>
    <path d="${pathD}" fill="none" stroke="#1D9E75" stroke-width="1.5" stroke-linejoin="round"/>
    ${xs.map((x, i) => i === xs.length - 1 ? `<circle cx="${x}" cy="${ys[i]}" r="3" fill="#1D9E75"/>` : '').join('')}`;
}

// ── PIN MODAL ──
let pinBuffer     = '';
let unlocked      = sessionStorage.getItem('mw-unlocked') === '1';
let pendingAction = null;

function applyUnlockState() {
  const btn   = document.getElementById('privacyBtn');
  const label = document.getElementById('privacyLabel');
  const icon  = document.getElementById('privacyIcon');
  if (!btn || !label || !icon) return;
  if (unlocked) {
    document.body.classList.add('values-visible');
    btn.classList.add('unlocked');
    label.textContent = 'Werte verbergen';
    icon.innerHTML    = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  } else {
    document.body.classList.remove('values-visible');
    btn.classList.remove('unlocked');
    label.textContent = 'Werte anzeigen';
    icon.innerHTML    = '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  }
}

function handlePrivacyBtn() {
  if (unlocked) {
    unlocked = false;
    sessionStorage.removeItem('mw-unlocked');
    applyUnlockState();
  } else {
    pendingAction = 'values';
    openPin();
  }
}

function openPin() {
  pinBuffer = '';
  updateDots();
  document.getElementById('pinError').textContent = '';
  document.getElementById('pinOverlay').classList.add('visible');
}

function closePin() {
  document.getElementById('pinOverlay').classList.remove('visible');
  pendingAction = null;
  pinBuffer = '';
  updateDots();
}

function pinInput(digit) {
  if (pinBuffer.length >= 4) return;
  pinBuffer += digit;
  updateDots();
  if (pinBuffer.length === 4) setTimeout(checkPin, 120);
}

function pinDelete() {
  pinBuffer = pinBuffer.slice(0, -1);
  updateDots();
  document.getElementById('pinError').textContent = '';
}

function updateDots() {
  for (let i = 0; i < 4; i++) {
    const dot = document.getElementById('d' + i);
    if (!dot) continue;
    dot.classList.toggle('filled', i < pinBuffer.length);
    dot.classList.remove('error');
  }
}

function checkPin() {
  if (pinBuffer === PIN) {
    const action = pendingAction;
    closePin();
    if (action === 'values') {
      unlocked = true;
      sessionStorage.setItem('mw-unlocked', '1');
      applyUnlockState();
    } else if (action === 'manage') {
      openManage();
    }
  } else {
    for (let i = 0; i < 4; i++) {
      const dot = document.getElementById('d' + i);
      if (!dot) continue;
      dot.classList.remove('filled');
      dot.classList.add('error');
    }
    document.getElementById('pinError').textContent = 'Falscher PIN';
    setTimeout(() => { pinBuffer = ''; updateDots(); document.getElementById('pinError').textContent = ''; }, 1000);
  }
}

// ── PORTFOLIO BEARBEITEN MODAL ──
let activeManageBroker = 'tr';
let pendingEdits = {};

function openManage() {
  pendingEdits = {};
  activeManageBroker = 'tr';
  renderManageContent();
  document.getElementById('manageModal').classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeManage() {
  pendingEdits = {};
  document.getElementById('manageModal').classList.remove('visible');
  document.body.style.overflow = '';
}

function renderManageContent() {
  document.querySelectorAll('.manage-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.broker === activeManageBroker);
  });

  const data = pendingEdits[activeManageBroker]
    ?? JSON.parse(JSON.stringify(portfolioData[activeManageBroker] ?? { positions: [] }));

  const body = document.getElementById('manageBody');
  if (!body) return;

  body.innerHTML = `
    <div class="manage-pos-header">
      <span>Ticker / ISIN</span>
      <span>Bezeichnung</span>
      <span>Stück</span>
      <span>Ø Kurs €</span>
      <span></span>
    </div>
    <div id="managePosList">
      ${data.positions.map(p => renderManagePosRow(p)).join('')}
    </div>
    <button class="manage-add-btn" id="manageAddPos">+ Position hinzufügen</button>`;

  attachManageListeners(body);
}

function renderManagePosRow(p) {
  return `<div class="manage-pos-row">
    <div class="mp-ticker-wrap">
      <input class="manage-pos-input mp-ticker" placeholder="MSFT" value="${p.ticker}" maxlength="20">
      <button class="mp-lookup" title="Ticker/ISIN suchen">↗</button>
    </div>
    <input class="manage-pos-input mp-company" placeholder="Name" value="${p.company ?? ''}">
    <input class="manage-pos-input mp-shares"   type="number" step="0.0001" placeholder="0"    value="${p.shares   || ''}">
    <input class="manage-pos-input mp-avgprice" type="number" step="0.01"   placeholder="0.00" value="${p.avgPrice || ''}">
    <button class="manage-pos-delete" title="Löschen">✕</button>
  </div>`;
}

function attachManageListeners(body) {
  body.querySelectorAll('.manage-pos-delete').forEach(btn =>
    btn.addEventListener('click', () => btn.closest('.manage-pos-row').remove())
  );
  body.querySelectorAll('.mp-lookup').forEach(btn =>
    btn.addEventListener('click', () => lookupTicker(btn.closest('.manage-pos-row')))
  );
  document.getElementById('manageAddPos')?.addEventListener('click', () => {
    const list = document.getElementById('managePosList');
    const div  = document.createElement('div');
    div.innerHTML = renderManagePosRow({ ticker: '', company: '', shares: 0, avgPrice: 0 });
    const row = div.firstElementChild;
    list.appendChild(row);
    row.querySelector('.manage-pos-delete').addEventListener('click', () => row.remove());
    row.querySelector('.mp-lookup').addEventListener('click', () => lookupTicker(row));
    row.querySelector('.mp-ticker').focus();
  });
}

function collectCurrentTab() {
  const positions = [];
  document.querySelectorAll('.manage-pos-row').forEach(row => {
    const ticker   = row.querySelector('.mp-ticker')?.value.trim().toUpperCase() ?? '';
    const company  = row.querySelector('.mp-company')?.value.trim() ?? '';
    const shares   = parseFloat(row.querySelector('.mp-shares')?.value)   || 0;
    const avgPrice = parseFloat(row.querySelector('.mp-avgprice')?.value) || 0;
    if (ticker) positions.push({ ticker, company, shares, avgPrice });
  });
  pendingEdits[activeManageBroker] = { positions };
}

function saveManage() {
  collectCurrentTab();
  Object.keys(pendingEdits).forEach(b => { portfolioData[b] = pendingEdits[b]; });
  pendingEdits = {};
  savePortfolioData();
  fetchPrices(); // Neue Ticker sofort abfragen
  closeManage();
}

// ISIN / WKN → Ticker-Suche via Worker
async function lookupTicker(row) {
  if (!WORKER_URL) return;
  const tickerInput  = row.querySelector('.mp-ticker');
  const companyInput = row.querySelector('.mp-company');
  const btn          = row.querySelector('.mp-lookup');
  const q = tickerInput.value.trim();
  if (!q) return;

  btn.textContent = '…';
  btn.disabled    = true;
  try {
    const r       = await fetch(`${WORKER_URL}/lookup?q=${encodeURIComponent(q)}`);
    const results = await r.json();
    if (results.length > 0) {
      const best = results[0];
      tickerInput.value  = best.symbol ?? best.displaySymbol ?? q;
      companyInput.value = best.description ?? best.name ?? companyInput.value;
    }
  } catch(e) {
    console.warn('Lookup failed:', e.message);
  } finally {
    btn.textContent = '↗';
    btn.disabled    = false;
  }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  loadPortfolioData();

  renderBrokerCards();
  renderTreemap();
  renderMonthHeatmap();
  renderPositions();
  renderDividenden();
  updateHeroStats();
  applyUnlockState();
  updatePriceStatus();

  // eToro laden, dann Kurse starten
  fetchEtoroPositions().then(() => {
    fetchPrices();
    setInterval(fetchPrices, 30_000);
  });

  // Broker-Kacheln
  document.getElementById('brokerGrid')?.addEventListener('click', e => {
    const card = e.target.closest('[data-broker]');
    if (card) openModal(card.dataset.broker);
  });

  // Privacy-Button
  document.getElementById('privacyBtn')?.addEventListener('click', handlePrivacyBtn);

  // Bearbeiten-Button
  document.getElementById('manageBtn')?.addEventListener('click', () => {
    pendingAction = 'manage';
    openPin();
  });

  // PIN-Numpad
  document.getElementById('pinPad')?.addEventListener('click', e => {
    const key = e.target.closest('[data-key]')?.dataset.key;
    if (!key) return;
    if (key === 'del') { pinDelete(); return; }
    pinInput(parseInt(key, 10));
  });
  document.getElementById('pinCancel')?.addEventListener('click', closePin);

  // Broker-Modal
  document.getElementById('brokerModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('brokerModal')) closeModal();
  });
  document.getElementById('bmClose')?.addEventListener('click', closeModal);

  // Manage-Modal
  document.getElementById('manageModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('manageModal')) closeManage();
  });
  document.getElementById('manageClose')?.addEventListener('click', closeManage);
  document.getElementById('manageSave')?.addEventListener('click', saveManage);

  document.getElementById('manageTabs')?.addEventListener('click', e => {
    const tab = e.target.closest('.manage-tab');
    if (!tab || tab.dataset.broker === activeManageBroker) return;
    collectCurrentTab();
    activeManageBroker = tab.dataset.broker;
    renderManageContent();
  });

  // PIN-Overlay
  document.getElementById('pinOverlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('pinOverlay')) closePin();
  });

  // ESC
  document.addEventListener('keydown', e => {
    const modal  = document.getElementById('brokerModal');
    const manage = document.getElementById('manageModal');
    const pin    = document.getElementById('pinOverlay');
    if (e.key === 'Escape') {
      if (modal?.classList.contains('visible'))  { closeModal();  return; }
      if (manage?.classList.contains('visible')) { closeManage(); return; }
      if (pin?.classList.contains('visible'))    { closePin();    return; }
    }
    if (pin?.classList.contains('visible')) {
      if (e.key >= '0' && e.key <= '9') pinInput(parseInt(e.key, 10));
      if (e.key === 'Backspace') pinDelete();
    }
  });
});
