// Enhanced Features Manager
class EnhancedFeatures {
    constructor() {
        this.loader = null;
        this.scrollAnimations = [];
        this.init();
    }

    init() {
        this.initLoader();
        this.initScrollAnimations();
        this.initWhatsAppFloat();
        this.initEnhancedHovers();
    }

    // Page Loader
    initLoader() {
        this.loader = document.getElementById('pageLoader');
        const progressBar = document.getElementById('loaderProgress');
        
        if (!this.loader) return;

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress > 90) progress = 90;
            
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
        }, 200);

        // Hide loader when page is fully loaded
        window.addEventListener('load', () => {
            clearInterval(interval);
            if (progressBar) {
                progressBar.style.width = '100%';
            }
            
            setTimeout(() => {
                this.hideLoader();
            }, 500);
        });

        // Fallback to hide loader after max time
        setTimeout(() => {
            this.hideLoader();
        }, 5000);
    }

    hideLoader() {
        if (this.loader) {
            this.loader.classList.add('hidden');
            setTimeout(() => {
                this.loader.remove();
            }, 500);
        }
    }

    // Scroll Animations
    initScrollAnimations() {
        // Add animation classes to elements
        this.addAnimationClasses();

        // Create intersection observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Stagger animation for cards
                    if (entry.target.classList.contains('stagger-parent')) {
                        this.staggerChildren(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll(
            '.fade-in-up, .fade-in-left, .fade-in-right, .fade-in, .scale-in, .text-reveal, .section-divider'
        );
        
        animatedElements.forEach(el => observer.observe(el));
    }

    addAnimationClasses() {
        // Add classes to sections
        const sections = document.querySelectorAll('.talleres, .galeria, .sobre-mi');
        sections.forEach((section, index) => {
            const title = section.querySelector('.section-title');
            if (title) {
                title.classList.add('fade-in-up');
            }
            
            // Add stagger animation to cards
            const grid = section.querySelector('.talleres-grid, .galeria-grid');
            if (grid) {
                grid.classList.add('stagger-parent');
            }
        });

        // Add animation to hero content
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroTitle) heroTitle.classList.add('fade-in-up');
        if (heroSubtitle) heroSubtitle.classList.add('fade-in-up');

        // Add animation to sobre-mi content
        const sobreMiImage = document.querySelector('.sobre-mi-image');
        const sobreMiText = document.querySelector('.sobre-mi-text');
        if (sobreMiImage) sobreMiImage.classList.add('fade-in-left');
        if (sobreMiText) sobreMiText.classList.add('fade-in-right');
    }

    staggerChildren(parent) {
        const children = parent.querySelectorAll('.taller-card, .galeria-item');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('stagger-animation', 'visible');
            }, index * 100);
        });
    }

    // WhatsApp Float
    initWhatsAppFloat() {
        const whatsappFloat = document.getElementById('whatsappFloat');
        if (!whatsappFloat) return;

        // Add click tracking
        whatsappFloat.addEventListener('click', () => {
            console.log('WhatsApp button clicked');
        });

        // Hide when footer is visible
        const footer = document.querySelector('.footer');
        if (footer) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        whatsappFloat.classList.add('hidden');
                    } else {
                        whatsappFloat.classList.remove('hidden');
                    }
                });
            }, {
                threshold: 0.1
            });
            
            observer.observe(footer);
        }
    }

    // Enhanced Hovers
    initEnhancedHovers() {
        // Add enhanced hover to taller cards
        const tallerCards = document.querySelectorAll('.taller-card');
        tallerCards.forEach(card => {
            card.classList.add('enhanced-hover');
        });

        // Add enhanced hover to galeria items
        const galeriaItems = document.querySelectorAll('.galeria-item');
        galeriaItems.forEach(item => {
            item.classList.add('enhanced-hover');
        });

        // Add button animations
        const buttons = document.querySelectorAll('.btn-comprar, .btn-submit, .pagination-btn');
        buttons.forEach(btn => {
            btn.classList.add('btn-animate');
        });
    }

    // Parallax effect for hero
    initParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedFeatures = new EnhancedFeatures();
});
