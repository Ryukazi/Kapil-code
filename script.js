/* ============================================================
   script.js — Portfolio Interactivity (Enhanced)
   ============================================================ */

(() => {
  'use strict';

  // ── DOM References ──────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.getElementById('menuToggle');
  const navOverlay = document.getElementById('navOverlay');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  // ── Particle Canvas ────────────────────────────────────────
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = -1000;
    let mouseY = -1000;
    const PARTICLE_COUNT = 80;
    const CONNECTION_DIST = 120;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        // Use palette colours
        const colors = [
          'rgba(124, 58, 237, ',
          'rgba(34, 211, 238, ',
          'rgba(167, 139, 250, '
        ];
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Gentle mouse repulsion
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          this.x += dx * 0.01;
          this.y += dy * 0.01;
        }

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.colorBase + '0.6)';
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawConnections();
      requestAnimationFrame(animateParticles);
    }

    // Track mouse for particle interaction
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    initParticles();
    animateParticles();
  }

  // ── Custom Cursor ──────────────────────────────────────────
  if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches && window.innerWidth > 768) {
    let cx = 0, cy = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      cx = e.clientX;
      cy = e.clientY;
      cursorDot.style.left = cx + 'px';
      cursorDot.style.top = cy + 'px';
    });

    function animateRing() {
      ringX += (cx - ringX) * 0.12;
      ringY += (cy - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effects on interactive elements
    const hoverables = document.querySelectorAll('a, button, .gallery-item, .skill-card, .cta-button');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hovering');
        cursorRing.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hovering');
        cursorRing.classList.remove('hovering');
      });
    });
  }

  // ── Navbar: Hide on scroll down, show on scroll up ─────────
  let lastScrollY = 0;
  let ticking = false;

  function handleNavbarScroll() {
    const currentScrollY = window.scrollY;

    // Add 'scrolled' class after passing a threshold
    navbar.classList.toggle('scrolled', currentScrollY > 50);

    // Hide/show on scroll direction (only past 100px)
    if (currentScrollY > 100) {
      navbar.classList.toggle('hidden', currentScrollY > lastScrollY);
    } else {
      navbar.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleNavbarScroll);
      ticking = true;
    }
  });

  // ── Mobile Menu Toggle ─────────────────────────────────────
  function toggleMenu() {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    navOverlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', closeMenu);

  // Close mobile menu when a link is clicked
  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', closeMenu);
  });

  // ── Active Nav Link on Scroll ──────────────────────────────
  function updateActiveLink() {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navAnchors.forEach(anchor => {
      anchor.classList.remove('active');
      if (anchor.getAttribute('href') === `#${currentSection}`) {
        anchor.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateActiveLink);
  });

  // ── Scroll Reveal (IntersectionObserver) ───────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // ── Gallery Items Staggered Reveal ─────────────────────────
  const galleryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger the animation based on visible order
          const delay = Array.from(galleryItems).indexOf(entry.target) * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          galleryObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  galleryItems.forEach(item => {
    galleryObserver.observe(item);
  });

  // ── Skill Bar Animations ───────────────────────────────────
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const level = entry.target.getAttribute('data-level');
          entry.target.style.width = level + '%';
          entry.target.classList.add('animated');
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });

  // ── Typing Animation ──────────────────────────────────────
  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    const phrases = [
      '"dark themes 🖤"',
      '"pixel perfection"',
      '"shipping at 3am"',
      '"minimal aesthetics"',
      '"creative problem solving"'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400; // Pause before next word
      }

      setTimeout(typeEffect, typeSpeed);
    }

    // Start typing after a short delay
    setTimeout(typeEffect, 1200);
  }

  // ── Lightbox ───────────────────────────────────────────────
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').src;
      const imgAlt = item.querySelector('img').alt;
      lightboxImg.src = imgSrc;
      lightboxImg.alt = imgAlt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Close lightbox with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMenu();
    }
  });

  // ── Smooth Scroll for Anchor Links ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ── Tilt Effect on Skill Cards (desktop only) ──────────────
  if (window.matchMedia('(hover: hover)').matches) {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -8;
        const rotateY = (x - centerX) / centerX * 8;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ── Initial State ──────────────────────────────────────────
  updateActiveLink();
})();
  
