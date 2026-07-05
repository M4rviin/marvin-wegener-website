// ── DEMO-DATEN ──
const DEMO_DATA = [
  {
    id: 'demo-01', date: '2019-12', title: 'Weihnachten 2019',
    photos: [
      'https://picsum.photos/seed/fam-d01-a/600/600',
      'https://picsum.photos/seed/fam-d01-b/600/600',
      'https://picsum.photos/seed/fam-d01-c/600/600',
    ],
  },
  {
    id: 'demo-02', date: '2020-04', title: 'Ostern im Garten',
    photos: [
      'https://picsum.photos/seed/fam-d02-a/600/600',
      'https://picsum.photos/seed/fam-d02-b/600/600',
    ],
  },
  {
    id: 'demo-03', date: '2020-08', title: 'Sommer 2020',
    photos: [
      'https://picsum.photos/seed/fam-d03-a/600/600',
      'https://picsum.photos/seed/fam-d03-b/600/600',
      'https://picsum.photos/seed/fam-d03-c/600/600',
      'https://picsum.photos/seed/fam-d03-d/600/600',
    ],
  },
  {
    id: 'demo-04', date: '2020-12', title: 'Weihnachten 2020',
    photos: [
      'https://picsum.photos/seed/fam-d04-a/600/600',
      'https://picsum.photos/seed/fam-d04-b/600/600',
    ],
  },
  {
    id: 'demo-05', date: '2021-03', title: 'Geburtstag Mama',
    photos: [
      'https://picsum.photos/seed/fam-d05-a/600/600',
      'https://picsum.photos/seed/fam-d05-b/600/600',
      'https://picsum.photos/seed/fam-d05-c/600/600',
    ],
  },
  {
    id: 'demo-06', date: '2021-07', title: 'Campingurlaub',
    photos: [
      'https://picsum.photos/seed/fam-d06-a/600/600',
      'https://picsum.photos/seed/fam-d06-b/600/600',
      'https://picsum.photos/seed/fam-d06-c/600/600',
      'https://picsum.photos/seed/fam-d06-d/600/600',
      'https://picsum.photos/seed/fam-d06-e/600/600',
    ],
  },
  {
    id: 'demo-07', date: '2021-12', title: 'Weihnachten 2021',
    photos: [
      'https://picsum.photos/seed/fam-d07-a/600/600',
      'https://picsum.photos/seed/fam-d07-b/600/600',
    ],
  },
  {
    id: 'demo-08', date: '2022-05', title: 'Geburtstag Papa',
    photos: [
      'https://picsum.photos/seed/fam-d08-a/600/600',
      'https://picsum.photos/seed/fam-d08-b/600/600',
      'https://picsum.photos/seed/fam-d08-c/600/600',
    ],
  },
  {
    id: 'demo-09', date: '2022-08', title: 'Sommerurlaub Österreich',
    photos: [
      'https://picsum.photos/seed/fam-d09-a/600/600',
      'https://picsum.photos/seed/fam-d09-b/600/600',
      'https://picsum.photos/seed/fam-d09-c/600/600',
      'https://picsum.photos/seed/fam-d09-d/600/600',
    ],
  },
  {
    id: 'demo-10', date: '2022-12', title: 'Weihnachten 2022',
    photos: [
      'https://picsum.photos/seed/fam-d10-a/600/600',
      'https://picsum.photos/seed/fam-d10-b/600/600',
      'https://picsum.photos/seed/fam-d10-c/600/600',
    ],
  },
  {
    id: 'demo-11', date: '2023-03', title: 'Skifahren',
    photos: [
      'https://picsum.photos/seed/fam-d11-a/600/600',
      'https://picsum.photos/seed/fam-d11-b/600/600',
    ],
  },
  {
    id: 'demo-12', date: '2023-06', title: 'Grillabend',
    photos: [
      'https://picsum.photos/seed/fam-d12-a/600/600',
      'https://picsum.photos/seed/fam-d12-b/600/600',
      'https://picsum.photos/seed/fam-d12-c/600/600',
    ],
  },
  {
    id: 'demo-13', date: '2023-08', title: 'Urlaub 2023',
    photos: [
      'https://picsum.photos/seed/fam-d13-a/600/600',
      'https://picsum.photos/seed/fam-d13-b/600/600',
      'https://picsum.photos/seed/fam-d13-c/600/600',
      'https://picsum.photos/seed/fam-d13-d/600/600',
    ],
  },
  {
    id: 'demo-14', date: '2023-12', title: 'Weihnachten 2023',
    photos: [
      'https://picsum.photos/seed/fam-d14-a/600/600',
      'https://picsum.photos/seed/fam-d14-b/600/600',
    ],
  },
  {
    id: 'demo-15', date: '2024-02', title: 'Skiwochenende',
    photos: [
      'https://picsum.photos/seed/fam-d15-a/600/600',
      'https://picsum.photos/seed/fam-d15-b/600/600',
      'https://picsum.photos/seed/fam-d15-c/600/600',
    ],
  },
  {
    id: 'demo-16', date: '2024-04', title: 'Ostern',
    photos: [
      'https://picsum.photos/seed/fam-d16-a/600/600',
      'https://picsum.photos/seed/fam-d16-b/600/600',
      'https://picsum.photos/seed/fam-d16-c/600/600',
      'https://picsum.photos/seed/fam-d16-d/600/600',
    ],
  },
  {
    id: 'demo-17', date: '2024-07', title: 'Nordsee',
    photos: [
      'https://picsum.photos/seed/fam-d17-a/600/600',
      'https://picsum.photos/seed/fam-d17-b/600/600',
      'https://picsum.photos/seed/fam-d17-c/600/600',
    ],
  },
  {
    id: 'demo-18', date: '2024-10', title: 'Herbstwanderung',
    photos: [
      'https://picsum.photos/seed/fam-d18-a/600/600',
      'https://picsum.photos/seed/fam-d18-b/600/600',
    ],
  },
  {
    id: 'demo-19', date: '2024-12', title: 'Weihnachten 2024',
    photos: [
      'https://picsum.photos/seed/fam-d19-a/600/600',
      'https://picsum.photos/seed/fam-d19-b/600/600',
      'https://picsum.photos/seed/fam-d19-c/600/600',
    ],
  },
  {
    id: 'demo-20', date: '2025-03', title: 'Geburtstag',
    photos: [
      'https://picsum.photos/seed/fam-d20-a/600/600',
      'https://picsum.photos/seed/fam-d20-b/600/600',
    ],
  },
  {
    id: 'demo-21', date: '2025-07', title: 'Sommerurlaub',
    photos: [
      'https://picsum.photos/seed/fam-d21-a/600/600',
      'https://picsum.photos/seed/fam-d21-b/600/600',
      'https://picsum.photos/seed/fam-d21-c/600/600',
      'https://picsum.photos/seed/fam-d21-d/600/600',
      'https://picsum.photos/seed/fam-d21-e/600/600',
    ],
  },
  {
    id: 'demo-22', date: '2025-12', title: 'Weihnachten',
    photos: [
      'https://picsum.photos/seed/fam-d22-a/600/600',
      'https://picsum.photos/seed/fam-d22-b/600/600',
      'https://picsum.photos/seed/fam-d22-c/600/600',
    ],
  },
];

