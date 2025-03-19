document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded Successfully!');

    initNavbar();
    initTooltips();
    initPopovers();
    initSmoothScroll();
    initHeroCarousel();
    initNewsletterForm();
    initLazyLoading();
    initAnimationOnScroll();
    initMobileMenuToggle();
    initSearchModal();
    initModalTriggers();
});

// ✅ Initialize Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            navbar.classList.toggle('scrolled', currentScroll > 50);
            if (currentScroll > lastScroll) {
                navbar.classList.add('scroll-down');
                navbar.classList.remove('scroll-up');
            } else {
                navbar.classList.add('scroll-up');
                navbar.classList.remove('scroll-down');
            }
            lastScroll = currentScroll;
        });
    }
}

// ✅ Initialize Bootstrap Tooltips
function initTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
}

// ✅ Initialize Bootstrap Popovers
function initPopovers() {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach(el => new bootstrap.Popover(el));
}

// ✅ Smooth Scroll for Internal Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ✅ Hero Slider/Carousel
function initHeroCarousel() {
    const heroCarousel = document.querySelector('#heroCarousel');
    if (heroCarousel) {
        new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            pause: 'hover',
            wrap: true
        });
    }
}

// ✅ Newsletter Form Submission
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('Newsletter form submitted');
        });
    }
}

// ✅ Lazy Loading with Intersection Observer
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => observer.observe(img));
    } else {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ✅ Animation on Scroll
function initAnimationOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const animateOnScroll = () => {
        elements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight) {
                element.classList.add('animated');
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial trigger
}

// ✅ Mobile Menu Toggle
function initMobileMenuToggle() {
    const mobileMenuToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (mobileMenuToggle && navbarCollapse) {
        mobileMenuToggle.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
        });
        document.addEventListener('click', (e) => {
            if (!navbarCollapse.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });
    }
}

// ✅ Search Modal
function initSearchModal() {
    const searchIcon = document.querySelector('.fa-search');
    const searchModalElement = document.getElementById('searchModal');
    if (searchIcon && searchModalElement) {
        const searchModal = new bootstrap.Modal(searchModalElement, { keyboard: true });
        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            searchModal.show();
        });
    }
}

// ✅ Bootstrap Modal Triggers
function initModalTriggers() {
    const modalTriggerList = document.querySelectorAll('[data-bs-toggle="modal"]');
    modalTriggerList.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetModal = document.querySelector(trigger.getAttribute('data-bs-target'));
            if (targetModal) {
                const modal = new bootstrap.Modal(targetModal);
                modal.show();
            }
        });
    });
}

// ✅ Send Email with mailto:
function sendEmail(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:nirvana.boutique.01@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailtoLink;
}
document.addEventListener('DOMContentLoaded', () => {
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');

    quickViewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const category = button.getAttribute('data-category');
            const description = button.getAttribute('data-description');
            const image = button.getAttribute('data-image');

            // Fill modal with product details
            document.getElementById('quick-view-name').textContent = name;
            document.getElementById('quick-view-category').textContent = category;
            document.getElementById('quick-view-description').textContent = description;
            document.getElementById('quick-view-image').src = image;
            document.getElementById('quick-view-image').alt = name;

            // Show modal
            const quickViewModal = new bootstrap.Modal(document.getElementById('quickViewModal'));
            quickViewModal.show();
        });
    });
});
