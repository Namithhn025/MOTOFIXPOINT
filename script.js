// ============================================
// MOTOFIXPOINT — MAIN SCRIPT
// ============================================

// ===== ENTRY MODAL (1-hour TTL) =====
(function () {
  const modal = document.getElementById('entryModal');
  const KEY = 'mfp_entered_at';
  const TTL_MS = 60 * 60 * 1000; // 1 hour
  const lastEntered = localStorage.getItem(KEY);
  if (lastEntered && (Date.now() - parseInt(lastEntered, 10)) < TTL_MS) {
    // Within 1 hour — skip modal
    modal.classList.add('hidden');
  } else {
    // Show modal, lock scroll
    document.body.style.overflow = 'hidden';
  }
})();

function handleEntrySubmit(e) {
  e.preventDefault();
  const phone = document.getElementById('entryPhone').value.trim();
  if (!phone || phone.length < 10) return;

  // Store with timestamp for 1-hr TTL
  localStorage.setItem('mfp_entered_at', Date.now().toString());
  localStorage.setItem('mfp_phone', phone);
  // TODO: send phone to your Google Sheet / backend form URL here
  console.log('Lead captured:', phone);

  // Smooth dismiss
  const modal = document.getElementById('entryModal');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// ===== ROTATING LOCATION BADGE =====
(function () {
  const locations = [
    'Garebhavipalya, Bengaluru',
    'Hongasandra, Bengaluru',
    'Bommanahalli, Bengaluru',
    'Electronic City, Bengaluru',
    'HSR Layout, Bengaluru'
  ];
  const el = document.getElementById('locationText');
  if (!el) return;
  let i = 0;
  setInterval(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      i = (i + 1) % locations.length;
      el.textContent = locations[i];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300);
  }, 2500);
})();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});
// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const reveals = document.querySelectorAll(
  '.service-card, .step, .why-item, .testimonial-card, .gallery-item, .brand-pill, .contact-item'
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${(i % 6) * 60}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== SERVICE FILTER / TOGGLE =====
function filterServices(type) {
  const cards = document.querySelectorAll('.service-card');
  const tabs = document.querySelectorAll('.toggle-btn');

  tabs.forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  const activeTab = document.getElementById(`tab-${type}`);
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
  }

  cards.forEach(card => {
    const cardType = card.getAttribute('data-type');
    const show = type === 'all' || cardType === type || cardType === 'all';
    card.style.display = show ? '' : 'none';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    if (show) {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 30);
    }
  });

  // Fix grid column for service-card--full based on filter
  const fullCard = document.getElementById('svc-fullservice');
  if (fullCard && fullCard.style.display !== 'none') {
    const visibleCount = [...cards].filter(c => c.style.display !== 'none').length;
    fullCard.style.gridColumn = visibleCount <= 3 ? 'span 1' : 'span 2';
  }
}

// ===== FORM SUBMIT =====
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  const form = document.getElementById('bookingForm');

  // Basic validation
  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const vehicleType = document.getElementById('fvehicle-type').value;
  const model = document.getElementById('fbike').value.trim();

  if (!name || !phone || !vehicleType || !model) {
    // Shake animation on required fields
    [document.getElementById('fname'), document.getElementById('fphone'),
     document.getElementById('fvehicle-type'), document.getElementById('fbike')].forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#FA2D05';
        field.addEventListener('input', () => field.style.borderColor = '', { once: true });
      }
    });
    return;
  }

  // Simulate form submission (replace with real backend / Google Forms integration)
  btn.textContent = '⏳ Sending...';
  btn.disabled = true;

  setTimeout(() => {
    success.style.display = 'block';
    btn.textContent = '✅ Request Sent!';
    btn.style.background = 'linear-gradient(135deg, #22511a 0%, #2e7d23 100%)';
    form.querySelectorAll('input, select, textarea').forEach(f => f.value = '');
    setTimeout(() => {
      success.style.display = 'none';
      btn.textContent = '📩 Send Booking Request';
      btn.disabled = false;
      btn.style.background = '';
    }, 6000);
  }, 1200);
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.remove('nav-active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('nav-active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ===== GALLERY LIGHTBOX (basic) =====
document.querySelectorAll('.gallery-item:not(.gal-placeholder)').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img || item.classList.contains('gal-placeholder')) return;
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = `
      <div class="lightbox-inner">
        <img src="${img.src}" alt="${img.alt}" />
        <button class="lightbox-close" aria-label="Close">✕</button>
      </div>`;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLightbox(); });
    function closeLightbox() {
      overlay.remove();
      document.body.style.overflow = '';
    }
    // ESC key to close
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { closeLightbox(); document.removeEventListener('keydown', esc); }
    });
  });
});

// ===== YEAR IN FOOTER =====
const yearEls = document.querySelectorAll('.footer-year');
yearEls.forEach(el => el.textContent = new Date().getFullYear());