// ── STORAGE ──
const KEY = 'mw-tjmmm';

function loadData() {
  const raw = localStorage.getItem(KEY);
  if (raw !== null) return JSON.parse(raw);
  saveData(DEMO_DATA);
  return DEMO_DATA;
}

function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

// Alle Einträge älteste zuerst sortiert
function getSortedData() {
  return loadData().slice().sort((a, b) => a.date.localeCompare(b.date));
}

// ── DATUM FORMATIEREN ──
function fmtDate(yyyymm) {
  const [y, m] = yyyymm.split('-').map(Number);
  return new Date(y, m - 1).toLocaleString('de-DE', { month: 'long', year: 'numeric' });
}

// ── BILD KOMPRIMIEREN (max 1000px, 78% JPEG) ──
function compressImage(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const MAX = 1000;
        let w = img.width, h = img.height;
        if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        c.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL('image/jpeg', 0.78));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ── SESSION AUTH ── (immer false beim Laden — PIN bei jedem Besuch nötig)
let sessionAuth = false;

// ── PIN ──
let pinBuffer   = '';
let pendingAction = null; // 'page' | 'add' (delete braucht kein PIN mehr)

function openPin(action) {
  pendingAction = action;
  pinBuffer = '';
  updatePinDots();
  document.getElementById('pinError').textContent = '';

  if (action === 'page') {
    document.getElementById('pinTitle').textContent = 'T · J · M · M · M';
    document.getElementById('pinDesc').textContent  = 'Privat – PIN eingeben zum Entsperren.';
    // Cancel → zurück zur Startseite
    document.getElementById('pinCancel').textContent = '← Zurück';
  } else {
    document.getElementById('pinTitle').textContent = 'Bearbeiten';
    document.getElementById('pinDesc').textContent  = 'PIN eingeben.';
    document.getElementById('pinCancel').textContent = 'Abbrechen';
  }

  document.getElementById('pinOverlay').style.zIndex = action === 'page' ? '500' : '200';
  document.getElementById('pinOverlay').classList.add('visible');
}

