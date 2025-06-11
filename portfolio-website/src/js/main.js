// This file contains the JavaScript code for the portfolio website. 
// It may include functionality for interactive elements, such as a mobile menu toggle or smooth scrolling.

document.addEventListener('DOMContentLoaded', function() {
    
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });
    
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.skills-category').forEach(category => {
        skillObserver.observe(category);
    });
    
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.classList.add('typing-animation');
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                subtitle.classList.remove('typing-animation');
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-name')?.textContent;
        const skillProgress = item.querySelector('.skill-progress');
        if (skillProgress) {
            const width = skillProgress.style.width;
            const level = parseInt(width);
            
            let levelText = '';
            if (level >= 80) levelText = 'Gevorderd';
            else if (level >= 60) levelText = 'Goed';
            else if (level >= 40) levelText = 'Basis';
            else levelText = 'Beginnend';
            
            item.setAttribute('data-level', levelText + ' (' + width + ')');
        }
    });
    
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            const submitBtn = contactForm.querySelector('.btn-primary');
            submitBtn.textContent = 'Versturen...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch('https://formspree.io/f/movwvvwq', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    formStatus.innerHTML = '<div class="success-message">✅ Bedankt! Uw bericht is succesvol verzonden.</div>';
                    contactForm.reset();
                } else {
                    console.log('Formspree errors:', data.errors);
                    formStatus.innerHTML = '<div class="error-message">❌ ' + (data.error || 'Er ging iets mis. Probeer het later opnieuw.') + '</div>';
                }
            } catch (error) {
                console.log('Network error:', error);
                formStatus.innerHTML = '<div class="error-message">❌ Netwerkfout. Controleer uw internetverbinding.</div>';
            } finally {
                submitBtn.textContent = 'Verstuur bericht';
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }
        });
    }
    
    // LinkedIn link tracking
    document.querySelector('a[href*="linkedin.com"]')?.addEventListener('click', function() {
        console.log('LinkedIn profiel bezocht');
    });
});