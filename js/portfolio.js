// ── PORTFOLIO-STANDARDDATEN (PLATZHALTER — werden durch localStorage überschrieben) ──
const DEFAULT_PORTFOLIO = {
  tr: {
    total: 21840, perf: 22.1,
    positions: [
      { ticker: 'NVDA',   company: 'NVIDIA Corp.',     val: 5920, share: 27.1, perf: 118.7 },
      { ticker: 'MSFT',   company: 'Microsoft Corp.',  val: 4210, share: 19.3, perf:  42.3  },
      { ticker: 'AAPL',   company: 'Apple Inc.',        val: 3540, share: 16.2, perf:  28.4  },
      { ticker: 'V',      company: 'Visa Inc.',          val: 2890, share: 13.2, perf:  22.1  },
      { ticker: 'NOVO-B', company: 'Novo Nordisk A/S',  val: 2180, share: 10.0, perf: -18.3  },
      { ticker: 'JNJ',    company: 'Johnson & Johnson',  val: 1640, share:  7.5, perf:   8.2  },
      { ticker: 'ASML',   company: 'ASML Holding',      val: 1460, share:  6.7, perf:  12.7  },
    ],
  },
  sc: {
    total: 18290, perf: 14.8,
    positions: [
      { ticker: 'META',  company: 'Meta Platforms',  val: 4840, share: 26.5, perf:  55.9 },
      { ticker: 'AMZN',  company: 'Amazon.com Inc.', val: 3540, share: 19.4, perf:  19.8 },
      { ticker: 'GOOGL', company: 'Alphabet Inc.',   val: 2890, share: 15.8, perf:  31.2 },
      { ticker: 'ASML',  company: 'ASML Holding',    val: 2640, share: 14.5, perf:  12.7 },
      { ticker: 'SAP',   company: 'SAP SE',           val: 2190, share: 12.0, perf:  38.4 },
      { ticker: 'BNTX',  company: 'BioNTech SE',      val: 1290, share:  7.1, perf: -22.1 },
      { ticker: 'ALV',   company: 'Allianz SE',        val:  900, share:  4.9, perf:  14.2 },
    ],
  },
};

// PLATZHALTER eToro — wird in Schritt 2 durch API ersetzt
const ETORO_PLACEHOLDER = {
  total: 8190, perf: 11.3,
  positions: [
    { ticker: 'BTC',  company: 'Bitcoin',    val: 3980, share: 48.6, perf:  64.1 },
    { ticker: 'ETH',  company: 'Ethereum',   val: 1110, share: 13.6, perf: -12.4 },
    { ticker: 'TSLA', company: 'Tesla Inc.', val: 1840, share: 22.5, perf:   8.6 },
    { ticker: 'COIN', company: 'Coinbase',   val:  820, share: 10.0, perf:  31.2 },
    { ticker: 'XRP',  company: 'Ripple',     val:  440, share:  5.4, perf:  44.8 },
  ],
};

// Aktive Portfoliodaten (aus localStorage oder Standardwerte)
let portfolioData;

function loadPortfolioData() {
  const saved = localStorage.getItem('mw-portfolio');
  portfolioData = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO));
}

function savePortfolioData() {
  localStorage.setItem('mw-portfolio', JSON.stringify(portfolioData));
}

function formatEuro(val) {
  return '€ ' + Math.round(val).toLocaleString('de-DE');
}

// ── BROKER-KACHELN (dynamisch aus portfolioData) ──
function renderBrokerCards() {
  const grid = document.getElementById('brokerGrid');
  if (!grid) return;
  const brokers = [
    { id: 'tr', name: 'Trade Republic',  type: 'Manuell',     data: portfolioData.tr         },
    { id: 'sc', name: 'Scalable Capital', type: 'Manuell',    data: portfolioData.sc         },
    { id: 'et', name: 'eToro',            type: 'API (folgt)', data: ETORO_PLACEHOLDER },
  ];
  grid.innerHTML = brokers.map(b => `
    <div class="broker-card" data-broker="${b.id}">
      <div class="broker-name">${b.name}</div>
      <div class="broker-type">${b.type}</div>
      <div class="broker-value"><span class="private-val">${formatEuro(b.data.total)}</span></div>
      <div class="broker-perf ${b.data.perf >= 0 ? 'pos' : 'neg'}">${b.data.perf >= 0 ? '+' : ''}${b.data.perf.toFixed(1)} %</div>
    </div>`).join('');
}

