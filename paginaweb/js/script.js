function toggleFaq(el) {
  const item = el.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Lightbox functionality
function openLightbox(imgSrc) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox active';
  lightbox.innerHTML = `
    <img src="${imgSrc}" class="lightbox-img" alt="Galería">
    <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
  `;
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    lightbox.remove();
    document.body.style.overflow = '';
  }
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('lightbox')) {
    closeLightbox();
  }
});

// Scroll-triggered fade-in for cards
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.serv-card, .nos-card, .gal-item, .contact-row').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity .55s ${i * 0.07}s ease, transform .55s ${i * 0.07}s ease`;
  observer.observe(el);
});