function closePin() {
  if (pendingAction === 'page') {
    // PIN für Seitenzugang abgebrochen → zurück
    window.location.href = 'index.html';
    return;
  }
  document.getElementById('pinOverlay').classList.remove('visible');
  pendingAction = null;
  pinBuffer = '';
  updatePinDots();
}

function pinInput(digit) {
  if (pinBuffer.length >= 4) return;
  pinBuffer += digit;
  updatePinDots();
  if (pinBuffer.length === 4) setTimeout(checkPin, 120);
}

function pinDelete() {
  pinBuffer = pinBuffer.slice(0, -1);
  updatePinDots();
  document.getElementById('pinError').textContent = '';
}

function updatePinDots() {
  for (let i = 0; i < 4; i++) {
    const d = document.getElementById('d' + i);
    if (!d) continue;
    d.classList.toggle('filled', i < pinBuffer.length);
    d.classList.remove('error');
  }
}

function checkPin() {
  if (pinBuffer === PIN) {
    sessionAuth = true;
    const action = pendingAction;

    document.getElementById('pinOverlay').classList.remove('visible');
    pendingAction = null;
    pinBuffer = '';
    updatePinDots();

    if (action === 'add') openAddModal();
    // 'page' → Seite bleibt sichtbar (overlay war Vollbild-PIN)
  } else {
    for (let i = 0; i < 4; i++) {
      const d = document.getElementById('d' + i);
      if (!d) continue;
      d.classList.remove('filled');
      d.classList.add('error');
    }
    document.getElementById('pinError').textContent = 'Falscher PIN';
    setTimeout(() => {
      pinBuffer = '';
      updatePinDots();
      document.getElementById('pinError').textContent = '';
    }, 1000);
  }
}

// ── SLIDESHOW ──
let slideIdx   = 0;
let slideTimer = null;

function getHeroPhotos() {
  const data = getSortedData();
  const photos = [];
  // Nehme das erste Bild aus jedem Eintrag (neueste zuerst für Hero)
  data.slice().reverse().forEach(e => { if (e.photos[0]) photos.push(e.photos[0]); });
  return photos.slice(0, 5).length > 0 ? photos.slice(0, 5) : [
    'https://picsum.photos/seed/fam-hero-slide1/900/450',
    'https://picsum.photos/seed/fam-hero-slide2/900/450',
    'https://picsum.photos/seed/fam-hero-slide3/900/450',
  ];
}

function initSlideshow() {
  const photos    = getHeroPhotos();
  const container = document.getElementById('heroSlideshow');
  const dotsEl    = document.getElementById('heroDots');
  if (!container) return;

  slideIdx = 0;
  container.innerHTML = photos.map((src, i) => `
    <div class="slide ${i === 0 ? 'active' : ''}"
         style="background-image:url('${src}')"></div>`).join('');

  if (dotsEl) {
    dotsEl.innerHTML = photos.map((_, i) => `
      <div class="hero-dot ${i === 0 ? 'active' : ''}" data-i="${i}"></div>`).join('');
    dotsEl.querySelectorAll('.hero-dot').forEach(dot => {
      dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.i)));
    });
  }

  clearInterval(slideTimer);
  if (photos.length > 1) slideTimer = setInterval(() => goToSlide((slideIdx + 1) % photos.length), 4000);
}

