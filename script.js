const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const skillBars = document.querySelectorAll('.skill-progress');
const contactForm = document.querySelector('.contact-form');
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside (only if menu is open)
document.addEventListener('click', function(event) {
    const isMenuOpen = navMenu.classList.contains('active');
    if (!isMenuOpen) return;
    // If click is NOT inside hamburger or navMenu
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Close menu on scroll (only if menu is open)
window.addEventListener('scroll', function() {
    const isMenuOpen = navMenu.classList.contains('active');
    if (isMenuOpen) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth Scrolling 
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
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
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

//  elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-content, .project-card, .skills-category, .contact-content');
    
    animateElements.forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('slide-in-left');
        } else {
            el.classList.add('slide-in-right');
        }
        observer.observe(el);
    });

    // animation for hero section
    if (window.lottie) {
        lottie.loadAnimation({
            container: document.getElementById('lottie-animation'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'anime2.json'
        });
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Social links hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loading');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 500);
    });
});


function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
        background: var(--primary-color) !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

const styleRole = document.createElement('style');
styleRole.textContent = `
  .role-text-animate {
    animation: roleSlideInUp 0.6s;
  }
`;
document.head.appendChild(styleRole);

// Typing Effect  
const roles = [
  { text: 'DEVELOPER' },
  { text: 'DESIGNER' },
  { text: 'GAMER'},
  { text: 'EDITOR'},
  { text: 'PROGRAMMER' },
  { text: 'CREATOR'}
];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenRoles = 1000;

function typeRole() {
  const roleTextEl = document.querySelector('.role-text');
  if (!roleTextEl) return;
  const currentRole = roles[typingIndex];
  roleTextEl.style.color = currentRole.color;
  let displayText = currentRole.text.substring(0, charIndex);
  roleTextEl.innerHTML = displayText + '<span class="blinking-cursor">|</span>';

  if (!isDeleting && charIndex <= currentRole.text.length) {
    charIndex++;
    if (charIndex > currentRole.text.length) {
      isDeleting = true;
      setTimeout(typeRole, delayBetweenRoles);
    } else {
      setTimeout(typeRole, typingSpeed);
    }
  } else if (isDeleting && charIndex >= 0) {
    charIndex--;
    if (charIndex < 0) {
      isDeleting = false;
      typingIndex = (typingIndex + 1) % roles.length;
      setTimeout(typeRole, typingSpeed);
    } else {
      setTimeout(typeRole, erasingSpeed);
    }
  }
}
typeRole();

//  functionality achievements
function openModal(type, title, subtitle, description, iconOrImage) {
    const modal = document.getElementById('achievementModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalIcon = document.getElementById('modalIcon');
    const modalImage = document.getElementById('modalImage');
    const modalImageImg = modalImage.querySelector('img');

    // Set modal content
    modalTitle.textContent = title;
    modalSubtitle.textContent = subtitle;
    modalDescription.textContent = description;

    if (type === 'award') {
        // For awards
        modalIcon.className = iconOrImage;
        modalIcon.style.display = 'block';
        modalImage.style.display = 'none';
    } else if (type === 'certificate') {
        // For certificates
        modalIcon.style.display = 'none';
        modalImage.style.display = 'block';
        modalImageImg.src = iconOrImage;
        modalImageImg.alt = title;
    }

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('achievementModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
}

window.onclick = function(event) {
    const modal = document.getElementById('achievementModal');
    if (event.target === modal) {
        closeModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}); 

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
            navMenu.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
            navMenu.classList.remove('scrolled');
        }
    });
}); 

// Animate skill cards on scroll (fade-in-up)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.skill-card').forEach(card => {
        card.classList.add('fade-in-up');
    });

    // IntersectionObserver for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    const skillCardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillCards.forEach(card => {
        skillCardObserver.observe(card);
    });

    document.querySelectorAll('.certificate-item').forEach(card => {
        card.classList.add('fade-in-up');
    });

    // IntersectionObserver for achievement cards
    const achievementCards = document.querySelectorAll('.certificate-item');
    const achievementCardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    achievementCards.forEach(card => {
        achievementCardObserver.observe(card);
    });
}); 

// Theme Toggle Functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme(event) {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    const mouseX = event ? event.clientX : window.innerWidth / 2;
    const mouseY = event ? event.clientY : window.innerHeight / 2;
    
    animateThemeChange(newTheme, mouseX, mouseY);
}

function animateThemeChange(newTheme, mouseX, mouseY) {
    const overlay = document.getElementById('theme-animation-overlay');
    
    overlay.className = `theme-animation-overlay ${newTheme}`;
    overlay.style.setProperty('--mouse-x', mouseX + 'px');
    overlay.style.setProperty('--mouse-y', mouseY + 'px');
    
    overlay.classList.add('animate');
    
    setTimeout(() => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }, 600);
    
    setTimeout(() => {
        overlay.classList.remove('animate');
        overlay.className = 'theme-animation-overlay';
    }, 1200);
}

function updateThemeIcon(theme) {
    const lightIcon = document.querySelector('.light-icon');
    const darkIcon = document.querySelector('.dark-icon');
    const mobileLightIcon = document.querySelector('.mobile-light-icon');
    const mobileDarkIcon = document.querySelector('.mobile-dark-icon');
    
    if (theme === 'dark') {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
        mobileLightIcon.style.display = 'none';
        mobileDarkIcon.style.display = 'block';
    } else {
        lightIcon.style.display = 'block';
        darkIcon.style.display = 'none';
        mobileLightIcon.style.display = 'block';
        mobileDarkIcon.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    if (themeToggle) {
        themeToggle.addEventListener('click', (event) => toggleTheme(event));
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', (event) => toggleTheme(event));
    }
});

