// ── KONSTANTEN ──
const TRIPS_KEY      = 'mw-trips';
const PHOTO_DATA_PFX = 'mw-ph-';

// ── GALERIE-KONFIGURATION ──
const DEFAULT_GALLERY_CONFIG = {
  categories: [
    { id: 'europa', name: 'Europa' },
    { id: 'asien',  name: 'Asien'  },
    { id: 'natur',  name: 'Natur'  },
    { id: 'stadt',  name: 'Stadt'  },
  ],
};

// ── DEFAULT TRIPS (Platzhalter beim ersten Besuch) ──
const DEFAULT_TRIPS = [
  { id: 'japan-2023',        label: 'Japan 2023',        tag: 'asien',  photos: [
    { id: 'dj1', loc: 'Kyoto',       country: 'Japan',        year: '2023', h: 290 },
    { id: 'dj2', loc: 'Tokyo',       country: 'Japan',        year: '2023', h: 200 },
    { id: 'dj3', loc: 'Osaka',       country: 'Japan',        year: '2023', h: 245 },
    { id: 'dj4', loc: 'Nara',        country: 'Japan',        year: '2023', h: 175 },
  ]},
  { id: 'alpen-2024',        label: 'Alpen 2024',         tag: 'natur',  photos: [
    { id: 'da1', loc: 'Dolomiten',   country: 'Italien',      year: '2024', h: 225 },
    { id: 'da2', loc: 'Tirol',       country: 'Österreich',   year: '2024', h: 315 },
    { id: 'da3', loc: 'Schwarzwald', country: 'Deutschland',  year: '2024', h: 185 },
  ]},
  { id: 'suedeuropa-2022',   label: 'Südeuropa 2022',     tag: 'europa', photos: [
    { id: 'ds1', loc: 'Lissabon',    country: 'Portugal',     year: '2022', h: 260 },
    { id: 'ds2', loc: 'Santorini',   country: 'Griechenland', year: '2022', h: 200 },
    { id: 'ds3', loc: 'Barcelona',   country: 'Spanien',      year: '2022', h: 340 },
    { id: 'ds4', loc: 'Sevilla',     country: 'Spanien',      year: '2022', h: 195 },
    { id: 'ds5', loc: 'Mallorca',    country: 'Spanien',      year: '2022', h: 230 },
  ]},
  { id: 'asien-2022',        label: 'Südostasien 2022',   tag: 'asien',  photos: [
    { id: 'dso1', loc: 'Bali',       country: 'Indonesien',   year: '2022', h: 280 },
    { id: 'dso2', loc: 'Singapur',   country: 'Singapur',     year: '2022', h: 195 },
  ]},
  { id: 'skandinavien-2023', label: 'Skandinavien 2023',  tag: 'natur',  photos: [
    { id: 'dsk1', loc: 'Tromsø',     country: 'Norwegen',     year: '2023', h: 320 },
    { id: 'dsk2', loc: 'Bergen',     country: 'Norwegen',     year: '2023', h: 190 },
  ]},
  { id: 'staedte-2021',      label: 'Städte 2021',        tag: 'stadt',  photos: [
    { id: 'dst1', loc: 'Paris',      country: 'Frankreich',   year: '2021', h: 240 },
    { id: 'dst2', loc: 'Amsterdam',  country: 'Niederlande',  year: '2021', h: 195 },
    { id: 'dst3', loc: 'München',    country: 'Deutschland',  year: '2021', h: 270 },
  ]},
];

const PHOTO_ICON = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="0.8">
  <rect x="3" y="3" width="18" height="18" rx="1"/>
  <circle cx="8.5" cy="8.5" r="1.5"/>
  <path d="M21 15l-5-5L5 21"/>
</svg>`;

const CAT_ICONS = {
  europa: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="1.2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  asien:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="1.2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>`,
  natur:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="1.2"><path d="M17 8C8 10 5.9 16.17 3.82 22"/><path d="M9.5 14.5c.5-2.5 4-4.5 6.5-4"/><path d="M14.5 9C16 5 20 4 21 2c0 0-4 1-7 4"/></svg>`,
  stadt:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="1.2"><rect x="3" y="7" width="7" height="14"/><rect x="10" y="3" width="7" height="18"/><path d="M17 7h4v14h-4"/></svg>`,
};

