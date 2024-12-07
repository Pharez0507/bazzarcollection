document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Remove loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    }


    //Scroll to top
    window.scrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && menuOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Handle navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Close menu overlay
                hamburger.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');

                // Handle contact link smooth scroll
                if (link.getAttribute('href') === '#contact' && window.location.pathname.endsWith('index.html')) {
                    e.preventDefault();
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                } else if (link.getAttribute('href') === '#contact') {
                    // If on another page, redirect to home page with contact section
                    window.location.href = 'index.html#contact';
                }
            });
        });
    }

    // Handle direct navigation to contact section from other pages
    if (window.location.hash === '#contact') {
        setTimeout(() => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    }

    // Cyber grid animation
    const createCyberGrid = () => {
        const grid = document.querySelector('.cyber-grid');
        if (grid) {
            for (let i = 0; i < 50; i++) {
                const line = document.createElement('div');
                line.className = 'grid-line';
                grid.appendChild(line);
            }
        }
    };
    createCyberGrid();

    // Glitch text effect
    const glitchTexts = document.querySelectorAll('.glitch');
    glitchTexts.forEach(text => {
        setInterval(() => {
            text.classList.add('active');
            setTimeout(() => {
                text.classList.remove('active');
            }, 200);
        }, 3000);
    });

    // Function to format price with single R
    function formatPrice(price) {
        return price.toString().replace(/^R\s?/i, '').trim();
    }

    // Update all price displays
    function updatePriceDisplays() {
        const priceElements = document.querySelectorAll('.price');
        priceElements.forEach(priceElement => {
            const price = priceElement.textContent;
            priceElement.textContent = formatPrice(price);
        });
    }

    // Update price when storage option is clicked
    function updatePrice(button) {
        const card = button.closest('.product-card');
        const priceElement = card.querySelector('.price');
        const newPrice = button.dataset.price;
        priceElement.textContent = formatPrice(newPrice);
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize price displays
        updatePriceDisplays();

        // Add click handlers for storage buttons
        document.querySelectorAll('.storage-btn').forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.product-card');
                card.querySelectorAll('.storage-btn').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                updatePrice(this);
            });
        });
    });

    // Cyber button hover effect
    const cyberBtns = document.querySelectorAll('.cyber-btn');
    cyberBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            btn.style.setProperty('--x', `${x}px`);
            btn.style.setProperty('--y', `${y}px`);
        });
    });

    // Form animations
    const formInputs = document.querySelectorAll('.cyber-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Contact form submission with cyber effect
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add cyber glitch effect
            contactForm.classList.add('cyber-glitch');
            
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'cyber-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Message sent successfully!</p>
                `;
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove effects
                setTimeout(() => {
                    contactForm.classList.remove('cyber-glitch');
                    successMessage.remove();
                }, 3000);
            }, 1000);
        });
    }

    // Cart functionality with cyber animation
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    if (addToCartButtons && cartCountElement) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                cartCount++;
                cartCountElement.textContent = cartCount;
                
                // Add cyber animation
                button.classList.add('cyber-clicked');
                
                // Create floating item animation
                const floatingItem = document.createElement('div');
                floatingItem.className = 'floating-cart-item cyber-float';
                const rect = button.getBoundingClientRect();
                floatingItem.style.top = `${rect.top}px`;
                floatingItem.style.left = `${rect.left}px`;
                document.body.appendChild(floatingItem);

                const cart = document.querySelector('.cart-icon');
                if (cart) {
                    const cartRect = cart.getBoundingClientRect();
                    requestAnimationFrame(() => {
                        floatingItem.style.top = `${cartRect.top}px`;
                        floatingItem.style.left = `${cartRect.left}px`;
                        floatingItem.style.opacity = '0';
                        floatingItem.style.transform = 'scale(0.1) rotate(720deg)';
                    });
                    
                    setTimeout(() => {
                        document.body.removeChild(floatingItem);
                        button.classList.remove('cyber-clicked');
                    }, 1000);
                }
            });
        });
    }
}); 