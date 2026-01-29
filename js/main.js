// ============================================
// MAIN JAVASCRIPT - Landing Page Odontológica
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Landing Page Dental - Cargada correctamente');
    
    // Inicializar todos los módulos
    initTestimonialSlider();
    initFAQAccordion();
    initScrollAnimations();
    initWhatsAppTracking();
    initMapInteraction();
    initServiceCards();
    initGalleryComparison();
    
    // Configuración adicional
    setupPerformanceOptimization();
});
// ============================================
// 1. CARRUSEL DE TESTIMONIOS (CORREGIDO)
// ============================================

function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.testimonial-indicator');
    const prevBtn = document.querySelector('.testimonial-nav-btn.prev');
    const nextBtn = document.querySelector('.testimonial-nav-btn.next');
    
    // Si no hay testimonios, salir
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 6000; // 6 segundos
    
    // Función para mostrar un slide específico
    function showSlide(index) {
        // Validar índice
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Ocultar todos los slides con animación de salida
        slides.forEach(slide => {
            if (slide.classList.contains('active')) {
                slide.style.opacity = '0';
                slide.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    slide.classList.remove('active');
                    slide.style.opacity = '';
                    slide.style.transform = '';
                }, 300);
            }
        });
        
        // Remover clase active de todos los indicadores y resetear estilos
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
            // RESETEAMOS TODOS LOS ESTILOS INLINE para evitar el problema
            indicator.style.backgroundColor = '';
            indicator.style.transform = '';
            indicator.style.borderColor = '';
        });
        
        // Mostrar slide actual con animación de entrada
        setTimeout(() => {
            slides[index].classList.add('active');
            slides[index].style.opacity = '0';
            slides[index].style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                slides[index].style.opacity = '1';
                slides[index].style.transform = 'translateX(0)';
                slides[index].style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            }, 10);
        }, 300);
        
        // Activar indicador correspondiente
        if (indicators[index]) {
            indicators[index].classList.add('active');
            // Aseguramos que el indicador activo tenga los estilos correctos
            indicators[index].style.backgroundColor = '';
            indicators[index].style.transform = '';
            indicators[index].style.borderColor = '';
        }
        
        currentSlide = index;
    }
    
    // Función para avanzar al siguiente slide
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
        resetAutoSlide();
    }
    
    // Función para retroceder al slide anterior
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
        resetAutoSlide();
    }
    
    // Iniciar carrusel automático
    function startAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    // Configurar eventos para los indicadores (SIMPLIFICADO)
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            if (slideIndex !== currentSlide) {
                showSlide(slideIndex);
                resetAutoSlide();
            }
        });
        
        // Efecto hover SIMPLIFICADO - solo cambia el cursor
        indicator.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.cursor = 'pointer';
            }
        });
        
        indicator.addEventListener('mouseleave', function() {
            // No hacemos cambios en los estilos, solo CSS se encarga
        });
    });
    
    // Configurar botones de navegación
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Controles de teclado para accesibilidad
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
    
    // Soporte para gestos táctiles (swipe)
    let touchStartX = 0;
    let touchEndX = 0;
    
    const sliderContainer = document.querySelector('.testimonial-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe izquierda = siguiente
                nextSlide();
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe derecha = anterior
                prevSlide();
            }
        }
    }
    
    // Pausar carrusel al hacer hover
    const testimonialSection = document.querySelector('.testimonials');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        testimonialSection.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
    }
    
    // Reiniciar intervalo automático
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    // Inicializar
    showSlide(0);
    startAutoSlide();
}
// ============================================
// 2. ACORDEÓN DE PREGUNTAS FRECUENTES
// ============================================