// ── HERO-KENNZAHLEN AKTUALISIEREN ──
function updateHeroStats() {
  const total = portfolioData.tr.total + portfolioData.sc.total + ETORO_PLACEHOLDER.total;
  const posCount = portfolioData.tr.positions.length + portfolioData.sc.positions.length + ETORO_PLACEHOLDER.positions.length;

  const elTotal = document.getElementById('heroGesamtwert');
  if (elTotal) elTotal.textContent = formatEuro(total);

  const elPos = document.getElementById('heroPosCount');
  if (elPos) elPos.textContent = posCount;
}

// ── TREEMAP ──
// PLATZHALTER: Allokationsdaten
const ALLOC = [
  { name: 'Aktien', pct: 62, val: '€ 29.958', cls: 'tm-aktien' },
  { name: 'ETFs',   pct: 24, val: '€ 11.597', cls: 'tm-etf'    },
  { name: 'Krypto', pct:  9, val: '€ 4.349',  cls: 'tm-krypto' },
  { name: 'Cash',   pct:  5, val: '€ 2.416',  cls: 'tm-cash'   },
];

function renderTreemap() {
  const tm = document.getElementById('treemap');
  if (!tm) return;
  tm.innerHTML = `
    <div class="tm-col" style="flex:${ALLOC[0].pct}">
      <div class="tm-cell ${ALLOC[0].cls}" style="flex:1">
        <div class="tm-cell-inner">
          <span class="tm-pct">${ALLOC[0].pct} %</span>
          <span class="tm-name">${ALLOC[0].name}</span>
          <span class="tm-val private-val">${ALLOC[0].val}</span>
        </div>
      </div>
    </div>
    <div class="tm-col" style="flex:${ALLOC[1].pct}">
      <div class="tm-cell ${ALLOC[1].cls}" style="flex:1">
        <div class="tm-cell-inner">
          <span class="tm-pct">${ALLOC[1].pct} %</span>
          <span class="tm-name">${ALLOC[1].name}</span>
          <span class="tm-val private-val">${ALLOC[1].val}</span>
        </div>
      </div>
    </div>
    <div class="tm-col" style="flex:${ALLOC[2].pct + ALLOC[3].pct}">
      <div class="tm-cell ${ALLOC[2].cls}" style="flex:${ALLOC[2].pct}">
        <div class="tm-cell-inner">
          <span class="tm-pct">${ALLOC[2].pct} %</span>
          <span class="tm-name">${ALLOC[2].name}</span>
          <span class="tm-val private-val">${ALLOC[2].val}</span>
        </div>
      </div>
      <div class="tm-cell ${ALLOC[3].cls}" style="flex:${ALLOC[3].pct}">
        <div class="tm-cell-inner">
          <span class="tm-pct">${ALLOC[3].pct} %</span>
          <span class="tm-name">${ALLOC[3].name}</span>
          <span class="tm-val private-val">${ALLOC[3].val}</span>
        </div>
      </div>
    </div>`;
}

// ── MONATS-HEATMAP ──
// PLATZHALTER: Performance-Daten 2025
const MONTHS_PERF = [
  { m: 'Jan', p: +2.1 }, { m: 'Feb', p: +4.8 }, { m: 'Mär', p: -1.3 },
  { m: 'Apr', p: +3.2 }, { m: 'Mai', p: +6.1 }, { m: 'Jun', p: -0.8 },
  { m: 'Jul', p: +1.9 }, { m: 'Aug', p: +5.4 }, { m: 'Sep', p: -2.1 },
  { m: 'Okt', p: +3.7 }, { m: 'Nov', p: +2.2 }, { m: 'Dez', p: +4.1 },
];

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

