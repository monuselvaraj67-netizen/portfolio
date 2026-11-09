/* ============================================================
   MONALISHA S | PORTFOLIO – JavaScript
   ============================================================ */

// ── DOM Ready ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTypingEffect();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initSkillBars();
  initProjectFilter();
  initCounterAnimation();
  initContactForm();
  initScrollToTop();
  initActiveNavLinks();
});

// ── 1. PARTICLES ───────────────────────────────────────────
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 25;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 15) + 's';
    const size = Math.random() * 3 + 1;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    const colors = ['#6366f1','#a855f7','#06b6d4','#22d3ee','#818cf8'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(p);
  }
}

// ── 2. TYPING EFFECT ──────────────────────────────────────
function initTypingEffect() {
  const el = document.getElementById('typedText');
  if (!el) return;
  const texts = [
    'Data Analyst Aspirant',
    'Python Programmer',
    'Power BI Developer',
    'SQL Enthusiast',
    'Dashboard Builder',
    'ML Explorer'
  ];
  let ti = 0, ci = 0, deleting = false;

  function type() {
    const current = texts[ti];
    if (!deleting) {
      el.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ti = (ti + 1) % texts.length;
      }
    }
    setTimeout(type, deleting ? 55 : 90);
  }
  type();
}

// ── 3. NAVBAR SCROLL ──────────────────────────────────────
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ── 4. MOBILE MENU ────────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ── 5. SCROLL ANIMATIONS (Intersection Observer) ──────────
function initScrollAnimations() {
  const observerOpts = { threshold: 0.12, rootMargin: '0px 0px -50px 0px' };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOpts);

  // Cards and animated elements
  const targets = document.querySelectorAll(
    '.glass-card, .timeline-item, .edu-card, .project-card, .cert-card, .about-highlights .highlight-item'
  );
  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
    observer.observe(el);
  });

  // Skill bars trigger
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-category').forEach(s => skillObserver.observe(s));
}

// ── 6. SKILL BARS ─────────────────────────────────────────
function initSkillBars() {
  // Reset bars initially (they animate via IntersectionObserver above)
  document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.width = '0%';
  });
}

// ── 7. PROJECT FILTER ─────────────────────────────────────
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const categories = card.dataset.category || '';
        const show = filter === 'all' || categories.includes(filter);
        if (show) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Add fadeIn keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `@keyframes fadeIn { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:translateY(0); } }`;
  document.head.appendChild(style);
}

// ── 8. COUNTER ANIMATION ──────────────────────────────────
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const isDecimal = !Number.isInteger(target);
        let start = 0;
        const duration = 1800;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const val = eased * target;
          el.textContent = isDecimal ? val.toFixed(2) : Math.floor(val);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ── 9. CONTACT FORM ───────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('contact-submit');
    btn.disabled = true;
    btn.innerHTML = '<span>Sending...</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';

    // Simulate submission (replace with real mailto or FormSubmit later)
    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<span>Send Message</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1500);
  });
}

// ── 10. SCROLL TO TOP ─────────────────────────────────────
function initScrollToTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── 11. ACTIVE NAV LINKS ──────────────────────────────────
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}


// ===== PROJECT IMAGE LIGHTBOX =====
function initProjectLightbox() {
  const previewImgs = document.querySelectorAll('.project-preview-img');
  
  previewImgs.forEach(img => {
    img.addEventListener('click', () => {
      // Create overlay
      const overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      document.body.appendChild(overlay);
      
      // Expand image
      img.classList.add('expanded');
      document.body.style.overflow = 'hidden';
      
      // Close on overlay click
      overlay.addEventListener('click', () => {
        img.classList.remove('expanded');
        overlay.remove();
        document.body.style.overflow = '';
      });
      
      // Close on ESC
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          img.classList.remove('expanded');
          overlay.remove();
          document.body.style.overflow = '';
          document.removeEventListener('keydown', escHandler);
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initProjectLightbox);
