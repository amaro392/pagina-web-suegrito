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

document.querySelectorAll('.serv-card, .nos-card, .gal-item, .contact-row, .contact-form').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity .55s ${i * 0.07}s ease, transform .55s ${i * 0.07}s ease`;
  observer.observe(el);
});

// ========== EMAILJS CONTACT FORM ==========
(function() {
  // REEMPLAZA CON TUS CLAVES DE EMAILJS
  // 1. Ve a https://www.emailjs.com → crea cuenta gratis
  // 2. Agrega tu email cvasquez77_88@yahoo.com como servicio
  // 3. Crea template "Mensaje de contacto desde cristianaire.cl"
  // 4. Copia service_id, template_id, public_key aquí:
  const PUBLIC_KEY = 'TU_PUBLIC_KEY_AQUI';  // EmailJS Public Key
  const SERVICE_ID = 'TU_SERVICE_ID_AQUI';  // Email Service ID
  const TEMPLATE_ID = 'TU_TEMPLATE_ID_AQUI'; // Email Template ID

  emailjs.init(PUBLIC_KEY);

  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('form-message');

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Mostrar loading
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    formMessage.innerHTML = '';

    try {
      const templateParams = {
        from_name: document.getElementById('user_name').value,
        from_email: document.getElementById('user_email').value,
        subject: document.getElementById('user_subject').value || 'Consulta general',
        message: document.getElementById('user_message').value,
        to_email: 'cvasquez77_88@yahoo.com'
      };

      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
      
      // Éxito
      formMessage.innerHTML = `
        <div style="color: #4ade80; padding: 1rem; background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.3); border-radius: 8px; margin-top: 1rem;">
          ✅ ¡Mensaje enviado correctamente! Te responderemos pronto.
        </div>
      `;
      contactForm.reset();

    } catch (error) {
      console.error('Error EmailJS:', error);
      formMessage.innerHTML = `
        <div style="color: #f87171; padding: 1rem; background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.3); border-radius: 8px; margin-top: 1rem;">
          ❌ Error al enviar. Intenta con WhatsApp o recarga la página.
        </div>
      `;
    }

    // Restaurar botón
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
})();

