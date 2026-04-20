// ========== THEME TOGGLE (Modo Oscuro/Claro) ==========
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Cargar tema guardado o usar preferencia del sistema
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeToggleButton(savedTheme);
  
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
  button.textContent = theme === 'dark' ? '☀️' : '🌙';
  button.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}

// ========== FORM VALIDATION ==========
// Regex robusta para validar emails
const ROBUST_EMAIL_REGEX = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function initFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  const nameInput = document.getElementById('user_name');
  const emailInput = document.getElementById('user_email');
  const messageInput = document.getElementById('user_message');
  const submitBtn = document.getElementById('submitBtn');
  
  // Validación en tiempo real con actualización del botón
  nameInput?.addEventListener('blur', () => {
    validateField(nameInput, 'name');
    updateSubmitButton();
  });
  
  emailInput?.addEventListener('blur', () => {
    validateField(emailInput, 'email');
    updateSubmitButton();
  });
  
  emailInput?.addEventListener('input', () => {
    validateField(emailInput, 'email');
    updateSubmitButton();
  });
  
  messageInput?.addEventListener('blur', () => {
    validateField(messageInput, 'message');
    updateSubmitButton();
  });
  
  // Limpiar error al escribir
  [nameInput, emailInput, messageInput].forEach(input => {
    input?.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        clearFieldError(input);
        updateSubmitButton();
      }
    });
  });
  
  form.addEventListener('submit', handleFormSubmit);
  
  // Validación inicial
  updateSubmitButton();
}

// Actualizar estado del botón basado en validación
function updateSubmitButton() {
  const submitBtn = document.getElementById('submitBtn');
  const nameInput = document.getElementById('user_name');
  const emailInput = document.getElementById('user_email');
  const messageInput = document.getElementById('user_message');
  
  const nameValid = nameInput?.value.trim().length >= 3;
  const emailValid = ROBUST_EMAIL_REGEX.test(emailInput?.value.trim() || '');
  const messageValid = messageInput?.value.trim().length >= 10;
  
  submitBtn.disabled = !(nameValid && emailValid && messageValid);
  
  // Mostrar indicador visual de validación de email
  const validIcon = document.getElementById('valid-email');
  if (validIcon) {
    validIcon.style.display = emailValid ? 'inline' : 'none';
  }
}

function validateField(input, type) {
  let isValid = false;
  let errorMsg = '';
  
  if (type === 'name') {
    isValid = input.value.trim().length >= 3;
    errorMsg = isValid ? '' : 'El nombre debe tener al menos 3 caracteres';
  } else if (type === 'email') {
    isValid = ROBUST_EMAIL_REGEX.test(input.value.trim());
    errorMsg = isValid ? '' : 'Por favor, ingresa un email válido (ej: usuario@ejemplo.com)';
  } else if (type === 'message') {
    isValid = input.value.trim().length >= 10;
    errorMsg = isValid ? '' : 'El mensaje debe tener al menos 10 caracteres';
  }
  
  if (!isValid) {
    showFieldError(input, errorMsg);
  } else {
    clearFieldError(input);
  }
  
  return isValid;
}

function showFieldError(input, message) {
  input.classList.add('error');
  const errorSpan = document.getElementById(`error-${input.id.split('_')[1]}`);
  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.classList.add('show');
  }
}

function clearFieldError(input) {
  input.classList.remove('error');
  const fieldName = input.id.split('_')[1];
  const errorSpan = document.getElementById(`error-${fieldName}`);
  if (errorSpan) {
    errorSpan.classList.remove('show');
    errorSpan.textContent = '';
  }
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
  if (honeypotInput.value.trim() !== '') {
    console.warn('⚠️ Honeypot detectado - probable bot');
    showFormMessage('❌ Validación fallida. Intenta nuevamente.', 'error');
    return;
  }
  
  // ========== VALIDAR TODOS LOS CAMPOS ==========
  const nameValid = validateField(nameInput, 'name');
  const emailValid = validateField(emailInput, 'email');
  const messageValid = validateField(messageInput, 'message');
  
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
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
      to_email: 'cvasquez7788@gmail.com'
    };
    
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
    updateSubmitButton();
    
  } catch (error) {
    console.error('❌ Error al enviar:', error);
    showFormMessage('❌ Error al enviar. Por favor, intenta nuevamente o contacta por WhatsApp.', 'error');
    if (formStatus) formStatus.innerHTML = '<span class="status-error">✗ Error en el envío</span>';
  } finally {
    // ========== RESTAURAR BOTÓN DESPUÉS DE 3 SEGUNDOS ==========
    setTimeout(() => {
      submitBtn.textContent = originalText;
      updateSubmitButton();
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

// ========== INIT ON DOM READY ==========
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar EmailJS
  emailjs.init('2yQjw2XUrKsFdc4V3');
  
  initThemeToggle();
  initFormValidation();
});
