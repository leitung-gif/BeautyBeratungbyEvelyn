/* ═══════════ BEAUTY CONSULTING — MAIN JS ═══════════ */
(function() {
  'use strict';

  /* ── NAV SCROLL ── */
  const nav = document.getElementById('nav');
  if (nav) {
    let lastY = 0;
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
      lastY = window.scrollY;
    }, { passive: true });
  }

  /* ── HAMBURGER ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── SCROLL REVEAL ── */
  const animEls = document.querySelectorAll('[data-animate], [data-stagger]');
  if (animEls.length && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    animEls.forEach(el => io.observe(el));
  } else {
    animEls.forEach(el => el.classList.add('visible'));
  }

  /* ── COUNTER ANIMATION ── */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          e.target.textContent = Math.floor(current) + suffix;
        }, 16);
      });
    }, { threshold: 0.5 });
    io.observe(el);
  });

  /* ── MOUSE GRADIENT ── */
  const mouseGrad = document.querySelector('.mouse-gradient');
  if (mouseGrad) {
    const hero = mouseGrad.closest('.hero') || mouseGrad.parentElement;
    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      mouseGrad.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      mouseGrad.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
  }

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ── STICKY PROCESS TAKEOVER ── */
  const processWrap = document.querySelector('.process-wrapper');
  if (processWrap) {
    const slides = processWrap.querySelectorAll('.process-slide');
    const progressFill = processWrap.querySelector('.process-progress-fill');
    const dots = processWrap.querySelectorAll('.process-nav-dots span');
    window.addEventListener('scroll', () => {
      const rect = processWrap.getBoundingClientRect();
      const scrollH = processWrap.offsetHeight - window.innerHeight;
      if (scrollH <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollH));
      const idx = Math.min(Math.floor(progress * slides.length), slides.length - 1);
      slides.forEach((s, i) => s.classList.toggle('active', i === idx));
      if (progressFill) progressFill.style.width = (progress * 100) + '%';
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }, { passive: true });
  }

  /* ── LAZY VIDEO ── */
  document.querySelectorAll('video[data-lazy]').forEach(v => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) v.play(); else v.pause(); });
    }, { threshold: 0.3 });
    io.observe(v);
  });

  /* ── CONSOLE EASTER EGG ── */
  console.log(
    '%c✨ Beauty Consulting Evelyn Junghardt — Designed by Lorien Group',
    'font-size:12px;color:#E84393;font-weight:600;'
  );

})();

