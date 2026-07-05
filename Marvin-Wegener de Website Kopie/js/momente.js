// ── GALERIE-KONFIGURATION (localStorage überschreibt Standardwerte) ──
const DEFAULT_GALLERY_CONFIG = {
  categories: [
    { id: 'europa', name: 'Europa' },
    { id: 'asien',  name: 'Asien'  },
    { id: 'natur',  name: 'Natur'  },
    { id: 'stadt',  name: 'Stadt'  },
  ],
};

// PLATZHALTER: Reisedaten — hier trägst du deine echten Trips ein
const trips = [
  { id: 'japan-2023',        label: 'Japan 2023',        tag: 'asien',  photos: [
    { loc: 'Kyoto',       year: '2023', h: 290 },
    { loc: 'Tokyo',       year: '2023', h: 200 },
    { loc: 'Osaka',       year: '2023', h: 245 },
    { loc: 'Nara',        year: '2023', h: 175 },
  ]},
  { id: 'alpen-2024',        label: 'Alpen 2024',         tag: 'natur',  photos: [
    { loc: 'Dolomiten',   year: '2024', h: 225 },
    { loc: 'Tirol',       year: '2024', h: 315 },
    { loc: 'Schwarzwald', year: '2024', h: 185 },
  ]},
  { id: 'suedeuropa-2022',   label: 'Südeuropa 2022',     tag: 'europa', photos: [
    { loc: 'Lissabon',    year: '2022', h: 260 },
    { loc: 'Santorini',   year: '2022', h: 200 },
    { loc: 'Barcelona',   year: '2022', h: 340 },
    { loc: 'Sevilla',     year: '2022', h: 195 },
    { loc: 'Mallorca',    year: '2022', h: 230 },
  ]},
  { id: 'asien-2022',        label: 'Südostasien 2022',   tag: 'asien',  photos: [
    { loc: 'Bali',        year: '2022', h: 280 },
    { loc: 'Singapur',    year: '2022', h: 195 },
  ]},
  { id: 'skandinavien-2023', label: 'Skandinavien 2023',  tag: 'natur',  photos: [
    { loc: 'Norwegen',    year: '2023', h: 320 },
    { loc: 'Bergen',      year: '2023', h: 190 },
  ]},
  { id: 'staedte-2021',      label: 'Städte 2021',        tag: 'stadt',  photos: [
    { loc: 'Paris',       year: '2021', h: 240 },
    { loc: 'Amsterdam',   year: '2021', h: 195 },
    { loc: 'München',     year: '2021', h: 270 },
  ]},
];

const PHOTO_ICON = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="0.8">
  <rect x="3" y="3" width="18" height="18" rx="1"/>
  <circle cx="8.5" cy="8.5" r="1.5"/>
  <path d="M21 15l-5-5L5 21"/>
</svg>`;

// Kategorie-Icons
const CAT_ICONS = {
  europa: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="1.2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  asien:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="1.2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>`,
  natur:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="1.2"><path d="M17 8C8 10 5.9 16.17 3.82 22"/><path d="M9.5 14.5c.5-2.5 4-4.5 6.5-4"/><path d="M14.5 9C16 5 20 4 21 2c0 0-4 1-7 4"/></svg>`,
  stadt:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="1.2"><rect x="3" y="7" width="7" height="14"/><rect x="10" y="3" width="7" height="18"/><path d="M17 7h4v14h-4"/></svg>`,
};

const CAT_GRADIENTS = [
  'linear-gradient(160deg, #2a3545, #0d1520)',
  'linear-gradient(160deg, #2d3020, #0e1208)',
  'linear-gradient(160deg, #352a20, #130d08)',
  'linear-gradient(160deg, #253030, #0a1212)',
];

let galleryConfig;
let activeFilter = 'alle';

// ── KONFIGURATION LADEN / SPEICHERN ──
function loadGalleryConfig() {
  const saved = localStorage.getItem('mw-galleries');
  galleryConfig = saved
    ? JSON.parse(saved)
    : JSON.parse(JSON.stringify(DEFAULT_GALLERY_CONFIG));
}

function saveGalleryConfig() {
  localStorage.setItem('mw-galleries', JSON.stringify(galleryConfig));
}

// Repräsentative Picsum-Seeds pro Kategorie
const CAT_SEEDS = {
  europa: 'europe-city-travel',
  asien:  'asia-temple-nature',
  natur:  'mountain-landscape-alps',
  stadt:  'urban-city-night',
};

// ── KATEGORIE-KACHELN RENDERN ──
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  grid.innerHTML = galleryConfig.categories.map((cat, i) => {
    const count = trips.filter(t => t.tag === cat.id).reduce((s, t) => s + t.photos.length, 0);
    const icon  = CAT_ICONS[cat.id] ?? CAT_ICONS.europa;
    const seed  = CAT_SEEDS[cat.id] ?? cat.id;
    return `
      <div class="cat-card" data-filter="${cat.id}">
        <img class="cat-bg" src="https://picsum.photos/seed/${seed}/600/450" alt="${cat.name}" loading="lazy">
        <div class="cat-overlay"></div>
        <div class="cat-content">
          <div class="cat-icon">${icon}</div>
          <div class="cat-name">${cat.name}</div>
          <div class="cat-count">${count} Aufnahmen</div>
        </div>
      </div>`;
  }).join('');
}

