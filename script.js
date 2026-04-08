// script.js
document.addEventListener("DOMContentLoaded", () => {
    // === 1. Navbar Effect ===
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // === 2. Smooth Scroll ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === 3. Reveal Animation ===
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.glass-box, .glass-pricing-card');
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`;
        observer.observe(el);
    });

    // === 4. Multi-language (i18n) Engine ===
    const langSwitchers = document.querySelectorAll('.lang-switcher span');
    
    // Check local storage for preferred language, or default to 'uz'
    let currentLang = localStorage.getItem('lux_lang') || 'uz';
    
    // Function to translate the page
    const setLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('lux_lang', lang);
        
        // Update active class on switcher
        langSwitchers.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        // Apply translations
        document.body.style.opacity = 0.5; // Quick fade effect
        
        setTimeout(() => {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang] && translations[lang][key]) {
                    el.innerText = translations[lang][key];
                }
            });
            document.documentElement.lang = lang; // Update meta lang
            document.body.style.opacity = 1; // Restore fade
        }, 150);
    };

    // Initialize the page with the right language
    setLanguage(currentLang);

    // Event listeners for language buttons
    langSwitchers.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-lang');
            if (selectedLang !== currentLang) {
                setLanguage(selectedLang);
            }
        });
    });

    // === 5. Accordion Logic for FAQ ===
    const accItems = document.querySelectorAll('.accordion-item');
    accItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Close others
            accItems.forEach(otherItem => {
                if(otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });

    // === 6. 3D Girl Mouse Tracking ===
    const girlWrapper = document.querySelector('.main-model-card');
    const heroGirl = document.getElementById('hero-girl');
    
    setTimeout(() => {
        document.addEventListener('mousemove', (e) => {
            if(!girlWrapper || !heroGirl) return;
            const rect = girlWrapper.getBoundingClientRect();
            if(rect.top > window.innerHeight || rect.bottom < 0) return;
            
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            heroGirl.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.1)`;
            heroGirl.style.transition = 'transform 0.1s ease-out';
        });
    }, 3000);
});
