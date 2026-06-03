/* ============================================
   Hoffmann Stuckateur & Putzarbeiten
   JavaScript - Interactions & Features
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // NAVBAR: scroll effect + active link
  // ============================================
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  const toggler = document.getElementById('navToggler');
  const collapse = document.getElementById('navCollapse');

  if (toggler && collapse) {
    toggler.addEventListener('click', function () {
      collapse.classList.toggle('open');
      const icon = toggler.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close on link click
    collapse.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        collapse.classList.remove('open');
        const icon = toggler.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        collapse.classList.remove('open');
        const icon = toggler.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      }
    });
  }

  // ============================================
  // FAQ ACCORDION
  // ============================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (btn && answer) {
      btn.addEventListener('click', function () {
        const isOpen = item.classList.contains('active');

        // Close all
        faqItems.forEach(fi => {
          fi.classList.remove('active');
          const a = fi.querySelector('.faq-answer');
          if (a) a.style.maxHeight = '0';
        });

        // Open clicked if was closed
        if (!isOpen) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 50 + 'px';
        }
      });
    }
  });

  // ============================================
  // FADE-IN on scroll (Intersection Observer)
  // ============================================
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ============================================
  // COOKIE BANNER
  // ============================================
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieDecline = document.getElementById('cookieDecline');

  if (cookieBanner) {
    const consent = localStorage.getItem('hoffmann_cookie_consent');
    if (!consent) {
      setTimeout(() => {
        cookieBanner.classList.add('visible');
      }, 800);
    }

    if (cookieAccept) {
      cookieAccept.addEventListener('click', function () {
        localStorage.setItem('hoffmann_cookie_consent', 'accepted');
        cookieBanner.classList.remove('visible');
      });
    }

    if (cookieDecline) {
      cookieDecline.addEventListener('click', function () {
        localStorage.setItem('hoffmann_cookie_consent', 'declined');
        cookieBanner.classList.remove('visible');
      });
    }
  }

  // ============================================
  // FORM SUBMISSION (simulated)
  // ============================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn ? btn.innerHTML : '';

      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Wird gesendet...';
        btn.disabled = true;
      }

      setTimeout(() => {
        contactForm.innerHTML = `
          <div style="text-align:center; padding:3rem 2rem;">
            <div style="width:64px;height:64px;background:linear-gradient(135deg,#C4A55A,#7A6B4A);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;">
              <i class="fa-solid fa-check" style="color:white;font-size:1.8rem;"></i>
            </div>
            <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.8rem;color:#1A1508;margin-bottom:0.75rem;">Vielen Dank!</h3>
            <p style="color:#6B6050;font-size:1rem;max-width:400px;margin:0 auto;">Ihre Anfrage wurde erfolgreich übermittelt. Herr Hoffmann wird sich innerhalb von 24 Stunden bei Ihnen melden.</p>
          </div>
        `;
      }, 1500);
    });
  }

  const karriereForm = document.getElementById('karriereForm');
  if (karriereForm) {
    karriereForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = karriereForm.querySelector('button[type="submit"]');

      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Wird gesendet...';
        btn.disabled = true;
      }

      setTimeout(() => {
        karriereForm.innerHTML = `
          <div style="text-align:center; padding:3rem 2rem;">
            <div style="width:64px;height:64px;background:linear-gradient(135deg,#C4A55A,#7A6B4A);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;">
              <i class="fa-solid fa-check" style="color:white;font-size:1.8rem;"></i>
            </div>
            <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.8rem;color:#1A1508;margin-bottom:0.75rem;">Bewerbung eingegangen!</h3>
            <p style="color:#6B6050;font-size:1rem;max-width:400px;margin:0 auto;">Wir haben Ihre Bewerbungsunterlagen erhalten und melden uns bald bei Ihnen. Wir freuen uns auf das persönliche Gespräch!</p>
          </div>
        `;
      }, 1500);
    });
  }

  // ============================================
  // ANIMATED COUNTER (Stats section)
  // ============================================
  const counters = document.querySelectorAll('.counter');

  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1800;
          const step = target / (duration / 16);
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = Math.floor(current) + suffix;
          }, 16);

          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  // ============================================
  // Smooth scroll for anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