function goToSlide(idx) {
  document.querySelectorAll('.slide')[slideIdx]?.classList.remove('active');
  document.querySelectorAll('.hero-dot')[slideIdx]?.classList.remove('active');
  slideIdx = idx;
  document.querySelectorAll('.slide')[slideIdx]?.classList.add('active');
  document.querySelectorAll('.hero-dot')[slideIdx]?.classList.add('active');
}

// ── HÖHENMESSUNG (für balanciertes Zwei-Spalten-Layout) ──
// Kartenhöhe hängt nur vom Inhalt ab (Titel ja/nein, Fotoanzahl), nicht von
// links/rechts — beide Spalten sind gleich breit. Ein verstecktes Probe-Element
// misst die reale Höhe, damit wir wissen, welche Spalte gerade kürzer ist.
function getColumnWidth() {
  const wrap = document.querySelector('.tl-wrap');
  if (!wrap) return 380;
  const inner = wrap.clientWidth - 64; // 2rem Padding beidseitig
  return Math.max(200, Math.floor(inner / 2) - 26); // minus Connector-Abstand
}

function measureCardHeight(cardHtml, colWidthPx) {
  let probe = document.getElementById('tlProbe');
  if (!probe) {
    probe = document.createElement('div');
    probe.id = 'tlProbe';
    probe.style.position   = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.pointerEvents = 'none';
    probe.style.top  = '-9999px';
    probe.style.left = '-9999px';
    document.body.appendChild(probe);
  }
  probe.style.width = colWidthPx + 'px';
  probe.innerHTML   = cardHtml;
  return probe.firstElementChild.offsetHeight;
}

function buildCardHtml(entry, extraMarginTop = 0) {
  const preview = entry.photos.slice(0, 3);
  const extras  = entry.photos.length - 3;
  const thumbs = preview.map((src, i) => `
    <div class="album-thumb"
         data-entry-id="${entry.id}"
         data-photo-idx="${i}"
         style="background-image:url('${src}')"></div>`
  ).join('') + (extras > 0 ? `<div class="album-more">+${extras}</div>` : '');

  const styleAttr = extraMarginTop > 0 ? ` style="margin-top:${extraMarginTop}px"` : '';

  return `
    <div class="album-card" data-id="${entry.id}"${styleAttr}>
      <span class="tl-dot"></span>
      <button class="album-delete" data-id="${entry.id}" title="Löschen">✕</button>
      <div class="album-date">${fmtDate(entry.date)}</div>
      ${entry.title ? `<div class="album-title">${entry.title}</div>` : ''}
      <div class="album-photos">${thumbs}</div>
      <div class="album-count">${entry.photos.length} ${entry.photos.length === 1 ? 'Foto' : 'Fotos'}</div>
    </div>`;
}

