import '../css/style.css';
import i18next from 'i18next';
import de from './i18n/de.js';
import en from './i18n/en.js';

// ── Init i18next ────────────────────────────────────────────────────────────
const savedLang = localStorage.getItem('lang') || 'de';

i18next.init({
  lng: savedLang,
  fallbackLng: 'de',
  resources: {
    de: { translation: de },
    en: { translation: en },
  },
});

// ── Apply translations to all [data-i18n] elements ──────────────────────────
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = i18next.t(key);
    // Allow <br> tags in translations
    el.innerHTML = value;
  });

  // Update <html lang="...">
  document.documentElement.lang = i18next.language;

  // Update <title>
  document.title = i18next.language === 'en'
    ? 'Engin Aydogan – Freelance Controller | Controlling, Budget Planning & Reporting'
    : 'Engin Aydogan – Freelance Controller | Controlling, Budgetplanung & Reporting';

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = i18next.language === 'en'
      ? 'Engin Aydogan – Your experienced freelance controller. Professional support with budget planning, forecasting, reporting, cost analysis and strategic controlling. Remote & on-site across Germany.'
      : 'Engin Aydogan – Ihr erfahrener Freelance Controller. Professionelle Unterstützung bei Budgetplanung, Forecasting, Reporting, Kostenanalyse und strategischem Controlling. Remote & vor Ort deutschlandweit.';
  }

  // Update mailto subject/body in contact CTA link
  const mailCta = document.getElementById('mail-cta');
  if (mailCta) {
    if (i18next.language === 'en') {
      mailCta.href = 'mailto:engin0471@googlemail.com?subject=Enquiry%3A%20Freelance%20Controlling&body=Dear%20Engin%2C%0A%0AI%20am%20interested%20in%20your%20controlling%20services%20and%20would%20like%20to%20find%20out%20more.%0A%0AKind%20regards';
    } else {
      mailCta.href = 'mailto:engin0471@googlemail.com?subject=Anfrage%3A%20Freelance%20Controlling&body=Hallo%20Engin%2C%0A%0Aich%20interessiere%20mich%20f%C3%BCr%20Ihre%20Controlling-Dienstleistungen%20und%20w%C3%BCrde%20gerne%20mehr%20erfahren.%0A%0AMit%20freundlichen%20Gr%C3%BC%C3%9Fen';
    }
  }

  // Update toggle button label
  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.setAttribute('aria-label', i18next.language === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln');
    btn.querySelector('[data-role="active-lang"]').textContent  = i18next.language.toUpperCase();
    btn.querySelector('[data-role="other-lang"]').textContent   = i18next.language === 'de' ? 'EN' : 'DE';
  }
}

// ── Toggle between DE / EN ───────────────────────────────────────────────────
function setupToggle() {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = i18next.language === 'de' ? 'en' : 'de';
    i18next.changeLanguage(next, () => {
      localStorage.setItem('lang', next);
      applyTranslations();
    });
  });
}

// ── Boot ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  setupToggle();
});