// ── GALERIE-FILTER ──
function filterGallery(tag) {
  activeFilter = tag;
  const cat   = galleryConfig.categories.find(c => c.id === tag);
  document.getElementById('gallery-title').textContent = cat ? cat.name : 'Alle Momente';
  renderGallery();
  document.querySelector('.gallery-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── GALERIE RENDERN ──
function renderGallery() {
  const visible = activeFilter === 'alle'
    ? trips
    : trips.filter(t => t.tag === activeFilter);
  const total = visible.reduce((s, t) => s + t.photos.length, 0);
  document.getElementById('count').textContent = total + ' Aufnahmen';
  document.getElementById('gallery').innerHTML = visible.map(trip => `
    <div class="trip-group">
      <div class="trip-label">${trip.label}</div>
      <div class="masonry">
        ${trip.photos.map(p => {
          const seed = (p.loc + '-' + p.year).toLowerCase().replace(/\s+/g, '-');
          return `
          <div class="photo-item">
            <img class="photo-img"
                 src="https://picsum.photos/seed/${seed}/600/${p.h}"
                 alt="${p.loc}, ${p.year}"
                 loading="lazy"
                 style="height:${p.h}px">
            <div class="overlay">
              <div class="ov-inner">
                <span class="ov-loc">${p.loc}</span>
                <span class="ov-yr">${p.year}</span>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`).join('');
}

// ── PIN (für Bearbeiten-Schutz) ──
let pinBuffer = '';

function openPin() {
  pinBuffer = '';
  updateDots();
  document.getElementById('pinError').textContent = '';
  document.getElementById('pinOverlay').classList.add('visible');
}

function closePin() {
  document.getElementById('pinOverlay').classList.remove('visible');
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
    closePin();
    openGalleryModal(); // Direkt öffnen, kein Session-Unlock
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

// ── GALERIE BEARBEITEN MODAL ──
function openGalleryModal() {
  const body = document.getElementById('galleryModalBody');
  if (!body) return;
  body.innerHTML = galleryConfig.categories.map((cat, i) => {
    const defaultName = DEFAULT_GALLERY_CONFIG.categories[i]?.name ?? cat.id;
    return `<div class="gm-row">
      <span class="gm-row-label">${defaultName}</span>
      <input class="gm-input" data-cat-id="${cat.id}" value="${cat.name}" placeholder="${defaultName}">
    </div>`;
  }).join('');
  document.getElementById('galleryModal').classList.add('visible');
}

function closeGalleryModal() {
  document.getElementById('galleryModal').classList.remove('visible');
}

function saveGalleryModal() {
  document.querySelectorAll('.gm-input[data-cat-id]').forEach(input => {
    const cat = galleryConfig.categories.find(c => c.id === input.dataset.catId);
    if (cat && input.value.trim()) cat.name = input.value.trim();
  });
  saveGalleryConfig();
  renderCategories();
  // Galerie-Titel aktualisieren falls Filter aktiv
  if (activeFilter !== 'alle') {
    const cat = galleryConfig.categories.find(c => c.id === activeFilter);
    if (cat) document.getElementById('gallery-title').textContent = cat.name;
  }
  closeGalleryModal();
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  loadGalleryConfig();
  renderCategories();
  renderGallery();

  // Filter-Klicks (Event Delegation)
  document.getElementById('categoriesGrid')?.addEventListener('click', e => {
    const card = e.target.closest('[data-filter]');
    if (card) filterGallery(card.dataset.filter);
  });

  // Galerie bearbeiten → immer PIN zuerst
  document.getElementById('galleryEditBtn')?.addEventListener('click', openPin);

  // Galerie Modal
  document.getElementById('galleryModalClose')?.addEventListener('click', closeGalleryModal);
  document.getElementById('galleryModalSave')?.addEventListener('click', saveGalleryModal);
  document.getElementById('galleryModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('galleryModal')) closeGalleryModal();
  });

  // PIN Modal
  document.getElementById('pinPad')?.addEventListener('click', e => {
    const key = e.target.closest('[data-key]')?.dataset.key;
    if (!key) return;
    if (key === 'del') { pinDelete(); return; }
    pinInput(parseInt(key, 10));
  });
  document.getElementById('pinCancel')?.addEventListener('click', closePin);
  document.getElementById('pinOverlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('pinOverlay')) closePin();
  });

  // ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeGalleryModal();
      closePin();
    }
    const pin = document.getElementById('pinOverlay');
    if (pin?.classList.contains('visible')) {
      if (e.key >= '0' && e.key <= '9') pinInput(parseInt(e.key, 10));
      if (e.key === 'Backspace') pinDelete();
    }
  });
});
