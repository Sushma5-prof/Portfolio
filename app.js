// Portfolio Website JavaScript - Updated for Sushma S

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Hero animations
    initHeroAnimations();
    
    // Scroll animations
    initScrollAnimations();
    
    // Skills section
    initSkills();
    
    // Projects filtering
    initProjects();
    
    // Contact form
    initContactForm();
    
    // Animated counters
    initCounters();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Enhanced form validation
    setTimeout(enhanceFormValidation, 1000);
    
    // Initialize project animations
    setTimeout(initProjectAnimations, 1000);
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
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

// Hero section animations
function initHeroAnimations() {
    // Typing animation with Sushma's tagline
    const typingText = document.querySelector('.typing-text');
    const text = "Building intelligent solutions through code - bridging web development and artificial intelligence";
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            typingText.textContent = text.slice(0, index + 1);
            index++;
            setTimeout(typeWriter, 50);
        } else {
            // Remove typing cursor after completion
            setTimeout(() => {
                typingText.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing animation after page loads
    setTimeout(typeWriter, 1500);
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations when skills section is visible
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Trigger counter animations when about section is visible
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Observe individual elements
    const animatedElements = document.querySelectorAll('.project-card, .skill-item');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Skills section functionality with updated categories
function initSkills() {
    const skillFilters = document.querySelectorAll('.skill-filter');
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter button
            skillFilters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter skills
            skillItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Re-animate visible skill bars
            setTimeout(() => {
                animateSkillBars();
            }, 300);
        });
    });
}

// Animate skill progress bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        const parentItem = bar.closest('.skill-item');
        
        // Only animate visible skill bars
        if (!parentItem.classList.contains('hidden')) {
            // Reset width first
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 200);
        }
    });
}

// Projects filtering with updated categories
function initProjects() {
    const projectFilters = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');
    
    projectFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter button
            projectFilters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with updated categories
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
            
            // Add stagger animation for visible projects
            const visibleCards = document.querySelectorAll('.project-card:not(.hidden)');
            visibleCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('slide-in-up');
            });
        });
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('form-success');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            // Hide form and show success message
            form.style.display = 'none';
            formSuccess.classList.remove('hidden');
            
            // Reset form after success
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                formSuccess.classList.add('hidden');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// Form validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form messages
function showFormMessage(message, type) {
    // Create or update message element
    let messageEl = document.querySelector('.form-message');
    
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.className = 'form-message';
        messageEl.style.padding = '10px';
        messageEl.style.marginBottom = '20px';
        messageEl.style.borderRadius = '4px';
        messageEl.style.textAlign = 'center';
        document.querySelector('.contact-form').prepend(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;
    
    if (type === 'error') {
        messageEl.style.background = 'rgba(255, 84, 89, 0.1)';
        messageEl.style.color = 'var(--color-error)';
        messageEl.style.border = '1px solid rgba(255, 84, 89, 0.3)';
    }
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageEl.remove();
    }, 3000);
}

// Animated counters - Updated for Sushma's stats
function initCounters() {
    // Set the correct target values for Sushma
    const statNumbers = document.querySelectorAll('.stat-number');
    const targetValues = [3, 4, 12, 500]; // academic year, projects, technologies, learning hours
    
    statNumbers.forEach((counter, index) => {
        if (targetValues[index] !== undefined) {
            counter.setAttribute('data-target', targetValues[index]);
        }
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50; // Adjust speed by changing denominator
        const duration = 2000; // 2 seconds
        const stepTime = duration / 50;
        
        // Reset counter to 0
        counter.textContent = '0';
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, stepTime);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(19, 52, 59, 0.98)';
    } else {
        navbar.style.background = 'rgba(19, 52, 59, 0.95)';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-name, .hero-title, .hero-subtitle, .hero-tagline, .hero-buttons');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Add scroll-based animations for project cards
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        projectObserver.observe(card);
    });
}

// Add hover effects for interactive elements
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
        btn.style.transform = 'translateY(-2px)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
        btn.style.transform = 'translateY(0)';
    }
});

// Enhanced form validation with real-time feedback
function enhanceFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Remove existing error styling
    clearFieldError(field);
    
    if (!value) {
        isValid = false;
        message = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`;
    } else if (field.type === 'email' && !isValidEmail(value)) {
        isValid = false;
        message = 'Please enter a valid email address';
    }
    
    if (!isValid) {
        showFieldError(field, message);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = 'var(--color-error)';
    
    let errorEl = field.parentNode.querySelector('.field-error');
    if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'field-error';
        errorEl.style.color = 'var(--color-error)';
        errorEl.style.fontSize = 'var(--font-size-sm)';
        errorEl.style.marginTop = 'var(--space-4)';
        errorEl.style.display = 'block';
        field.parentNode.appendChild(errorEl);
    }
    
    errorEl.textContent = message;
}

function clearFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';
    const errorEl = field.parentNode.querySelector('.field-error');
    if (errorEl) {
        errorEl.remove();
    }
}

// Add project card interaction enhancements
function initProjectCardInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            this.style.boxShadow = 'var(--shadow-lg), 0 0 20px rgba(var(--color-primary-rgb), 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });
}

// Initialize project card interactions after DOM is loaded
setTimeout(initProjectCardInteractions, 1000);

// Add skill progress animation on scroll
function initSkillProgressAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width + '%';
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
}

// Initialize skill animations
setTimeout(initSkillProgressAnimations, 500);

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add responsive navigation improvements
function initResponsiveNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', debounce(function() {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }, 250));
}

// Initialize responsive navigation
initResponsiveNav();

// Add typing animation for mobile
function adjustTypingForMobile() {
    if (window.innerWidth <= 480) {
        const typingText = document.querySelector('.typing-text');
        if (typingText) {
            // Disable typing animation on mobile for better readability
            typingText.style.animation = 'none';
            typingText.style.borderRight = 'none';
            typingText.style.whiteSpace = 'normal';
            typingText.style.overflow = 'visible';
        }
    }
}

// Check mobile on load and resize
window.addEventListener('load', adjustTypingForMobile);
window.addEventListener('resize', debounce(adjustTypingForMobile, 250));