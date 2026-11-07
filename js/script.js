/**
 * Portfolio JavaScript - Dewi Chalissa Rania
 * Handles:
 * - Theme switcher (Dark / Light) with localStorage persistence
 * - Mobile Navigation drawer
 * - Marquee text generation
 * - Project filtering with animations
 * - Contact form validation & clipboard copying / mailto
 * - Scrollspy for active nav links
 */

// User-configurable variables
const CONFIG = {
  CV_URL: "", // Isi URL Google Drive / PDF publik jika tersedia
  GITHUB_URL: "https://github.com/", // Ganti dengan URL GitHub Anda
  LINKEDIN_URL: "https://linkedin.com/in/dewi-chalissa-01621a329/",
  EMAIL: "dewiicha161@gmail.com"
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCV();
  initMarquee();
  initMobileMenu();
  initProjectFilter();
  initContactForm();
  initScrollSpy();
  initAchievementCarousels();
});

function initAchievementCarousels() {
  document.querySelectorAll('[data-achievement-carousel]').forEach(carousel => {
    const track = carousel.querySelector('[data-carousel-track]');
    const slides = track ? Array.from(track.children) : [];
    const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
    if (!track || slides.length === 0) return;

    let activeIndex = 0;
    slides.forEach(slide => {
      slide.style.flex = '0 0 100%';
      slide.style.minWidth = '100%';
    });
    const updateCarousel = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${activeIndex * 100}%)`;
      track.style.transition = 'transform 300ms ease-in-out';
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('bg-bgCream', dotIndex === activeIndex);
        dot.classList.toggle('bg-ink/20', dotIndex !== activeIndex);
      });
    };

    carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => updateCarousel(activeIndex - 1));
    carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => updateCarousel(activeIndex + 1));
    updateCarousel(0);
  });
}

/* -----------------------------------------------------------
 * 1. THEME TOGGLER (Light / Dark Mode)
 * ----------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleMobileBtn = document.getElementById('themeToggleMobileBtn');
  
  // Check preference in storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcons();
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);

  updateThemeIcons();
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const icons = document.querySelectorAll('.theme-icon-indicator');
  icons.forEach(icon => {
    icon.innerHTML = isDark 
      ? `<svg class="w-5 h-5 text-accentYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
      : `<svg class="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
  });
}

/* -----------------------------------------------------------
 * 2. CV BUTTON HANDLER
 * ----------------------------------------------------------- */
function initCV() {
  const cvBtn = document.getElementById('cvBtn');
  if (!cvBtn) return;

  if (CONFIG.CV_URL && CONFIG.CV_URL.trim() !== "") {
    cvBtn.href = CONFIG.CV_URL;
    cvBtn.setAttribute('target', '_blank');
    cvBtn.setAttribute('rel', 'noopener noreferrer');
  } else {
    cvBtn.href = `mailto:${CONFIG.EMAIL}?subject=Permintaan CV - Dewi Chalissa Rania`;
    cvBtn.removeAttribute('target');
    cvBtn.removeAttribute('rel');
  }
}

/* -----------------------------------------------------------
 * 3. MARQUEE BANNER
 * ----------------------------------------------------------- */
function initMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (!track) return;

  const items = [
    'Machine Learning',
    'Computer Vision',
    'Robot SAR',
    'Full-Stack Web',
    'YOLOv8',
    'Laravel',
    'Contract Bridge',
    'Leadership'
  ];

  let spanHtml = '';
  items.forEach(item => {
    spanHtml += `
      <span class="inline-flex items-center gap-6 text-xl md:text-2xl font-display font-extrabold uppercase px-6">
        ${item}
        <span class="inline-block w-3.5 h-3.5 rounded-full bg-accentPink border border-ink dark:border-inkLight"></span>
      </span>
    `;
  });

  // Duplicate for smooth infinite looping
  track.innerHTML = spanHtml + spanHtml + spanHtml + spanHtml;
}

/* -----------------------------------------------------------
 * 4. MOBILE MENU
 * ----------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    mobileMenu.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  menuBtn.addEventListener('click', openMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* -----------------------------------------------------------
 * 5. PROJECT FILTER
 * ----------------------------------------------------------- */
function initProjectFilter() {
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('.project-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const category = chip.getAttribute('data-filter');

      // Update active states on buttons
      filterChips.forEach(c => {
        const isCurrent = c === chip;
        c.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
        if (isCurrent) {
          c.classList.add('bg-ink', 'text-bgCream', 'dark:bg-inkLight', 'dark:text-inkDark');
          c.classList.remove('bg-surface', 'text-ink', 'dark:bg-surfaceDark', 'dark:text-inkLight');
        } else {
          c.classList.remove('bg-ink', 'text-bgCream', 'dark:bg-inkLight', 'dark:text-inkDark');
          c.classList.add('bg-surface', 'text-ink', 'dark:bg-surfaceDark', 'dark:text-inkLight');
        }
      });

      // Filter cards with smooth display
      projectCards.forEach(card => {
        const cardCats = card.getAttribute('data-cat') || '';
        const isVisible = category === 'all' || cardCats.split(' ').includes(category);
        
        if (isVisible) {
          card.classList.remove('hidden');
          // Trigger slight scale/fade in
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* -----------------------------------------------------------
 * 6. CONTACT FORM & CLIPBOARD / MAILTO
 * ----------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const msgEl = document.getElementById('formMsg');
  if (!form || !msgEl) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !/^\S+@\S+\.\S+$/.test(email) || !message) {
      msgEl.innerHTML = `<span class="text-red-700 font-bold">⚠️ Harap lengkapi nama, email yang valid, dan pesan Anda.</span>`;
      return;
    }

    const fullMessage = `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`;

    // Mailto fallback link
    const mailtoSubject = encodeURIComponent(`Pesan Portofolio dari ${name}`);
    const mailtoBody = encodeURIComponent(fullMessage);
    const mailtoUrl = `mailto:${CONFIG.EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

    msgEl.innerHTML = `
      <div class="p-4 bg-surface dark:bg-surfaceDark border-2 border-ink dark:border-inkLight rounded-xl mt-2 flex flex-col gap-3">
        <p class="font-bold text-ink dark:text-inkLight text-sm">
          ✅ Pesan siap dikirim ke <span class="underline">${CONFIG.EMAIL}</span>
        </p>
        <div class="flex flex-wrap gap-2">
          <button type="button" id="copyBtn" class="px-4 py-2 text-xs font-extrabold uppercase rounded-full bg-accentYellow text-ink border-2 border-ink hover:bg-yellow-400 transition-transform active:translate-y-0.5">
            📋 Salin Pesan
          </button>
          <a href="${mailtoUrl}" target="_blank" class="px-4 py-2 text-xs font-extrabold uppercase rounded-full bg-accentPink text-ink border-2 border-ink hover:bg-pink-400 transition-transform active:translate-y-0.5 inline-flex items-center gap-1">
            ✉️ Buka Email App
          </a>
        </div>
      </div>
    `;

    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(fullMessage).then(() => {
            copyBtn.textContent = '🎉 Tersalin!';
            setTimeout(() => { copyBtn.textContent = '📋 Salin Pesan'; }, 3000);
          }).catch(() => {
            fallbackCopy(fullMessage, copyBtn);
          });
        } else {
          fallbackCopy(fullMessage, copyBtn);
        }
      });
    }
  });

  function fallbackCopy(text, btn) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      btn.textContent = '🎉 Tersalin!';
      setTimeout(() => { btn.textContent = '📋 Salin Pesan'; }, 3000);
    } catch (err) {
      btn.textContent = 'Gagal menyalin';
    }
    document.body.removeChild(textarea);
  }
}

/* -----------------------------------------------------------
 * 7. SCROLL SPY FOR NAVIGATION
 * ----------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.classList.add('bg-accentYellow', 'text-ink');
      } else {
        link.classList.remove('bg-accentYellow');
      }
    });
  });
}