const CAT_SEEDS = {
  europa: 'europe-city-travel',
  asien:  'asia-temple-nature',
  natur:  'mountain-landscape-alps',
  stadt:  'urban-city-night',
};

// ── STATE ──
let galleryConfig;
let activeFilter     = 'alle';
let trips            = [];
let pendingPinAction = null;

// ── GALERIE-KONFIGURATION ──
function loadGalleryConfig() {
  const saved = localStorage.getItem('mw-galleries');
  galleryConfig = saved
    ? JSON.parse(saved)
    : JSON.parse(JSON.stringify(DEFAULT_GALLERY_CONFIG));
}

function saveGalleryConfig() {
  localStorage.setItem('mw-galleries', JSON.stringify(galleryConfig));
}

// ── TRIPS LADEN / SPEICHERN ──
function loadTrips() {
  const saved = localStorage.getItem(TRIPS_KEY);
  if (saved) {
    try { trips = JSON.parse(saved); return; } catch(e) {}
  }
  trips = JSON.parse(JSON.stringify(DEFAULT_TRIPS));
}

function saveTrips() {
  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
}

// ── FOTO-QUELLE ──
function photoSrc(photo) {
  if (photo.hasSrc) {
    const data = localStorage.getItem(PHOTO_DATA_PFX + photo.id);
    if (data) return data;
  }
  const seed = (photo.loc + '-' + photo.year).toLowerCase().replace(/\s+/g, '-');
  return `https://picsum.photos/seed/${seed}/600/${photo.h || 240}`;
}

// ── HILFSFUNKTIONEN ──
function labelToId(label) {
  return label.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function resizeToDataURL(file, maxW, maxH, quality) {
  return new Promise(resolve => {
    const img     = new Image();
    const blobURL = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(blobURL);
      let w = img.naturalWidth, h = img.naturalHeight;
      if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
      if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve({ dataUrl: canvas.toDataURL('image/jpeg', quality), w, h });
    };
    img.onerror = () => { URL.revokeObjectURL(blobURL); resolve(null); };
    img.src = blobURL;
  });
}