// ── TOP 10 POSITIONEN (alle Broker zusammengeführt, nach Wert sortiert) ──
function renderPositions() {
  const el = document.getElementById('posRows');
  if (!el) return;

  const all = [
    ...portfolioData.tr.positions.map(p => ({ ...p, broker: 'TR' })),
    ...portfolioData.sc.positions.map(p => ({ ...p, broker: 'SC' })),
    ...ETORO_PLACEHOLDER.positions.map(p => ({ ...p, broker: 'eT' })),
  ].sort((a, b) => b.val - a.val).slice(0, 10);

  el.innerHTML = all.map((p, i) => `
    <div class="pos-row">
      <span class="pos-rank">${i + 1}</span>
      <div class="pos-name-wrap">
        <div class="pos-ticker">${p.ticker}</div>
        <div class="pos-company">${p.company}</div>
      </div>
      <div><span class="pos-broker-tag">${p.broker}</span></div>
      <div class="pos-value"><span class="private-val">${formatEuro(p.val)}</span></div>
      <div class="pos-share-val">${p.share.toFixed(1)} %</div>
      <div class="pos-perf-val ${p.perf >= 0 ? 'pos' : 'neg'}">${p.perf >= 0 ? '+' : ''}${p.perf.toFixed(1)} %</div>
    </div>`).join('');
}

// ── DIVIDENDEN ──
// PLATZHALTER: Dividendendaten
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
        <div>
          <div class="div-ticker">${d.ticker}</div>
          <div class="div-company">${d.company}</div>
        </div>
        <div class="div-amount"><span class="private-val">${d.amount}</span></div>
        <div class="div-yield">${d.yield}</div>
      </div>`).join('');
  }
}

// ── BROKER-DETAILDATEN (Chart, Sektoren — Platzhalter) ──
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

// ── BROKER MODAL ──
function openModal(brokerId) {
  const detail  = BROKER_DETAIL[brokerId];
  if (!detail) return;

  // Daten je nach Broker aus portfolioData oder Platzhalter
  const isEtoro = brokerId === 'et';
  const data    = isEtoro ? ETORO_PLACEHOLDER : portfolioData[brokerId];
  const brokerNames = { tr: 'Trade Republic', sc: 'Scalable Capital', et: 'eToro' };
  const brokerSubs  = { tr: 'Manuell · Detailansicht', sc: 'Manuell · Detailansicht', et: 'API (folgt) · Detailansicht' };

  document.getElementById('bmTitle').textContent    = brokerNames[brokerId];
  document.getElementById('bmSubtitle').textContent = brokerSubs[brokerId];

  // KPIs
  const sharpe   = { tr: '1.42', sc: '1.18', et: '0.87' }[brokerId];
  const drawdown = { tr: '-14,3 %', sc: '-11,7 %', et: '-28,4 %' }[brokerId];
  document.getElementById('bmKpis').innerHTML = `
    <div class="bm-kpi">
      <div class="bm-kpi-label">Gesamtwert</div>
      <div class="bm-kpi-val"><span class="private-val">${formatEuro(data.total)}</span></div>
      <div class="bm-kpi-sub">Aktuell</div>
    </div>
    <div class="bm-kpi">
      <div class="bm-kpi-label">Performance</div>
      <div class="bm-kpi-val pos">${data.perf >= 0 ? '+' : ''}${data.perf.toFixed(1)} %</div>
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

  // Chart
  renderModalChart(detail.chart);

  // Beste / Schlechteste Position (auto-berechnet aus Positionen)
  const positions = data.positions;
  const best  = positions.reduce((a, b) => b.perf > a.perf ? b : a, positions[0]);
  const worst = positions.reduce((a, b) => b.perf < a.perf ? b : a, positions[0]);
  document.getElementById('bmHighlights').innerHTML = `
    <div class="bm-highlight">
      <div class="bm-hl-tag best">▲ Beste Position</div>
      <div class="bm-hl-ticker">${best.ticker}</div>
      <div class="bm-hl-company">${best.company}</div>
      <div class="bm-hl-perf pos">${best.perf >= 0 ? '+' : ''}${best.perf.toFixed(1)} %</div>
    </div>
    <div class="bm-highlight">
      <div class="bm-hl-tag worst">▼ Schlechteste Position</div>
      <div class="bm-hl-ticker">${worst.ticker}</div>
      <div class="bm-hl-company">${worst.company}</div>
      <div class="bm-hl-perf neg">${worst.perf.toFixed(1)} %</div>
    </div>`;

  // Sektoren
  const maxS = Math.max(...detail.sectors.map(s => s.pct));
  document.getElementById('bmSectors').innerHTML = detail.sectors.map(s => `
    <div class="bm-sector-row">
      <span class="bm-sector-name">${s.name}</span>
      <div class="bm-sector-track">
        <div class="bm-sector-bar" style="width:${(s.pct / maxS * 100).toFixed(1)}%"></div>
      </div>
      <span class="bm-sector-pct">${s.pct} %</span>
    </div>`).join('');

  // Positionen
  document.getElementById('bmPositions').innerHTML = positions.map(p => `
    <div class="bm-pos-row">
      <div>
        <div class="bm-pos-ticker">${p.ticker}</div>
        <div class="bm-pos-company">${p.company}</div>
      </div>
      <div class="bm-pos-val"><span class="private-val">${formatEuro(p.val)}</span></div>
      <div class="bm-pos-share">${p.share.toFixed(1)} %</div>
      <div class="bm-pos-perf ${p.perf >= 0 ? 'pos' : 'neg'}">${p.perf >= 0 ? '+' : ''}${p.perf.toFixed(1)} %</div>
    </div>`).join('');

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
  const min   = Math.min(...points);
  const max   = Math.max(...points);
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
let pinBuffer      = '';
let unlocked       = sessionStorage.getItem('mw-unlocked') === '1';
let pendingAction  = null; // Aktion nach erfolgreichem PIN-Enter

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
    const action = pendingAction; // vor closePin() sichern — closePin setzt pendingAction auf null
    closePin();
    if (action === 'values') {
      // "Werte anzeigen" → Session-basiert, bleibt bis Browser geschlossen
      unlocked = true;
      sessionStorage.setItem('mw-unlocked', '1');
      applyUnlockState();
    } else if (action === 'manage') {
      // "Portfolio bearbeiten" → kein Session-Unlock, öffnet direkt das Modal
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
    setTimeout(() => {
      pinBuffer = '';
      updateDots();
      document.getElementById('pinError').textContent = '';
    }, 1000);
  }
}

