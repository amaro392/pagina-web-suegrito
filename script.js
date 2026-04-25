// ========== THEME TOGGLE (Modo Oscuro/Claro) ==========
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Cargar tema guardado o usar preferencia del sistema
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeToggleButton(savedTheme);
  
  if (!themeToggle) return;
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleButton(newTheme);
  });
  
  // Detectar cambios del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const theme = e.matches ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', theme);
      updateThemeToggleButton(theme);
    }
  });
}

function updateThemeToggleButton(theme) {
  const button = document.getElementById('theme-toggle');
  if (!button) return;
  button.textContent = theme === 'dark' ? '☀️' : '🌙';
  button.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}

// ========== FORM VALIDATION ==========
// Regex robusta para validar emails
const ROBUST_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function initFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) {
    console.error('Formulario no encontrado');
    return;
  }
  
  const nameInput = document.getElementById('user_name');
  const emailInput = document.getElementById('user_email');
  const messageInput = document.getElementById('user_message');
  const submitBtn = document.getElementById('submitBtn');
  
  console.log('Formulario inicializado', { form, nameInput, emailInput, messageInput, submitBtn });
  
  // Función para verificar si todo es válido
  function checkFormValidity() {
    const name = (nameInput?.value || '').trim();
    const email = (emailInput?.value || '').trim();
    const message = (messageInput?.value || '').trim();
    
    const nameOk = name.length >= 3;
    const emailOk = ROBUST_EMAIL_REGEX.test(email);
    const messageOk = message.length >= 5;
    
    console.log('Validación:', { nameOk, emailOk, messageOk, name, email, message });
    
    const isValid = nameOk && emailOk && messageOk;
    submitBtn.disabled = !isValid;
    
    // Cambiar color del botón
    if (isValid) {
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
    } else {
      submitBtn.style.opacity = '0.65';
      submitBtn.style.cursor = 'not-allowed';
    }
    
    return isValid;
  }
  
  // Eventos para validar mientras escribe
  nameInput?.addEventListener('input', checkFormValidity);
  nameInput?.addEventListener('change', checkFormValidity);
  
  emailInput?.addEventListener('input', checkFormValidity);
  emailInput?.addEventListener('change', checkFormValidity);
  
  messageInput?.addEventListener('input', checkFormValidity);
  messageInput?.addEventListener('change', checkFormValidity);
  
  // Envío del formulario
  form.addEventListener('submit', handleFormSubmit);
  
  // Validación inicial
  checkFormValidity();
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('user_name');
  const emailInput = document.getElementById('user_email');
  const messageInput = document.getElementById('user_message');
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('form-message');
  const formStatus = document.getElementById('form-status');
  const honeypotInput = document.getElementById('website');
  
  // ========== HONEYPOT CHECK (Anti-bot) ==========
  if (honeypotInput?.value.trim() !== '') {
    console.warn('⚠️ Honeypot detectado - probable bot');
    showFormMessage('❌ Validación fallida. Intenta nuevamente.', 'error');
    return;
  }
  
  // ========== VALIDAR TODOS LOS CAMPOS ==========
  const name = (nameInput?.value || '').trim();
  const email = (emailInput?.value || '').trim();
  const message = (messageInput?.value || '').trim();
  
  const nameValid = name.length >= 3;
  const emailValid = ROBUST_EMAIL_REGEX.test(email);
  const messageValid = message.length >= 5;
  
  if (!nameValid || !emailValid || !messageValid) {
    showFormMessage('⚠️ Por favor, completa todos los campos correctamente.', 'error');
    return;
  }
  
  // ========== MOSTRAR ESTADO: ENVIANDO ==========
  const originalText = submitBtn.textContent;
  submitBtn.textContent = '⏳ Enviando...';
  submitBtn.disabled = true;
  formMessage.innerHTML = '';
  if (formStatus) formStatus.innerHTML = '<span class="status-sending">📤 Enviando tu mensaje...</span>';
  
  try {
    const templateParams = {
      name: name,
      email: email,
      subject: (document.getElementById('user_subject')?.value || '').trim() || 'Mensaje de contacto',
      message: message,
      to_email: 'cvasquez7788@gmail.com'
    };
    
    console.log('Enviando:', templateParams);
    
    // ========== ENVIAR CON EMAILJS ==========
    const response = await emailjs.send(
      'service_58qz1rg',      // Service ID
      'template_wjk6hco',     // Template ID
      templateParams
    );
    
    // ========== ÉXITO ==========
    showFormMessage('✅ ¡Mensaje enviado correctamente! Te responderemos pronto.', 'success');
    if (formStatus) formStatus.innerHTML = '<span class="status-success">✓ Mensaje enviado con éxito</span>';
    form.reset();
    
    // Reiniciar validación del formulario
    const formValidationEvent = new Event('input');
    nameInput?.dispatchEvent(formValidationEvent);
    
  } catch (error) {
    console.error('❌ Error al enviar:', error);
    showFormMessage('❌ Error al enviar. Por favor, intenta nuevamente o contacta por WhatsApp.', 'error');
    if (formStatus) formStatus.innerHTML = '<span class="status-error">✗ Error en el envío</span>';
  } finally {
    // ========== RESTAURAR BOTÓN DESPUÉS DE 3 SEGUNDOS ==========
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = true;
      if (formStatus) formStatus.innerHTML = '';
    }, 3000);
  }
}

