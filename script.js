// Co-opBank IT Center Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('.lg\\:hidden');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            // This would toggle a mobile menu in a real implementation
            console.log('Mobile menu would open here');
        });
    }

    // Marquee animation for partners
    const marquee = document.querySelector('.marquee');
    if (marquee) {
        marquee.innerHTML += marquee.innerHTML; // Duplicate content for seamless looping
    }

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

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Form validation and submission
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Reset previous error states
            [name, email, message].forEach(field => {
                if (field) {
                    field.classList.remove('border-red-500');
                }
            });
            
            // Validate required fields
            if (name && !name.value.trim()) {
                name.classList.add('border-red-500');
                isValid = false;
            }
            
            if (email && !email.value.trim()) {
                email.classList.add('border-red-500');
                isValid = false;
            } else if (email && !isValidEmail(email.value)) {
                email.classList.add('border-red-500');
                isValid = false;
            }
            
            if (message && !message.value.trim()) {
                message.classList.add('border-red-500');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                showNotification('Cảm ơn bạn đã gửi yêu cầu! Chúng tôi sẽ liên hệ lại sớm nhất.', 'success');
                contactForm.reset();
            } else {
                showNotification('Vui lòng điền đầy đủ thông tin bắt buộc.', 'error');
            }
        });
    }

    // Newsletter subscription form
    const newsletterForm = document.querySelector('footer form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                showNotification('Cảm ơn bạn đã đăng ký nhận bản tin!', 'success');
                emailInput.value = '';
            }
        });
    }

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card-hover, .news-card, .stats-card').forEach(el => {
        observer.observe(el);
    });

    // Add counter animation for stats
    const statsSection = document.querySelector('.stats-card');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
});

// Helper Functions

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    // Set styles based on type
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="mr-2">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.stats-card .text-5xl');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number
            let displayValue = Math.floor(current);
            if (counter.textContent.includes('+')) {
                displayValue += '+';
            } else if (counter.textContent.includes('%')) {
                displayValue += '%';
            } else if (counter.textContent.includes('M')) {
                displayValue = (current / 1000000).toFixed(1) + 'M+';
            }
            
            counter.textContent = displayValue;
        }, 16);
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .border-red-500 {
        border-color: #ef4444 !important;
    }
`;
document.head.appendChild(style); 