// ── KATEGORIE-KACHELN RENDERN ──
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  grid.innerHTML = galleryConfig.categories.map(cat => {
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
  const cat = galleryConfig.categories.find(c => c.id === tag);
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
        ${trip.photos.map(p => `
          <div class="photo-item">
            <img class="photo-img"
                 src="${photoSrc(p)}"
                 alt="${p.loc}, ${p.year}"
                 loading="lazy"
                 style="height:${p.h}px">
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

// ── PIN ──
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
    if (pendingPinAction) {
      pendingPinAction();
      pendingPinAction = null;
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
  if (activeFilter !== 'alle') {
    const cat = galleryConfig.categories.find(c => c.id === activeFilter);
    if (cat) document.getElementById('gallery-title').textContent = cat.name;
  }
  closeGalleryModal();
}

// ── UPLOAD MODAL ──
function openUploadModal() {
  const sel = document.getElementById('up-kategorie');
  if (sel) sel.innerHTML = galleryConfig.categories
    .map(c => `<option value="${c.id}">${c.name}</option>`).join('');

  const list = document.getElementById('up-reiselist');
  if (list) list.innerHTML = trips.map(t => `<option value="${t.label}">`).join('');

  const jahrEl = document.getElementById('up-jahr');
  if (jahrEl && !jahrEl.value) jahrEl.value = new Date().getFullYear();

  document.getElementById('upError').style.display = 'none';
  document.getElementById('uploadModal').classList.add('visible');
}

function closeUploadModal() {
  document.getElementById('uploadModal').classList.remove('visible');
  document.getElementById('uploadForm').reset();
  const btn = document.getElementById('up-submit');
  if (btn) { btn.textContent = 'Hinzufügen'; btn.disabled = false; }
}

async function submitUpload() {
  const label   = document.getElementById('up-reisename').value.trim();
  const country = document.getElementById('up-land').value.trim();
  const loc     = document.getElementById('up-ort').value.trim();
  const year    = document.getElementById('up-jahr').value.trim();
  const tag     = document.getElementById('up-kategorie').value;
  const fileInput = document.getElementById('up-foto');
  const errEl   = document.getElementById('upError');

  if (!label) {
    errEl.textContent = 'Reisename ist erforderlich.';
    errEl.style.display = 'block';
    return;
  }
  if (!country) {
    errEl.textContent = 'Land ist erforderlich.';
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';

  const btn = document.getElementById('up-submit');
  btn.textContent = 'Wird gespeichert…';
  btn.disabled = true;

  const photoId    = 'ph-' + Date.now();
  const photoEntry = {
    id:     photoId,
    loc:    loc || country,
    country,
    year:   year || String(new Date().getFullYear()),
    h:      240,
    hasSrc: false,
  };

  const file = fileInput?.files?.[0];
  if (file) {
    const result = await resizeToDataURL(file, 800, 600, 0.82);
    if (result) {
      try {
        localStorage.setItem(PHOTO_DATA_PFX + photoId, result.dataUrl);
        photoEntry.hasSrc = true;
        const h = Math.round(result.h * 300 / result.w);
        photoEntry.h = Math.max(150, Math.min(h, 420));
      } catch(e) {
        errEl.textContent = 'Speicher fast voll — Foto ohne Vorschaubild gespeichert.';
        errEl.style.display = 'block';
      }
    }
  }

  // Reise finden oder neu anlegen
  let trip = trips.find(t => t.label.toLowerCase() === label.toLowerCase());
  if (!trip) {
    trip = { id: labelToId(label), label, tag, photos: [] };
    trips.unshift(trip);
  }
  trip.photos.push(photoEntry);

  saveTrips();
  renderCategories();
  renderGallery();
  closeUploadModal();
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  loadGalleryConfig();
  loadTrips();
  renderCategories();
  renderGallery();

  // Filter-Klicks
  document.getElementById('categoriesGrid')?.addEventListener('click', e => {
    const card = e.target.closest('[data-filter]');
    if (card) filterGallery(card.dataset.filter);
  });

  // Bearbeiten → PIN → Galerie-Modal
  document.getElementById('galleryEditBtn')?.addEventListener('click', () => {
    pendingPinAction = openGalleryModal;
    openPin();
  });

  // Hochladen → PIN → Upload-Modal
  document.getElementById('uploadBtn')?.addEventListener('click', () => {
    pendingPinAction = openUploadModal;
    openPin();
  });

  // Galerie-Modal
  document.getElementById('galleryModalClose')?.addEventListener('click', closeGalleryModal);
  document.getElementById('galleryModalSave')?.addEventListener('click', saveGalleryModal);
  document.getElementById('galleryModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('galleryModal')) closeGalleryModal();
  });

  // Upload-Modal
  document.getElementById('uploadModalClose')?.addEventListener('click', closeUploadModal);
  document.getElementById('up-submit')?.addEventListener('click', submitUpload);
  document.getElementById('uploadModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('uploadModal')) closeUploadModal();
  });

  // Reisename → Kategorie auto-fill
  document.getElementById('up-reisename')?.addEventListener('input', e => {
    const val   = e.target.value.trim().toLowerCase();
    const match = trips.find(t => t.label.toLowerCase() === val);
    if (match) document.getElementById('up-kategorie').value = match.tag;
  });

  // PIN
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
      closeUploadModal();
      closePin();
    }
    const pin = document.getElementById('pinOverlay');
    if (pin?.classList.contains('visible')) {
      if (e.key >= '0' && e.key <= '9') pinInput(parseInt(e.key, 10));
      if (e.key === 'Backspace') pinDelete();
    }
  });
});