// ── TIMELINE RENDERN (älteste oben) ──
function renderTimeline() {
  const data = getSortedData();
  const tl   = document.getElementById('timeline');
  if (!tl) return;

  if (data.length === 0) {
    tl.innerHTML = `
      <div class="tl-empty">
        <div class="tl-empty-dot"></div>
        <p class="tl-empty-text">Noch keine Momente vorhanden.<br>Füge den ersten gemeinsamen Moment hinzu.</p>
      </div>`;
    return;
  }

  // Nach Jahr gruppieren (älteste oben → aufsteigend)
  const byYear = {};
  data.forEach(e => {
    const yr = e.date.slice(0, 4);
    (byYear[yr] = byYear[yr] || []).push(e);
  });
  const years = Object.keys(byYear).sort((a, b) => a - b); // aufsteigend

  const colWidth = getColumnWidth();
  const GAP = 10;
  let html = '';

  const DOT_OFFSET = 22; // .tl-dot top-Position innerhalb der Karte
  const MIN_GAP    = 34; // Mindestabstand zwischen zwei Dots (spaltenübergreifend)

  years.forEach(year => {
    const entries = byYear[year]; // bereits aufsteigend sortiert (chronologisch)

    // 1) Höhen messen und mit Greedy-Balancing der jeweils kürzeren Spalte zuteilen.
    let leftHeight = 0, rightHeight = 0;
    const leftList = [], rightList = [];

    entries.forEach(entry => {
      const cardHtml = buildCardHtml(entry);
      const height   = measureCardHeight(cardHtml, colWidth);

      if (leftHeight <= rightHeight) {
        leftList.push({ entry, heightBefore: leftHeight, height });
        leftHeight += height + GAP;
      } else {
        rightList.push({ entry, heightBefore: rightHeight, height });
        rightHeight += height + GAP;
      }
    });

    // 2) Spaltenübergreifend nach tatsächlicher Dot-Position sortieren und
    // Mindestabstand erzwingen — verhindert, dass zwei Dots aus verschiedenen
    // Spalten optisch verschmelzen, wenn beide Spalten zufällig gleich hoch sind.
    const merged = [
      ...leftList.map(x => ({ ...x, column: 'left' })),
      ...rightList.map(x => ({ ...x, column: 'right' })),
    ].sort((a, b) => a.heightBefore - b.heightBefore);

    const shift = { left: 0, right: 0 };
    let lastDotY = -Infinity;

    merged.forEach(item => {
      const dotY = item.heightBefore + shift[item.column] + DOT_OFFSET;
      if (dotY - lastDotY < MIN_GAP) {
        const delta = MIN_GAP - (dotY - lastDotY);
        shift[item.column] += delta;
        item.extraMargin = delta;
        lastDotY = dotY + delta;
      } else {
        item.extraMargin = 0;
        lastDotY = dotY;
      }
    });

    // 3) Finales HTML in ursprünglicher Spalten-Reihenfolge bauen
    const marginById = new Map(merged.map(m => [m.entry.id, m.extraMargin]));
    const leftCards  = leftList.map(x => buildCardHtml(x.entry, marginById.get(x.entry.id)));
    const rightCards = rightList.map(x => buildCardHtml(x.entry, marginById.get(x.entry.id)));

    html += `<div class="year-block">
      <div class="year-badge"><span>${year}</span></div>
      <div class="tl-columns">
        <div class="tl-col tl-col-left">${leftCards.join('')}</div>
        <div class="tl-col tl-col-right">${rightCards.join('')}</div>
      </div>
    </div>`;
  });

  tl.innerHTML = html;

  // Lösch-Handler (Bestätigung durch doppeltes Klicken)
  tl.querySelectorAll('.album-delete').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (btn.dataset.confirm === '1') {
        doDelete(btn.dataset.id);
      } else {
        btn.dataset.confirm = '1';
        btn.textContent = '?';
        btn.classList.add('confirm');
        setTimeout(() => {
          btn.dataset.confirm = '0';
          btn.textContent = '✕';
          btn.classList.remove('confirm');
        }, 3000);
      }
    });
  });

  // Foto-Klick → Lightbox
  tl.querySelectorAll('.album-thumb').forEach(thumb => {
    thumb.addEventListener('click', e => {
      e.stopPropagation();
      openLightbox(thumb.dataset.entryId, parseInt(thumb.dataset.photoIdx));
    });
  });

  // Floating Nav + Intersection Observer neu aufsetzen
  initTlNav();
}

// ── DELETE ──
function doDelete(id) {
  saveData(loadData().filter(e => e.id !== id));
  renderTimeline();
  initSlideshow();
}

// ── ADD MODAL ──
let selectedFiles = [];

function handleAddBtn() {
  if (sessionAuth) {
    openAddModal();
  } else {
    openPin('add');
  }
}

function openAddModal() {
  selectedFiles = [];
  document.getElementById('addDate').value   = '';
  document.getElementById('addTitle').value  = '';
  document.getElementById('addPhotos').value = '';
  document.getElementById('addPreview').innerHTML  = '';
  document.getElementById('addStatus').textContent = '';
  document.getElementById('dropLabel').textContent = 'Fotos auswählen oder hierher ziehen';
  document.getElementById('addSave').disabled = false;
  document.getElementById('addModal').classList.add('visible');
}

function closeAddModal() {
  document.getElementById('addModal').classList.remove('visible');
  selectedFiles = [];
}

