/* =====================
   CUSTOM CURSOR
===================== */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateRing);
}
animateRing();

// Cursor grow on hover
const hoverTargets = document.querySelectorAll(
  'a, button, .skill-tag, .project-card, .contact-link, .detail-row, .stat-card'
);
hoverTargets.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '54px';
    ring.style.height = '54px';
    ring.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.opacity = '0.5';
  });
});

/* =====================
   SCROLL REVEAL
===================== */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
      }
    });
  },
  { threshold: 0.1 }
);

reveals.forEach((el) => revealObserver.observe(el));

/* =====================
   TYPING EFFECT (HERO ROLE)
===================== */
const roles = [
  'Software Engineering Student',
  'Backend Developer',
  'Python Enthusiast',
  'Web Developer',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleEl = document.querySelector('.hero-role');

function typeEffect() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    roleEl.innerHTML = current.slice(0, charIndex + 1) + ' · Web Developer<span class="blink"></span>';
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    roleEl.innerHTML = current.slice(0, charIndex - 1) + ' · Web Developer<span class="blink"></span>';
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 90);
}

setTimeout(typeEffect, 1500);

/* =====================
   CONTACT FORM
===================== */
function handleSend() {
  const btn = document.querySelector('.btn-form');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#00d4aa';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
  }, 3000);
}

/* =====================
   ACTIVE NAV HIGHLIGHT
===================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    }
  });
});