// ── PORTFOLIO BEARBEITEN MODAL ──
let activeManageBroker = 'tr';
let pendingEdits = {}; // Zwischenspeicher beim Tab-Wechsel

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
  // Tabs aktualisieren
  document.querySelectorAll('.manage-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.broker === activeManageBroker);
  });

  // Daten: zuerst zwischengespeicherte Edits, dann gespeicherte Daten
  const data = pendingEdits[activeManageBroker]
    ?? JSON.parse(JSON.stringify(portfolioData[activeManageBroker]));

  const body = document.getElementById('manageBody');
  if (!body) return;

  body.innerHTML = `
    <div class="section-label" style="margin-bottom:16px">Übersicht</div>
    <div class="manage-overview">
      <div class="manage-field">
        <label class="manage-label">Gesamtwert (€)</label>
        <input class="manage-input" id="mTotalVal" type="number" step="1" value="${data.total}">
      </div>
      <div class="manage-field">
        <label class="manage-label">Performance (%)</label>
        <input class="manage-input" id="mPerf" type="number" step="0.1" value="${data.perf}">
      </div>
    </div>
    <div class="section-label" style="margin-bottom:12px">Positionen</div>
    <div class="manage-pos-header">
      <span>Ticker</span>
      <span>Bezeichnung</span>
      <span>Wert (€)</span>
      <span>Anteil %</span>
      <span>Perf. %</span>
      <span></span>
    </div>
    <div id="managePosList">
      ${data.positions.map(p => renderManagePosRow(p)).join('')}
    </div>
    <button class="manage-add-btn" id="manageAddPos">+ Position hinzufügen</button>`;

  // Delete-Listener
  body.querySelectorAll('.manage-pos-delete').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.manage-pos-row').remove());
  });

  // Hinzufügen-Listener
  document.getElementById('manageAddPos').addEventListener('click', () => {
    const list = document.getElementById('managePosList');
    const div  = document.createElement('div');
    div.innerHTML = renderManagePosRow({ ticker: '', company: '', val: 0, share: 0, perf: 0 });
    const row = div.firstElementChild;
    list.appendChild(row);
    row.querySelector('.manage-pos-delete').addEventListener('click', () => row.remove());
    row.querySelector('.mp-ticker').focus();
  });
}