function showFormMessage(message, type) {
  const formMessage = document.getElementById('form-message');
  formMessage.textContent = message;
  formMessage.className = `form-message show ${type}`;
  
  // Auto-ocultar mensaje de éxito después de 5 segundos
  if (type === 'success') {
    setTimeout(() => {
      formMessage.classList.remove('show');
    }, 5000);
  }
}

// ========== FAQ TOGGLE ==========
function toggleFaq(el) {
  const item = el.closest('.faq-item');
  if (!item) return;
  
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ========== LIGHTBOX FUNCTIONALITY ==========
function openLightbox(imgSrc) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox active';
  lightbox.innerHTML = `
    <img src="${imgSrc}" class="lightbox-img" alt="Galería amplificada">
    <button class="lightbox-close" onclick="closeLightbox()" aria-label="Cerrar">&times;</button>
  `;
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
  
  // Cerrar con Escape
  document.addEventListener('keydown', closeLightboxOnEscape);
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    lightbox.remove();
    document.body.style.overflow = '';
  }
  document.removeEventListener('keydown', closeLightboxOnEscape);
}

function closeLightboxOnEscape(e) {
  if (e.key === 'Escape') closeLightbox();
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('lightbox')) {
    closeLightbox();
  }
});

// ========== GALLERY CLICK HANDLER ==========
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gal-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const imgSrc = item.dataset.fullsrc || item.querySelector('img').src;
      openLightbox(imgSrc);
    });
  });
});

// ========== SCROLL-TRIGGERED FADE-IN FOR CARDS ==========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.serv-card, .nos-card, .gal-item, .testimonial-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity .55s ${i * 0.07}s ease, transform .55s ${i * 0.07}s ease`;
  observer.observe(el);
});

// ========== SMART STICKY HEADER (Oculta al hacer scroll hacia abajo) ==========
function initSmartStickyHeader() {
  const nav = document.querySelector('nav');
  let lastScrollTop = 0;
  let isNavVisible = true;
  const scrollThreshold = 30; // Solo oculta después de 30px de scroll
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Si scrollea hacia abajo
    if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
      if (isNavVisible) {
        nav.style.transform = 'translateY(-100%)';
        nav.style.transition = 'transform 0.3s ease-in-out';
        isNavVisible = false;
      }
    }
    // Si scrollea hacia arriba
    else if (currentScroll < lastScrollTop) {
      if (!isNavVisible) {
        nav.style.transform = 'translateY(0)';
        nav.style.transition = 'transform 0.3s ease-in-out';
        isNavVisible = true;
      }
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }, false);
}

// ========== INIT ON DOM READY ==========
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar EmailJS (con protección por si el script no cargó)
  if (typeof emailjs !== 'undefined') {
    try {
      emailjs.init('2yQjw2XUrKsFdc4V3');
      console.log('✅ EmailJS inicializado');
    } catch (err) {
      console.warn('⚠️ Error al inicializar EmailJS:', err);
    }
  } else {
    console.warn('⚠️ EmailJS no está cargado. El envío de correos no funcionará, pero el formulario sí.');
  }
  
  initThemeToggle();
  initFormValidation();
  initSmartStickyHeader();
});
