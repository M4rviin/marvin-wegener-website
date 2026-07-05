// ── REISEN-DATEN (PLATZHALTER) ──
const trips = [
  { id: 'japan-2023',       label: 'Japan 2023',        tag: 'asien',  photos: [
    { loc: 'Kyoto',      year: '2023', h: 290 },
    { loc: 'Tokyo',      year: '2023', h: 200 },
    { loc: 'Osaka',      year: '2023', h: 245 },
    { loc: 'Nara',       year: '2023', h: 175 },
  ]},
  { id: 'alpen-2024',       label: 'Alpen 2024',         tag: 'natur',  photos: [
    { loc: 'Dolomiten',  year: '2024', h: 225 },
    { loc: 'Tirol',      year: '2024', h: 315 },
    { loc: 'Schwarzwald',year: '2024', h: 185 },
  ]},
  { id: 'suedeuropa-2022',  label: 'Südeuropa 2022',     tag: 'europa', photos: [
    { loc: 'Lissabon',   year: '2022', h: 260 },
    { loc: 'Santorini',  year: '2022', h: 200 },
    { loc: 'Barcelona',  year: '2022', h: 340 },
    { loc: 'Sevilla',    year: '2022', h: 195 },
    { loc: 'Mallorca',   year: '2022', h: 230 },
  ]},
  { id: 'asien-2022',       label: 'Südostasien 2022',   tag: 'asien',  photos: [
    { loc: 'Bali',       year: '2022', h: 280 },
    { loc: 'Singapur',   year: '2022', h: 195 },
  ]},
  { id: 'skandinavien-2023',label: 'Skandinavien 2023',  tag: 'natur',  photos: [
    { loc: 'Norwegen',   year: '2023', h: 320 },
    { loc: 'Bergen',     year: '2023', h: 190 },
  ]},
  { id: 'staedte-2021',     label: 'Städte 2021',        tag: 'stadt',  photos: [
    { loc: 'Paris',      year: '2021', h: 240 },
    { loc: 'Amsterdam',  year: '2021', h: 195 },
    { loc: 'München',    year: '2021', h: 270 },
  ]},
];

const PHOTO_ICON = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="0.8">
  <rect x="3" y="3" width="18" height="18" rx="1"/>
  <circle cx="8.5" cy="8.5" r="1.5"/>
  <path d="M21 15l-5-5L5 21"/>
</svg>`;

let activeFilter = 'alle';

// ── GALERIE-FILTER ──
function filterGallery(tag) {
  activeFilter = tag;
  const titles = { alle: 'Alle Reisen', europa: 'Europa', asien: 'Asien', natur: 'Natur', stadt: 'Stadt' };
  document.getElementById('gallery-title').textContent = titles[tag] ?? 'Alle Reisen';
  renderGallery();
  document.querySelector('.gallery-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── GALERIE RENDERN ──
function renderGallery() {
  const visible = activeFilter === 'alle' ? trips : trips.filter(t => t.tag === activeFilter);
  const total   = visible.reduce((s, t) => s + t.photos.length, 0);
  document.getElementById('count').textContent = total + ' Aufnahmen';
  document.getElementById('gallery').innerHTML = visible.map(trip => `
    <div class="trip-group">
      <div class="trip-label">${trip.label}</div>
      <div class="masonry">
        ${trip.photos.map(p => `
          <div class="photo-item">
            <div class="ph c-${trip.tag}" style="height:${p.h}px">${PHOTO_ICON}</div>
            <div class="overlay">
              <div class="ov-inner">
                <span class="ov-loc">${p.loc}</span>
                <span class="ov-yr">${p.year}</span>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

// ── KATEGORIE-ZÄHLER ──
function updateCounts() {
  ['europa', 'asien', 'natur', 'stadt'].forEach(tag => {
    const n = trips.filter(t => t.tag === tag).reduce((s, t) => s + t.photos.length, 0);
    const el = document.getElementById('cnt-' + tag);
    if (el) el.textContent = n + ' Aufnahmen';
  });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  updateCounts();
  renderGallery();

  // Filter-Klicks via Event Delegation
  const categories = document.querySelector('.categories');
  if (categories) {
    categories.addEventListener('click', e => {
      const card = e.target.closest('[data-filter]');
      if (card) filterGallery(card.dataset.filter);
    });
  }
});
