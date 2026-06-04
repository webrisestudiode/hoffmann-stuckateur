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

// ========================

// ========================
// Demo Personalisierung
// ========================
(function () {
  // Params aus URL lesen → sessionStorage speichern
  var p = new URLSearchParams(window.location.search);
  ['firma','name','stadt','telefon'].forEach(function(k) {
    if (p.get(k)) sessionStorage.setItem('ws_'+k, p.get(k));
  });

  var firma   = sessionStorage.getItem('ws_firma');
  var name    = sessionStorage.getItem('ws_name');
  var stadt   = sessionStorage.getItem('ws_stadt');
  var telefon = sessionStorage.getItem('ws_telefon');

  // Telefon-Fallback per Stadt (wenn kein Lead-Telefon vorhanden)
  if (!telefon) {
    var CITY_PHONES = {
      'Stuttgart-Mitte':'0711 48 27 93','Stuttgart-Nord':'0711 38 16 74',
      'Stuttgart-Süd':'0711 62 93 41','Stuttgart-Ost':'0711 57 84 20',
      'Stuttgart-West':'0711 29 54 86','Bad Cannstatt':'0711 56 83 12',
      'Vaihingen':'0711 74 29 61','Zuffenhausen':'0711 83 47 25',
      'Feuerbach':'0711 94 61 38','Degerloch':'0711 46 82 57',
      'Möhringen':'0711 73 19 84','Stammheim':'0711 85 34 67',
      'Mühlhausen':'0711 91 46 23','Böblingen':'07031 6 48 27',
      'Sindelfingen':'07031 8 37 45','Esslingen':'0711 39 72 56',
      'Ostfildern':'0711 48 65 31','Leinfelden-Echterdingen':'0711 97 28 43',
      'Ludwigsburg':'07141 8 36 29','Kornwestheim':'07141 5 74 83',
      'Bietigheim-Bissingen':'07142 4 82 67','Waiblingen':'07151 6 93 48',
      'Fellbach':'0711 58 37 94','Schorndorf':'07181 4 72 85',
      'Winnenden':'07195 9 38 62','Göppingen':'07161 7 48 23',
      'Kirchheim unter Teck':'07021 8 53 46','Nürtingen':'07022 6 47 91',
      'Leonberg':'07152 5 83 27','Ditzingen':'07156 4 69 38',
      'Gerlingen':'07156 9 24 71','Korntal-Münchingen':'07150 3 84 56',
      'Remshalden':'07151 8 37 24','Plochingen':'07153 6 48 92',
      'Wendlingen':'07024 5 73 81'
    };
    telefon = (stadt && CITY_PHONES[stadt]) || '0711 48 27 93';
    sessionStorage.setItem('ws_telefon', telefon);
  }

  function replaceInText(node, oldStr, newStr) {
    if (!oldStr || oldStr === newStr) return;
    if (node.nodeType === 3) {
      if (node.textContent.indexOf(oldStr) !== -1)
        node.textContent = node.textContent.split(oldStr).join(newStr);
    } else if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
      for (var i = 0; i < node.childNodes.length; i++)
        replaceInText(node.childNodes[i], oldStr, newStr);
    }
  }

  function replaceTelLinks(newTel) {
    var clean = newTel.replace(/\s/g, '');
    document.querySelectorAll('a[href^="tel:"]').forEach(function(a) {
      a.setAttribute('href', 'tel:' + clean);
      if (/^[0-9\s\-\/\+\(\)]+$/.test(a.textContent.trim()))
        a.textContent = newTel;
    });
  }

  function run() {
    if (firma) {
      var demoNames = ['Hoffmann Stuckateur & Putzarbeiten Heidelberg', 'Hoffmann Stuckateur & Putzarbeiten', 'Hoffmann Stuckateur'];
      demoNames.forEach(function(n) { replaceInText(document.body, n, firma); });
      document.title = demoNames.reduce(function(t,n){ return t.split(n).join(firma); }, document.title);
    }
    if (stadt) {
      var demoCities = ['Heidelberg'];
      demoCities.forEach(function(c) { replaceInText(document.body, c, stadt); });
      document.title = demoCities.reduce(function(t,c){ return t.split(c).join(stadt); }, document.title);
    }
    // Logo direkt ersetzen – Text ist auf mehrere Nodes aufgeteilt
    if (firma) {
      var logoEl = document.querySelector('a.logo, a.navbar__logo, a.navbar-brand');
      if (logoEl) {
        var iconEl = logoEl.querySelector('i, .logo-icon, .navbar__logo-icon');
        var iconHTML = iconEl ? iconEl.outerHTML : '';
        logoEl.innerHTML = iconHTML + (iconHTML ? ' ' : '') + firma;
      }
    }
    if (telefon) {
      var demoPhones = ['06221 78901', '0622178901'];
      demoPhones.forEach(function(ph) { replaceInText(document.body, ph, telefon); });
      replaceTelLinks(telefon);
    }
    if (name) {
      var banner = document.getElementById('personalized-banner');
      var nameEl = document.getElementById('banner-name');
      if (banner && nameEl) {
        nameEl.textContent = name;
        banner.style.display = 'block';
        if (banner.parentNode !== document.documentElement) {
          document.documentElement.appendChild(banner);
        }
        var sp = document.getElementById('ws-banner-spacer');
        if (sp) {
          var h = banner.offsetHeight || 44;
          sp.style.height = h + 'px';
        }
      }
    }
  }

  // Script steht am Ende von <body> – DOM ist bereit
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
