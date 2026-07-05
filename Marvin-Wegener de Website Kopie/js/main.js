// ── DARK MODE ──
let dark = localStorage.getItem('mw-dark') === '1';

function applyDark() {
  document.body.classList.toggle('dark', dark);
  const lbl = document.getElementById('lbl');
  if (lbl) lbl.textContent = dark ? 'Hell' : 'Dark';
}

function toggleDark() {
  dark = !dark;
  localStorage.setItem('mw-dark', dark ? '1' : '0');
  applyDark();
}

// ── HEADER HTML ──
function buildHeaderHTML(activePage) {
  const isStart     = activePage === 'start'     ? ' class="active"' : '';
  const isMomente   = activePage === 'momente'   ? ' class="active"' : '';
  const isPortfolio = activePage === 'portfolio' ? ' class="active"' : '';
  const isTjmmm     = activePage === 'tjmmm'     ? ' class="active"' : '';

  return `<header>
  <div class="header-inner">
    <nav class="nav-left">
      <a href="index.html"${isStart}>Start</a>
      <a href="momente.html"${isMomente}>Momente</a>
    </nav>
    <div class="logo">
      <h1>Marvin Wegener</h1>
      <p>marvin-wegener.de</p>
    </div>
    <nav class="nav-right">
      <a href="portfolio.html"${isPortfolio}>Portfolio</a>
      <a href="tjmmm.html"${isTjmmm}>TJMMM</a>
      <button class="toggle-btn" id="darkToggle">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
        <span id="lbl">Dark</span>
      </button>
    </nav>
  </div>
</header>`;
}

// ── FOOTER HTML ──
function buildFooterHTML() {
  return `<div class="footer-wrap">
  <footer>
    <span>© 2025 Marvin Wegener</span>
    <span style="color:var(--teal)">marvin-wegener.de</span>
  </footer>
</div>`;
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  let activePage = 'start';
  if (path.includes('momente'))   activePage = 'momente';
  if (path.includes('portfolio')) activePage = 'portfolio';
  if (path.includes('tjmmm'))     activePage = 'tjmmm';

  const headerEl = document.getElementById('site-header');
  if (headerEl) headerEl.innerHTML = buildHeaderHTML(activePage);

  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = buildFooterHTML();

  const toggle = document.getElementById('darkToggle');
  if (toggle) toggle.addEventListener('click', toggleDark);

  applyDark();
});
