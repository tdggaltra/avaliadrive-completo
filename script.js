// ===== CONFIGURAÇÃO =====
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxHF6qOP1cVnZdeVpRPohS_8-CRmZqFAKb8mcuMuG7FMvu6URBArXta8wHTQeFHVgFs/exec';

// ===== THEME TOGGLE =====
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    updateThemeIcon(newTheme);
    
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'theme_toggle', {
            'event_category': 'Theme',
            'event_label': newTheme
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

// Call on page load
initializeTheme();

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(event.target) && 
        !mobileMenuBtn.contains(event.target)) {
        toggleMobileMenu();
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip empty anchors
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
            
            // Smooth scroll to target
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===== FAQ ACCORDION =====
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const allFaqItems = document.querySelectorAll('.faq-item');
    
    // Close other items
    allFaqItems.forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current item
    faqItem.classList.toggle('active');
}

// ===== FORM VALIDATION & SUBMISSION =====
const researchForm = document.getElementById('researchForm');

if (researchForm) {
    researchForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate required fields
        const requiredFields = ['nome', 'autoescola', 'cargo', 'cidade', 'email', 'telefone', 'instrutores'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = researchForm.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                input.style.borderColor = '#EF4444';
                isValid = false;
            } else {
                input.style.borderColor = '#E5E7EB';
            }
        });
        
        if (!isValid) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailInput = researchForm.querySelector('[name="email"]');
        if (!emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = '#EF4444';
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        
        // Show loading state
        const submitBtn = researchForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        try {
            // Coleta dados manualmente
            const formData = new FormData(researchForm);
            
            console.log('📝 Enviando dados:');
            for (let [key, value] of formData.entries()) {
                console.log(key + ': ' + value);
            }
            
            // Cria um iframe oculto para enviar
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.name = 'hidden_iframe';
            document.body.appendChild(iframe);
            
            // Cria um form temporário
            const tempForm = document.createElement('form');
            tempForm.method = 'POST';
            tempForm.action = GOOGLE_SCRIPT_URL;
            tempForm.target = 'hidden_iframe';
            
            // Adiciona todos os campos
            for (let [key, value] of formData.entries()) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                tempForm.appendChild(input);
            }
            
            // Submete o form
            document.body.appendChild(tempForm);
            tempForm.submit();
            
            // Aguarda o envio
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Remove elementos temporários
            document.body.removeChild(tempForm);
            document.body.removeChild(iframe);
            
            console.log('✅ Dados enviados via iframe!');
            
            showModal();
            researchForm.reset();
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'Research Form',
                    'event_label': 'Validation Research'
                });
            }
            
        } catch (error) {
            console.error('❌ Erro:', error);
            alert('Erro ao enviar formulário. Por favor, tente novamente.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// ===== MODAL FUNCTIONS =====
function showModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.getElementById('successModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== ANIMATIONS ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.problem-card, .feature-card, .benefit-card, .pricing-card, .feature-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// ===== PHONE MASK =====
const phoneInput = document.querySelector('input[name="telefone"]');

if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        if (value.length >= 11) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (value.length >= 7) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        } else if (value.length >= 1) {
            value = value.replace(/^(\d*)/, '($1');
        }
        
        e.target.value = value;
    });
}

// ===== TRACK BUTTON CLICKS =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        const buttonHref = this.getAttribute('href');
        
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'Button',
                'event_label': buttonText,
                'value': buttonHref
            });
        }
        
        console.log('Button clicked:', buttonText);
    });
});

// ===== SCROLL TO TOP =====
let scrollTopBtn;

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
        if (!scrollTopBtn) {
            createScrollTopButton();
        }
        scrollTopBtn.style.display = 'flex';
    } else if (scrollTopBtn) {
        scrollTopBtn.style.display = 'none';
    }
});

function createScrollTopButton() {
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-lg);
        z-index: 999;
        transition: var(--transition-base);
    `;
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    document.body.appendChild(scrollTopBtn);
}

// ===== FORM FIELD VALIDATION FEEDBACK =====
const allInputs = document.querySelectorAll('input, select, textarea');

allInputs.forEach(input => {
    // Remove error styling when user starts typing
    input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(239, 68, 68)') {
            this.style.borderColor = '#E5E7EB';
        }
    });
    
    // Validate on blur
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#EF4444';
        }
    });
});

// ===== CONTACT MODAL FUNCTIONS =====
function showContactModal() {
    const modal = document.getElementById('contactSuccessModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    const modal = document.getElementById('contactSuccessModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close contact modal when clicking outside
document.getElementById('contactSuccessModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeContactModal();
    }
});

// ===== QUICK CONTACT FORM WITH MODAL =====
// ===== QUICK CONTACT FORM WITH MODAL =====
const quickContactForm = document.querySelector('form[name="contato-rapido"]:not([hidden])');

if (quickContactForm) {
    quickContactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log('📧 Formulário de contato submetido!');
        
        const submitBtn = quickContactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Coleta dados
        const formData = {
            nome: quickContactForm.querySelector('[name="nome"]').value,
            email: quickContactForm.querySelector('[name="email"]').value,
            mensagem: quickContactForm.querySelector('[name="mensagem"]').value
        };
        
        console.log('📝 Dados do contato:', formData);
        
        // Cria iframe oculto
        let iframe = document.getElementById('hidden_iframe_contact');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'hidden_iframe_contact';
            iframe.name = 'hidden_iframe_contact';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        }
        
        // Cria form temporário
        const tempForm = document.createElement('form');
        tempForm.method = 'POST';
        tempForm.action = GOOGLE_SCRIPT_URL; // USA A MESMA URL!
        tempForm.target = 'hidden_iframe_contact';
        
        // Adiciona campos
        Object.keys(formData).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = formData[key];
            tempForm.appendChild(input);
        });
        
        document.body.appendChild(tempForm);
        console.log('📤 Enviando contato para:', GOOGLE_SCRIPT_URL);
        tempForm.submit();
        
        // Aguarda e mostra sucesso
        setTimeout(() => {
            document.body.removeChild(tempForm);
            console.log('✅ Contato enviado!');
            
            showContactModal();
            quickContactForm.reset();
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'Quick Contact',
                    'event_label': 'Contact Form'
                });
            }
        }, 2000);
    });
}

// ===== INITIALIZE =====
console.log('AvaliaDrive Landing Page loaded successfully! 🚗');
console.log('Google Apps Script URL configurada: ' + GOOGLE_SCRIPT_URL);

// Expose functions globally for inline onclick handlers
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleFaq = toggleFaq;
window.showModal = showModal;
window.closeModal = closeModal;
window.showContactModal = showContactModal;
window.closeContactModal = closeContactModal;