function handleFileSelect(files) {
  selectedFiles = [...files];
  document.getElementById('addPreview').innerHTML = selectedFiles.map(f =>
    `<div class="add-preview-thumb" style="background-image:url('${URL.createObjectURL(f)}')"></div>`
  ).join('');
  document.getElementById('dropLabel').textContent =
    `${selectedFiles.length} ${selectedFiles.length === 1 ? 'Foto' : 'Fotos'} ausgewählt`;
}

async function saveAlbum() {
  const dateVal  = document.getElementById('addDate').value;
  const titleVal = document.getElementById('addTitle').value.trim();
  const statusEl = document.getElementById('addStatus');
  const saveBtn  = document.getElementById('addSave');

  if (!dateVal)              { statusEl.textContent = 'Bitte ein Datum eingeben.'; return; }
  if (!selectedFiles.length) { statusEl.textContent = 'Bitte mindestens ein Foto wählen.'; return; }

  saveBtn.disabled = true;
  const photos = [];
  for (let i = 0; i < selectedFiles.length; i++) {
    statusEl.textContent = `Verarbeite ${i + 1} / ${selectedFiles.length} …`;
    photos.push(await compressImage(selectedFiles[i]));
  }

  const entry = {
    id: Date.now().toString(),
    date: dateVal,
    title: titleVal || null,
    photos,
  };

  const data = loadData();
  data.push(entry);

  try {
    saveData(data);
  } catch {
    statusEl.textContent = 'Speicher voll — bitte ältere Einträge löschen.';
    saveBtn.disabled = false;
    return;
  }

  closeAddModal();
  renderTimeline();
  initSlideshow();
}

// ── FLOATING NAV ──
let currentNavId  = null;
let navObserver   = null;
let navCloseTimer = null;

function openNavPanel() {
  clearTimeout(navCloseTimer);
  document.getElementById('tlNav')?.classList.add('open');
}

function scheduleNavClose() {
  navCloseTimer = setTimeout(() => {
    document.getElementById('tlNav')?.classList.remove('open');
  }, 180); // Delay: Maus hat Zeit vom Strich zum Label zu wandern
}

function initTlNav() {
  if (navObserver) navObserver.disconnect();

  navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        currentNavId = entry.target.dataset.id || null;
        renderTlNav();
      }
    });
  }, {
    rootMargin: '-35% 0px -35% 0px',
    threshold: 0,
  });

  document.querySelectorAll('.album-card[data-id]').forEach(row => navObserver.observe(row));

  // Erstes Element als Startwert
  if (!currentNavId) {
    const first = document.querySelector('.album-card[data-id]');
    if (first) currentNavId = first.dataset.id;
  }
  renderTlNav();
}

