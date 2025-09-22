// script.js - Versión corregida sin solapamientos

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Especiarte - Página cargada correctamente');
    
    // Inicializar todos los componentes
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initWhatsAppButton();
});

// Navegación
function initNavigation() {
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                closeMobileMenu();
            }
        });
    });

    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
}

// Efectos de scroll
function initScrollEffects() {
    // Navbar al hacer scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Parallax en hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Animaciones
function initAnimations() {
    // Observer para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Elementos a observar
    document.querySelectorAll('.producto-card, .nosotros-img, .contacto-item').forEach(el => {
        observer.observe(el);
    });
}

// Formulario de contacto
function initContactForm() {
    const contactForm = document.querySelector('.contacto-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'red';
                    isValid = false;
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
                this.reset();
            } else {
                alert('Por favor, completa todos los campos requeridos.');
            }
        });
    }
}

// Botón de WhatsApp - VERSIÓN CORREGIDA
function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (!whatsappButton) return;
    
    // Estado inicial
    whatsappButton.style.opacity = '0';
    whatsappButton.style.transform = 'translateY(20px) scale(0.8)';
    
    // Aparecer después de cargar
    setTimeout(function() {
        whatsappButton.classList.add('loaded');
    }, 1000);
    
    // Comportamiento al hacer scroll (simplificado)
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Solo ocultar si estamos scrolleando hacia abajo rápidamente
        if (scrollTop > 100) {
            whatsappButton.style.transform = 'translateY(80px) scale(0.9)';
        }
        
        // Mostrar después de dejar de scrollear
        scrollTimeout = setTimeout(function() {
            whatsappButton.style.transform = 'translateY(0) scale(1)';
        }, 500);
    });
    
    // Efectos de interacción
    whatsappButton.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        console.log('WhatsApp button clicked - Especiarte');
    });
    
    // Pausar animación al hacer hover
    whatsappButton.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    whatsappButton.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}