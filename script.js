document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Loader functionality
    setTimeout(() => {
        loader.style.opacity = '0';
        mainContent.classList.remove('hidden');

        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);

    // Mobile menu functionality
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true' || false;

            mobileMenuBtn.setAttribute('aria-expanded', !expanded);
            navLinks.style.display = expanded ? 'none' : 'flex';

            // Animate menu button
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));

            // Reset dropdowns when closing menu
            if (navLinks.style.display === 'none') {
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            }
        });
    }

    // Dropdown functionality
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (trigger) {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth < 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 768 && navLinks.style.display === 'flex' && !e.target.closest('.nav')) {
            navLinks.style.display = 'none';
            mobileMenuBtn.setAttribute('aria-expanded', false);
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));

        }
    });

    function openNav() {
        document.getElementById("sideNav").classList.add("active");
    }

    function closeNav() {
        document.getElementById("sideNav").classList.remove("active");
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.visibility = 'hidden';
        observer.observe(element);
    });
});


// Slider functionality
document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const slider = document.querySelector(".slider");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    let currentIndex = 0;

    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSliderPosition();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSliderPosition();
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // Auto Slide every 5 seconds
    setInterval(nextSlide, 5000);
});


// mobileb nav
document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const dropdownTriggers = document.querySelectorAll(".dropdown > .dropdown-trigger");

    // Toggle mobile menu
    mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        mobileMenuBtn.classList.toggle("open");
    });

    // Handle dropdown click with smooth expand/collapse
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener("click", (event) => {
            event.preventDefault();
            
            let parent = trigger.parentElement;
            let submenu = parent.querySelector(".dropdown-menu");

            if (submenu.classList.contains("open")) {
                submenu.classList.remove("open");
                trigger.querySelector("svg").style.transform = "rotate(0deg)";
            } else {
                // Close all other dropdowns first
                document.querySelectorAll(".dropdown-menu").forEach(menu => menu.classList.remove("open"));
                document.querySelectorAll(".dropdown-trigger svg").forEach(icon => icon.style.transform = "rotate(0deg)");

                submenu.classList.add("open");
                trigger.querySelector("svg").style.transform = "rotate(180deg)";
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            navLinks.classList.remove("active");
            mobileMenuBtn.classList.remove("open");
            document.querySelectorAll(".dropdown-menu").forEach(menu => menu.classList.remove("open"));
            document.querySelectorAll(".dropdown-trigger svg").forEach(icon => icon.style.transform = "rotate(0deg)");
        }
    });
});

// ideology
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".sidebar ul li a");
    const panels = document.querySelectorAll(".content-panel");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            // Remove active class from all links
            links.forEach(item => item.classList.remove("active"));
            this.classList.add("active");

            // Hide all panels
            panels.forEach(panel => {
                panel.classList.remove("active");
                panel.style.left = "100%"; // Move out of view
            });

            // Show the selected panel
            const targetPanel = document.getElementById(this.dataset.target);
            if (targetPanel) {
                targetPanel.classList.add("active");
                targetPanel.style.left = "0"; // Move into view
            }
        });
    });
});


// Newsletter js for form validation
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !email) {
        Swal.fire({
            title: 'Error!',
            text: 'All fields are required.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        Swal.fire({
            title: 'Error!',
            text: 'Please enter a valid email address.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    Swal.fire({
        title: 'Subscribed!',
        text: 'You have successfully subscribed to our newsletter.',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(() => {
        document.getElementById('newsletter-form').reset();
        location.reload();
    });
});