function renderTlNav() {
  const track = document.getElementById('tlNavTrack');
  if (!track) return;

  const entries = getSortedData();
  if (!entries.length) { track.innerHTML = ''; return; }

  const curIdx = Math.max(0, entries.findIndex(e => e.id === currentNavId));
  const RANGE  = 4;
  const start  = Math.max(0, curIdx - RANGE);
  const end    = Math.min(entries.length - 1, curIdx + RANGE);
  const slice  = entries.slice(start, end + 1);

  track.innerHTML = slice.map((entry, i) => {
    const isActive = (start + i) === curIdx;
    const label    = fmtDate(entry.date) + (entry.title ? ' · ' + entry.title : '');
    return `
      <div class="tl-nav-item ${isActive ? 'active' : ''}" data-id="${entry.id}">
        <span class="tl-nav-label">${label}</span>
        <span class="tl-nav-line"></span>
      </div>`;
  }).join('');

  track.querySelectorAll('.tl-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelector(`.album-card[data-id="${item.dataset.id}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // Labels: Hover hält Nav offen (Labels liegen außerhalb der Nav-Hitzone)
  track.querySelectorAll('.tl-nav-label').forEach(label => {
    label.addEventListener('mouseenter', openNavPanel);
    label.addEventListener('mouseleave', scheduleNavClose);
  });
}

// ── LIGHTBOX ──
let lbEntryId  = null;
let lbPhotoIdx = 0;

function openLightbox(entryId, idx) {
  const entry = loadData().find(e => e.id === entryId);
  if (!entry) return;
  lbEntryId  = entryId;
  lbPhotoIdx = idx;
  showLbPhoto(entry);
  document.getElementById('lightbox').classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('visible');
  document.body.style.overflow = '';
}

function showLbPhoto(entry) {
  document.getElementById('lbImg').src = entry.photos[lbPhotoIdx];
  document.getElementById('lbCounter').textContent = `${lbPhotoIdx + 1} / ${entry.photos.length}`;
  document.getElementById('lbPrev').style.opacity = lbPhotoIdx > 0 ? '1' : '0.2';
  document.getElementById('lbNext').style.opacity = lbPhotoIdx < entry.photos.length - 1 ? '1' : '0.2';
}

function lbNav(dir) {
  const entry = loadData().find(e => e.id === lbEntryId);
  if (!entry) return;
  lbPhotoIdx = Math.max(0, Math.min(entry.photos.length - 1, lbPhotoIdx + dir));
  showLbPhoto(entry);
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  // Seite PIN-sperren falls nicht authentifiziert
  if (!sessionAuth) {
    openPin('page');
  }

  renderTimeline();
  initSlideshow();

  // Nav: Hover-Zone für Strich UND Label (einmalig registrieren)
  const tlNav = document.getElementById('tlNav');
  tlNav?.addEventListener('mouseenter', openNavPanel);
  tlNav?.addEventListener('mouseleave', scheduleNavClose);

  // Add-Button
  document.getElementById('addBtn')?.addEventListener('click', handleAddBtn);

  // PIN Numpad
  document.getElementById('pinPad')?.addEventListener('click', e => {
    const key = e.target.closest('[data-key]')?.dataset.key;
    if (!key) return;
    if (key === 'del') pinDelete();
    else pinInput(parseInt(key, 10));
  });
  document.getElementById('pinCancel')?.addEventListener('click', closePin);
  document.getElementById('pinOverlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('pinOverlay') && pendingAction !== 'page') closePin();
  });

  // Add Modal
  document.getElementById('addModalClose')?.addEventListener('click', closeAddModal);
  document.getElementById('addModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('addModal')) closeAddModal();
  });
  document.getElementById('addSave')?.addEventListener('click', saveAlbum);

  // Drag & Drop
  const drop  = document.getElementById('addDrop');
  const input = document.getElementById('addPhotos');
  if (drop && input) {
    drop.addEventListener('click',    () => input.click());
    drop.addEventListener('dragover', e  => { e.preventDefault(); drop.classList.add('drag'); });
    drop.addEventListener('dragleave',()  => drop.classList.remove('drag'));
    drop.addEventListener('drop',     e  => {
      e.preventDefault();
      drop.classList.remove('drag');
      handleFileSelect(e.dataTransfer.files);
    });
    input.addEventListener('change', () => handleFileSelect(input.files));
  }

  // Lightbox
  document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lbPrev')?.addEventListener('click',  () => lbNav(-1));
  document.getElementById('lbNext')?.addEventListener('click',  () => lbNav(1));
  document.getElementById('lightbox')?.addEventListener('click', e => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
  });

  // Tastatur
  document.addEventListener('keydown', e => {
    const lb  = document.getElementById('lightbox');
    const add = document.getElementById('addModal');
    const pin = document.getElementById('pinOverlay');
    if (e.key === 'Escape') {
      if (lb?.classList.contains('visible'))  { closeLightbox();  return; }
      if (add?.classList.contains('visible')) { closeAddModal();  return; }
      // Seiten-PIN nicht per ESC schließbar
      if (pin?.classList.contains('visible') && pendingAction !== 'page') { closePin(); return; }
    }
    if (pin?.classList.contains('visible')) {
      if (e.key >= '0' && e.key <= '9') pinInput(parseInt(e.key, 10));
      if (e.key === 'Backspace') pinDelete();
    }
    if (lb?.classList.contains('visible')) {
      if (e.key === 'ArrowLeft')  lbNav(-1);
      if (e.key === 'ArrowRight') lbNav(1);
    }
  });
});
