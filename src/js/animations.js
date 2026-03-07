/* ═══════════════════════════════════════
   LENIS — має бути на самому верху!
   ═══════════════════════════════════════ */
import Lenis from 'lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

window.lenis = lenis;

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    lenis.scrollTo(target, { offset: -80, duration: 1.4 });
  });
});

/* ═══════════════════════════════════════
   INTERSECTION OBSERVER — універсальна функція
   ═══════════════════════════════════════ */
function animateOnScroll(selector, threshold = 0.05) {
  const el = document.querySelector(selector);
  if (!el) return;

  el.classList.remove('is-visible');

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('is-visible');
      } else {
        el.classList.remove('is-visible');
      }
    },
    { threshold }
  );

  observer.observe(el);
}

/* ═══════════════════════════════════════
   PETS SECTION — 3 колонки (ПК) / 2 колонки (планшет)
   ═══════════════════════════════════════ */
export function animatePetCards() {
  const list = document.getElementById('petsList');
  if (!list) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px',
    }
  );

  function getColumns() {
    if (window.innerWidth >= 1024) return 3; // ПК
    if (window.innerWidth >= 768) return 2; // планшет
    return 1; // мобільний
  }

  function observeCards() {
    const cols = getColumns();

    list.querySelectorAll('.pet-card:not(.is-observed)').forEach((card, i) => {
      card.classList.add('is-observed');

      const col = i % cols;

      card.classList.remove(
        'slide-from-left',
        'slide-from-bottom',
        'slide-from-right'
      );

      if (cols === 3) {
        // ПК — ліво / низ / право
        if (col === 0) card.classList.add('slide-from-left');
        if (col === 1) card.classList.add('slide-from-bottom');
        if (col === 2) card.classList.add('slide-from-right');
      } else if (cols === 2) {
        // Планшет — ліво / право
        if (col === 0) card.classList.add('slide-from-left');
        if (col === 1) card.classList.add('slide-from-right');
      } else {
        // Мобільний — тільки знизу
        card.classList.add('slide-from-bottom');
      }

      const delay = Math.floor(i / cols) * 0.15 + col * 0.1;
      card.style.transitionDelay = `${delay}s`;

      observer.observe(card);
    });
  }

  observeCards();

  const mutationObserver = new MutationObserver(observeCards);
  mutationObserver.observe(list, { childList: true });
}

/* ═══════════════════════════════════════
   FAQ SECTION — айтеми виїжджають зліва/справа по черзі
   ═══════════════════════════════════════ */
function animateFaqItems() {
  const items = document.querySelectorAll('.faq__item');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  items.forEach((item, i) => {
    // непарні — справа, парні — зліва
    item.classList.add(i % 2 === 0 ? 'slide-from-right' : 'slide-from-left');
    observer.observe(item);
  });
}

/* ═══════════════════════════════════════
   STORIES SECTION — заголовок зліва, підзаголовок справа, слайдер знизу
   ═══════════════════════════════════════ */
function animateStoriesSection() {
  const section = document.querySelector('.stories-section');
  if (!section) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add('is-visible');
      } else {
        section.classList.remove('is-visible');
      }
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  observer.observe(section);
}

/* ═══════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════ */
function animateHero() {
  const section = document.querySelector('.hero-section');
  if (!section) return;

  // при завантаженні
  setTimeout(() => {
    section.classList.add('is-visible');
  }, 100);

  // ✅ і при скролі вгору/вниз
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add('is-visible');
      } else {
        section.classList.remove('is-visible');
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(section);
}

/* ═══════════════════════════════════════
   FOOTER — елементи виїжджають знизу по черзі
   ═══════════════════════════════════════ */
function animateFooter() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        footer.classList.add('is-visible');
      } else {
        footer.classList.remove('is-visible');
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(footer);
}

/* ═══════════════════════════════════════
   run
   ═══════════════════════════════════════ */
animateHero();
animateOnScroll('.about-us-section');
animatePetCards();
animateFaqItems();
animateStoriesSection();
animateFooter();
