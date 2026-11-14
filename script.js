// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    // Save theme preference
    const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    
    // Add animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and timeline items
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.skill-card, .timeline-item, .portfolio-card, .contact-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Parallax effect for profile image
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        profileImage.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Add hover effect to portfolio cards
const portfolioCards = document.querySelectorAll('.portfolio-card');
portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Typing effect for the name on homepage
const nameElement = document.querySelector('.name');
if (nameElement && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            nameElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
}

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Apply ripple effect to all buttons
const buttons = document.querySelectorAll('.cta-button, .submit-button');
buttons.forEach(button => {
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.addEventListener('click', createRipple);
});

// Skill progress animation
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});


// Single-page navigation: keep original icons and active indicator.
const sections = document.querySelectorAll('#home, #about, #portfolio, #contact');
const navLinks = document.querySelectorAll('.nav-icon');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
  });
}, {rootMargin: '-35% 0px -55% 0px'});
sections.forEach(section => sectionObserver.observe(section));