function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) return;
    
    faqQuestions.forEach(question => {
        // Configurar atributos ARIA para accesibilidad
        const answer = question.nextElementSibling;
        const isOpen = question.classList.contains('active');
        
        question.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        question.setAttribute('aria-controls', `faq-answer-${Array.from(faqQuestions).indexOf(question)}`);
        answer.id = `faq-answer-${Array.from(faqQuestions).indexOf(question)}`;
        
        // Evento click
        question.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Cerrar todas las otras preguntas
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherQuestion.nextElementSibling.classList.remove('open');
                }
            });
            
            // Alternar estado actual
            if (!isActive) {
                this.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                answer.classList.add('open');
            } else {
                this.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
                answer.classList.remove('open');
            }
        });
        
        // Soporte para teclado (Enter y Space)
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Abrir primera pregunta por defecto
    if (faqQuestions.length > 0) {
        faqQuestions[0].click();
    }
}

// ============================================
// 3. ANIMACIONES AL HACER SCROLL
// ============================================

function initScrollAnimations() {
    // Configurar Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir clase de animación
                entry.target.classList.add('fade-in-visible');
                
                // Animación específica para tarjetas de servicios
                if (entry.target.classList.contains('service-card')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
                
                // Dejar de observar después de animar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const animatedElements = document.querySelectorAll(
        '.service-card, .about-content, .testimonials, .faq-container, .contact-content'
    );
    
    // Configurar estado inicial y observar
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
    
    // Smooth scroll para enlaces internos (si los hubiera)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// 4. SEGUIMIENTO DE WHATSAPP
// ============================================

function initWhatsAppTracking() {
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .whatsapp-float');
    const phoneNumber = '573001234567'; // Número de WhatsApp
    const defaultMessage = encodeURIComponent('Hola, quiero agendar una valoración odontológica');
    
    // Configurar todos los botones de WhatsApp
    whatsappButtons.forEach(button => {
        // Asegurar que todos tengan el enlace correcto
        if (!button.href.includes('whatsapp.com')) {
            button.href = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
        }
        
        // Evento de clic para tracking
        button.addEventListener('click', function(e) {
            // En un entorno real, aquí iría Google Analytics o Facebook Pixel
            console.log('WhatsApp CTA clickeado:', {
                buttonText: this.textContent.trim(),
                section: this.closest('section')?.id || 'flotante',
                timestamp: new Date().toISOString()
            });
            
            // Podría enviar datos a un endpoint de analytics
            // sendAnalyticsEvent('whatsapp_click', { ... });
            
            // Continuar con la navegación normal
            // No prevenir el comportamiento por defecto
        });
        
        // Efecto de pulso para botón flotante
        if (button.classList.contains('whatsapp-float')) {
            setInterval(() => {
                button.classList.add('pulse');
                setTimeout(() => {
                    button.classList.remove('pulse');
                }, 1000);
            }, 10000); // Cada 10 segundos
        }
    });
    
    // Añadir estilos CSS para el efecto de pulso
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        .pulse {
            animation: pulse 1s ease-in-out;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
    `;
    document.head.appendChild(pulseStyle);
}

// ============================================
// 5. INTERACCIÓN CON EL MAPA
// ============================================

function initMapInteraction() {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;
    
    // Efecto hover en el mapa
    const mapIframe = mapContainer.querySelector('iframe');
    if (mapIframe) {
        mapContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        mapContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Hacer el mapa más accesible
        mapIframe.setAttribute('title', 'Ubicación de Clínica Dental en Floridablanca, Santander');
        mapIframe.setAttribute('aria-label', 'Mapa interactivo de Google Maps mostrando la ubicación de la clínica');
    }
    
    // Botón para abrir mapa en nueva pestaña
    const mapLink = document.createElement('a');
    mapLink.href = 'https://maps.google.com/?q=Calle+45+%2312-34,+Floridablanca,+Santander,+Colombia';
    mapLink.target = '_blank';
    mapLink.className = 'btn btn-map';
    mapLink.innerHTML = '<i class="fas fa-external-link-alt"></i> Abrir en Google Maps';
    mapLink.style.cssText = `
        display: block;
        margin-top: 1rem;
        background-color: var(--azul);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        text-align: center;
        font-size: 0.9rem;
        text-decoration: none;
    `;
    
    // Insertar después del mapa
    mapContainer.parentNode.insertBefore(mapLink, mapContainer.nextSibling);
}

// ============================================
// 6. INTERACCIONES CON TARJETAS DE SERVICIOS
// ============================================

function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Efecto de elevación al hover
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Click para expandir/contraer detalles
        const title = card.querySelector('h3');
        if (title) {
            title.style.cursor = 'pointer';
            title.addEventListener('click', function() {
                const card = this.closest('.service-card');
                card.classList.toggle('expanded');
                
                // Alternar visibilidad de detalles
                const details = card.querySelectorAll('ul, h4, p:not(:first-of-type)');
                details.forEach(detail => {
                    if (card.classList.contains('expanded')) {
                        detail.style.display = 'block';
                    } else {
                        detail.style.display = 'none';
                    }
                });
            });
        }
    });
}

// ============================================
// 7. OPTIMIZACIÓN DE RENDIMIENTO
// ============================================

function setupPerformanceOptimization() {
    // Lazy loading para imágenes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
    
    // Preconectar a dominios importantes
    const preconnectLinks = [
        'https://maps.google.com',
        'https://maps.googleapis.com',
        'https://fonts.gstatic.com'
    ];
    
    preconnectLinks.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
    
    // Detectar conexión lenta
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.saveData === true || connection.effectiveType.includes('2g')) {
            // Desactivar algunas animaciones para conexiones lentas
            document.body.classList.add('low-bandwidth');
        }
    }
    
    // Manejar cambios de visibilidad de pestaña
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Pausar animaciones cuando la pestaña no está visible
            document.body.classList.add('tab-hidden');
        } else {
            document.body.classList.remove('tab-hidden');
        }
    });
}

// ============================================
// 8. FUNCIONES DE UTILIDAD
// ============================================

// Función para enviar eventos de analytics (ejemplo)
function sendAnalyticsEvent(eventName, data = {}) {
    // En un entorno real, esto enviaría datos a Google Analytics, Facebook Pixel, etc.
    console.log(`[Analytics] ${eventName}:`, data);
    
    // Ejemplo con Google Analytics (si estuviera configurado)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, data);
    // }
}

// Función para formatear números de teléfono
function formatPhoneNumber(phone) {
    // Eliminar todo excepto números
    const cleaned = ('' + phone).replace(/\D/g, '');
    
    // Formato colombiano: +57 300 123 4567
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '+57 ' + match[1] + ' ' + match[2] + ' ' + match[3];
    }
    
    return phone;
}

// Función para validar formularios (si se añadieran en el futuro)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// 9. MANEJADOR DE ERRORES
// ============================================

// Capturar errores no manejados
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    
    // En un entorno de producción, enviar esto a un servicio de logging
    // sendToErrorLoggingService(e);
    
    return false;
});

// Capturar promesas no manejadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promesa rechazada no manejada:', e.reason);
    
    // En un entorno de producción, enviar esto a un servicio de logging
    // sendToErrorLoggingService(e.reason);
    
    e.preventDefault();
});

// ============================================
// 10. POLYFILLS PARA NAVEGADORES ANTIGUOS
// ============================================

// Intersection Observer polyfill
if (!('IntersectionObserver' in window)) {
    // Cargar polyfill dinámicamente
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    document.head.appendChild(script);
    
    // Fallback básico
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('fade-in-visible');
    });
}

// Smooth scroll polyfill
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollScript = document.createElement('script');
    smoothScrollScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/iamdustan-smoothscroll/0.4.0/smoothscroll.min.js';
    document.head.appendChild(smoothScrollScript);
}

// ============================================
// 11. GALERÍA DE COMPARACIÓN ANTES/DESPUÉS
// ============================================

function initGalleryComparison() {
    const comparisonContainers = document.querySelectorAll('.before-after-container');
    
    comparisonContainers.forEach(container => {
        const afterImage = container.querySelector('.after-image');
        const sliderBar = container.querySelector('.slider-bar');
        let isDragging = false;
        
        // Posición inicial: 50% (mitad y mitad)
        updateClipPath(50, afterImage, sliderBar);
        
        function startDrag(e) {
            isDragging = true;
            container.classList.add('dragging');
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', onDragTouch);
            document.addEventListener('touchend', stopDrag);
            e.preventDefault();
        }
        
        function onDrag(e) {
            if (!isDragging) return;
            const containerRect = container.getBoundingClientRect();
            const x = e.clientX - containerRect.left;
            const percentage = (x / containerRect.width) * 100;
            
            updateClipPath(percentage, afterImage, sliderBar);
        }
        
        function onDragTouch(e) {
            if (!isDragging) return;
            const containerRect = container.getBoundingClientRect();
            const x = e.touches[0].clientX - containerRect.left;
            const percentage = (x / containerRect.width) * 100;
            
            updateClipPath(percentage, afterImage, sliderBar);
        }
        
        function stopDrag() {
            isDragging = false;
            container.classList.remove('dragging');
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchmove', onDragTouch);
            document.removeEventListener('touchend', stopDrag);
        }
        
        // Event listeners
        container.addEventListener('mousedown', startDrag);
        sliderBar.addEventListener('mousedown', startDrag);
        
        // Touch support
        container.addEventListener('touchstart', startDrag, { passive: false });
        sliderBar.addEventListener('touchstart', startDrag, { passive: false });
        
        // Prevent image drag
        container.querySelectorAll('img').forEach(img => {
            img.addEventListener('dragstart', (e) => e.preventDefault());
        });
        
        // Keyboard accessibility
        container.setAttribute('tabindex', '0');
        container.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                const currentClip = getCurrentClipPercentage(afterImage);
                const change = e.key === 'ArrowLeft' ? -5 : 5;
                const newPercentage = Math.max(0, Math.min(100, currentClip + change));
                updateClipPath(newPercentage, afterImage, sliderBar);
            }
        });
    });
}

function updateClipPath(percentage, afterImage, sliderBar) {
    // Limitar entre 0% y 100%
    const clamped = Math.max(0, Math.min(100, percentage));
    
    // Actualizar clip-path de la imagen "después"
    // clip-path: polygon(clipX% 0, 100% 0, 100% 100%, clipX% 100%);
    afterImage.style.clipPath = `polygon(${clamped}% 0, 100% 0, 100% 100%, ${clamped}% 100%)`;
    afterImage.style.webkitClipPath = `polygon(${clamped}% 0, 100% 0, 100% 100%, ${clamped}% 100%)`;
    
    // Mover el slider a la posición del clip
    sliderBar.style.left = `${clamped}%`;
    
    // Actualizar accesibilidad
    afterImage.parentElement.setAttribute('aria-valuenow', Math.round(clamped));
}

function getCurrentClipPercentage(afterImage) {
    // Obtener el valor actual del clip-path
    const clipPath = afterImage.style.clipPath || afterImage.style.webkitClipPath;
    if (clipPath) {
        const match = clipPath.match(/polygon\((\d+)%/);
        return match ? parseInt(match[1]) : 50;
    }
    return 50;
}

// ============================================
// INICIALIZACIÓN COMPLETA
// ============================================

// Asegurar que todo esté listo cuando la ventana se cargue completamente
window.addEventListener('load', function() {
    console.log('Página completamente cargada');
    
    // Eliminar preloader si existiera
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
    
    // Animar elementos que podrían haberse cargado después
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Exportar funciones para uso externo (si es necesario)
window.DentalLanding = {
    initTestimonialSlider,
    initFAQAccordion,
    initScrollAnimations,
    formatPhoneNumber,
    validateEmail
};