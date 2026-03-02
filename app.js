/* app.js — Omnus Technologies */

(function () {
  'use strict';

  /* ============================================
     THEME TOGGLE
     ============================================ */
  const root = document.documentElement;
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);

  const themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeToggle) {
    updateThemeIcon();
    themeToggle.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      this.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  /* ============================================
     NAVIGATION — SCROLL STATE
     ============================================ */
  const nav = document.querySelector('.nav');
  if (nav) {
    function checkScroll() {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
  }

  /* ============================================
     NAVIGATION — MOBILE HAMBURGER
     ============================================ */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      this.classList.toggle('active', isOpen);
      this.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ============================================
     SMOOTH SCROLL FOR NAV LINKS
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#' || href === '#main') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ============================================
     CONTACT MODAL
     ============================================ */
  var modal = document.getElementById('contactModal');
  var triggers = document.querySelectorAll('[data-contact-trigger]');
  var closeBtn = document.querySelector('[data-modal-close]');

  function openModal() {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus the close button
    var close = modal.querySelector('[data-modal-close]');
    if (close) close.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  // Close modal on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  /* ============================================
     TEAM CARD EXPANSION
     ============================================ */
  document.querySelectorAll('[data-team-card]').forEach(function (card) {
    var header = card.querySelector('.team-card-header');
    if (!header) return;

    function toggleCard() {
      var isExpanded = card.classList.toggle('expanded');
      header.setAttribute('aria-expanded', String(isExpanded));
    }

    header.addEventListener('click', toggleCard);
    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard();
      }
    });
  });

  /* ============================================
     SCROLL ANIMATION FALLBACK
     (for browsers without animation-timeline)
     ============================================ */
  if (!CSS.supports('animation-timeline', 'scroll()')) {
    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.clipPath = 'inset(0 0 0 0)';
          fadeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .reveal-up').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transition = 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), clip-path 600ms cubic-bezier(0.16, 1, 0.3, 1)';
      fadeObserver.observe(el);
    });
  }

  /* ============================================
     NAV LOGO — swap between white/dark versions
     ============================================ */
  var logoImg = document.querySelector('.nav-logo-img');
  if (nav && logoImg) {
    // The logo is white, so when nav is scrolled (light bg), we need to handle via CSS filter
    // We'll use CSS opacity/filter approach instead
  }

})();