function renderManagePosRow(p) {
  return `<div class="manage-pos-row">
    <input class="manage-pos-input mp-ticker"  placeholder="MSFT" value="${p.ticker}" maxlength="10">
    <input class="manage-pos-input mp-company" placeholder="Microsoft Corp." value="${p.company}">
    <input class="manage-pos-input mp-val"  type="number" step="1"   placeholder="0"   value="${p.val}">
    <input class="manage-pos-input mp-share" type="number" step="0.1" placeholder="0.0" value="${p.share}">
    <input class="manage-pos-input mp-perf"  type="number" step="0.1" placeholder="0.0" value="${p.perf}">
    <button class="manage-pos-delete" title="Löschen">✕</button>
  </div>`;
}

// Aktuellen Tab-Inhalt in pendingEdits sichern
function collectCurrentTab() {
  const totalEl = document.getElementById('mTotalVal');
  if (!totalEl) return; // Tab noch nicht gerendert

  const positions = [];
  document.querySelectorAll('.manage-pos-row').forEach(row => {
    const ticker  = row.querySelector('.mp-ticker').value.trim().toUpperCase();
    const company = row.querySelector('.mp-company').value.trim();
    const val     = parseFloat(row.querySelector('.mp-val').value)   || 0;
    const share   = parseFloat(row.querySelector('.mp-share').value) || 0;
    const perf    = parseFloat(row.querySelector('.mp-perf').value)  || 0;
    if (ticker) positions.push({ ticker, company, val, share, perf });
  });

  pendingEdits[activeManageBroker] = {
    total: parseFloat(totalEl.value) || 0,
    perf:  parseFloat(document.getElementById('mPerf').value) || 0,
    positions,
  };
}

function saveManage() {
  collectCurrentTab();

  // Alle pendingEdits in portfolioData übernehmen
  Object.keys(pendingEdits).forEach(broker => {
    portfolioData[broker] = pendingEdits[broker];
  });
  pendingEdits = {};

  savePortfolioData();

  // Seite neu rendern
  renderBrokerCards();
  renderPositions();
  updateHeroStats();

  closeManage();
  // Nach dem Speichern wieder sperren — nächste Bearbeitung erfordert erneut PIN
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  loadPortfolioData();

  // Inhalte rendern
  renderBrokerCards();
  renderTreemap();
  renderMonthHeatmap();
  renderPositions();
  renderDividenden();
  updateHeroStats();
  applyUnlockState();

  // ── BROKER-KACHELN ──
  const brokerGrid = document.getElementById('brokerGrid');
  if (brokerGrid) {
    brokerGrid.addEventListener('click', e => {
      const card = e.target.closest('[data-broker]');
      if (card) openModal(card.dataset.broker);
    });
  }

  // ── PRIVACY BUTTON ──
  document.getElementById('privacyBtn')?.addEventListener('click', handlePrivacyBtn);

  // ── BEARBEITEN BUTTON → immer PIN, kein Session-Check ──
  document.getElementById('manageBtn')?.addEventListener('click', () => {
    pendingAction = 'manage';
    openPin();
  });

  // ── PIN NUMPAD ──
  document.getElementById('pinPad')?.addEventListener('click', e => {
    const key = e.target.closest('[data-key]')?.dataset.key;
    if (!key) return;
    if (key === 'del') { pinDelete(); return; }
    pinInput(parseInt(key, 10));
  });

  document.getElementById('pinCancel')?.addEventListener('click', closePin);

  // ── BROKER MODAL ──
  document.getElementById('brokerModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('brokerModal')) closeModal();
  });
  document.getElementById('bmClose')?.addEventListener('click', closeModal);

  // ── MANAGE MODAL ──
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

  // ── PIN OVERLAY ──
  document.getElementById('pinOverlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('pinOverlay')) closePin();
  });

  // ── TASTATUR ──
  document.addEventListener('keydown', e => {
    const modal   = document.getElementById('brokerModal');
    const manage  = document.getElementById('manageModal');
    const pin     = document.getElementById('pinOverlay');
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
