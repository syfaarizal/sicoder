document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Elements
    const dimensionSyifa = document.getElementById('dimension-syifa');
    const dimensionKaishi = document.getElementById('dimension-kaishi');
    const indicatorActive = document.getElementById('indicator-active');
    const indicatorInactive = document.getElementById('indicator-inactive');
    const indicatorSlider = document.querySelector('.indicator-slider');
    
    // Particles background
    const bgParticles = document.getElementById('bg-particles');
    createParticles(bgParticles, 50);
    
    // Dimension particles effect
    const dimensions = document.querySelectorAll('.dimension');
    dimensions.forEach(dimension => {
        createDimensionParticles(dimension);
        
        // Mouse move effect for particles
        dimension.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            const particles = this.querySelector('.dimension-particles');
            particles.style.setProperty('--x', `${x}%`);
            particles.style.setProperty('--y', `${y}%`);
        });
    });
    
    // Hover effects for dimensions
    dimensionSyifa.addEventListener('mouseenter', function() {
        indicatorActive.textContent = 'SYIFA F.A';
        indicatorInactive.textContent = 'KAI SHI';
        indicatorSlider.style.left = '0';
        indicatorSlider.style.width = '50%';
        
        // Add glow effect
        this.style.boxShadow = `
            -30px 0 60px rgba(0, 0, 0, 0.1),
            inset 1px 0 0 rgba(255, 255, 255, 0.9),
            0 0 30px rgba(255, 255, 255, 0.5)
        `;
    });
    
    dimensionKaishi.addEventListener('mouseenter', function() {
        indicatorActive.textContent = 'KAI SHI';
        indicatorInactive.textContent = 'SYIFA F.A';
        indicatorSlider.style.left = '50%';
        indicatorSlider.style.width = '50%';
        
        // Add red glow effect
        this.style.boxShadow = `
            30px 0 60px rgba(255, 46, 46, 0.2),
            inset -1px 0 0 rgba(255, 46, 46, 0.2),
            0 0 40px rgba(255, 46, 46, 0.3)
        `;
    });
    
    // Reset on mouse leave
    dimensions.forEach(dim => {
        dim.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            
            // Reset to default
            indicatorActive.textContent = 'SYIFA F.A';
            indicatorInactive.textContent = 'KAI SHI';
            indicatorSlider.style.left = '0';
            indicatorSlider.style.width = '50%';
        });
    });
    
    // Text animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animate dimensions sequentially
                if (entry.target.classList.contains('dimension')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.text-reveal, .dimension, .dimension-content');
    animateElements.forEach(el => {
        if (el.classList.contains('dimension')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
        }
        observer.observe(el);
    });
    
    // Interactive background on mouse move
    const bgGrid = document.querySelector('.bg-grid');
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        bgGrid.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        
        // Move particles slightly
        bgParticles.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    });
    
    // Terminal animation
    const terminalLines = document.querySelectorAll('.terminal-line');
    terminalLines.forEach((line, index) => {
        line.style.animationDelay = `${0.3 + (index * 0.3)}s`;
    });
    
    // Add click ripple effects
    dimensions.forEach(dimension => {
        dimension.addEventListener('click', function(e) {
            if (this.querySelector('a').contains(e.target)) return;
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: ${this.id === 'dimension-kaishi' ? 
                    'rgba(255, 46, 46, 0.3)' : 
                    'rgba(0, 0, 0, 0.1)'};
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
                z-index: 2;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Smooth scroll to dimensions section
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const switchSection = document.getElementById('switch-section');
    
    scrollIndicator.addEventListener('click', function() {
        switchSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        
        // Add pulse animation
        this.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
    
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        bgGrid.style.transform = `translateY(${rate}px)`;
        bgParticles.style.transform = `translateY(${rate * 0.5}px)`;
    });
    
    // Helper functions
    function createParticles(container, count) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(255, 46, 46, 0.1);
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                animation: floatParticle ${duration}s ease-in-out infinite;
                animation-delay: ${delay}s;
                pointer-events: none;
            `;
            
            container.appendChild(particle);
        }
        
        // Add CSS for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
                50% { transform: translateY(-40px) translateX(-10px); opacity: 0.3; }
                75% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes pulse {
                0%, 100% { transform: translateX(-50%) scale(1); }
                50% { transform: translateX(-50%) scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    function createDimensionParticles(dimension) {
        const particleContainer = dimension.querySelector('.dimension-particles');
        if (!particleContainer) return;
        
        const color = dimension.id === 'dimension-kaishi' ? 
            'rgba(255, 46, 46, 0.1)' : 
            'rgba(0, 0, 0, 0.05)';
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            
            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 10 + 5;
            const delay = Math.random() * 3;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            `;
            
            dimension.addEventListener('mouseenter', () => {
                particle.style.opacity = '0.6';
                particle.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
                particle.style.transition = `transform ${duration}s ease-in-out ${delay}s, opacity 0.3s ease`;
            });
            
            dimension.addEventListener('mouseleave', () => {
                particle.style.opacity = '0';
                particle.style.transform = 'translate(0, 0)';
            });
            
            particleContainer.appendChild(particle);
        }
    }
    
    // Initialize terminal cursor blinking
    const cursor = document.querySelector('.terminal-cursor');
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
});