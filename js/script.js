// ===================================
// EmailJS Configuration
// ===================================
const emailConfig = {
    serviceID: "service_zsbgzvl",
    templateID: "template_69intxr",
    publicKey: "OMFrmqn9zZ-BlDRAh"
};

// Initialize EmailJS
(function() {
    emailjs.init(emailConfig.publicKey);
})();

// ===================================
// Loader
// ===================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

// ===================================
// Navigation
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active navigation on scroll
function setActiveNav() {
    const sections = document.querySelectorAll('.section');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    setActiveNav();
});

// ===================================
// Typing Animation
// ===================================
const roles = [
    'Java Backend Developer',
    'Spring Boot Expert',
    'REST API Developer',
    'Problem Solver',
    'Microservices Architect'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.querySelector('.typing-text');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }

    setTimeout(typeRole, speed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeRole, 1000);
});

// ===================================
// Scroll Animations (AOS Alternative)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Animate skill progress bars
            if (entry.target.classList.contains('skill-category')) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                });
            }
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ===================================
// Back to Top Button
// ===================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Resume Modal
// ===================================
const resumeModal = document.getElementById('resumeModal');
const viewResumeBtn = document.getElementById('viewResumeBtn');
const modalClose = document.querySelector('.modal-close');

viewResumeBtn.addEventListener('click', () => {
    resumeModal.classList.add('show');
});

modalClose.addEventListener('click', () => {
    resumeModal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
        resumeModal.classList.remove('show');
    }
});

// ===================================
// Contact Form with EmailJS
// ===================================
const contactForm = document.getElementById('contact-form');
const submitBtn = contactForm.querySelector('.submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const btnIcon = submitBtn.querySelector('.btn-icon');

// Form validation
function validateForm() {
    let isValid = true;
    const formGroups = contactForm.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const errorMsg = group.querySelector('.error-message');
        
        if (!input.value.trim()) {
            errorMsg.textContent = 'This field is required';
            input.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            errorMsg.textContent = 'Please enter a valid email';
            input.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else if (input.id === 'name' && input.value.trim().length < 2) {
            errorMsg.textContent = 'Name must be at least 2 characters';
            input.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else if (input.id === 'subject' && input.value.trim().length < 5) {
            errorMsg.textContent = 'Subject must be at least 5 characters';
            input.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else if (input.id === 'message' && input.value.trim().length < 10) {
            errorMsg.textContent = 'Message must be at least 10 characters';
            input.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else {
            errorMsg.textContent = '';
            input.style.borderColor = 'var(--border-color)';
        }
    });

    return isValid;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Clear error on input
contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        const errorMsg = group.querySelector('.error-message');
        errorMsg.textContent = '';
        input.style.borderColor = 'var(--border-color)';
    });
});

// Set button state
function setButtonState(state) {
    switch(state) {
        case 'loading':
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            btnIcon.className = 'btn-icon fas fa-spinner fa-spin';
            break;
        case 'success':
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            btnText.textContent = 'Sent!';
            btnIcon.className = 'btn-icon fas fa-check';
            break;
        case 'error':
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('error');
            btnText.textContent = 'Failed';
            btnIcon.className = 'btn-icon fas fa-times';
            break;
        default:
            submitBtn.classList.remove('loading', 'success', 'error');
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnIcon.className = 'btn-icon fas fa-paper-plane';
    }
}

// Show toast notification
function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    const toastContainer = document.getElementById('toast-container');
    toastContainer.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        showToast('Please fill in all fields correctly', 'error');
        return;
    }
    
    // Show loading state
    setButtonState('loading');
    
    // Send email using EmailJS
    emailjs.sendForm(emailConfig.serviceID, emailConfig.templateID, this)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            setButtonState('success');
            showToast("Message sent successfully! I'll get back to you soon.", 'success');
            contactForm.reset();
            
            // Reset button after 2 seconds
            setTimeout(() => {
                setButtonState('default');
            }, 2000);
        }, function(error) {
            console.log('FAILED...', error);
            setButtonState('error');
            showToast('Oops! Something went wrong. Please try again.', 'error');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                setButtonState('default');
            }, 2000);
        });
});

// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Particle Animation for Hero Section
// ===================================
function createParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        heroParticles.appendChild(particle);
    }
}

// Create particles on load
window.addEventListener('load', createParticles);

// ===================================
// Performance Optimization
// ===================================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Console Message
// ===================================
console.log('%c👋 Hello Developer!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'color: #764ba2; font-size: 14px;');
console.log('%cLet\'s connect: your.email@example.com', 'color: #f093fb; font-size: 12px;');

// ===================================
// Add slideOutRight animation to CSS dynamically
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Print page info (for debugging)
// ===================================
console.log('%cPage loaded successfully!', 'color: #48bb78; font-size: 14px; font-weight: bold;');
console.log('Sections:', document.querySelectorAll('.section').length);
console.log('Navigation links:', navLinks.length);
console.log('EmailJS configured:', emailConfig.publicKey ? '✓' : '✗');
