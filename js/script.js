(function () {
    emailjs.init("vCKSc3VokDoZUjDKd"); // your Public Key
})();

$(document).ready(function () {

    var owl = $(".portfolio-carousel");

    owl.owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        center: false,
        responsive: {
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 3 }
        }
    });

    // Custom next/prev buttons
    $(".portfolio-next").click(function () {
        owl.trigger('next.owl.carousel');
    });

    $(".portfolio-prev").click(function () {
        owl.trigger('prev.owl.carousel');
    });

    $(".portfolio-card").on("click", function (e) {
        $(this).toggleClass("tapped");
        e.preventDefault();
    });


    // === NEW: Owl Carousel for Testimonials ===
    $(".testimonials-carousel").owlCarousel({
        loop: true,
        margin: 25,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        autoHeight: false,
        responsive: {
            0: { items: 1 },
            768: { items: 3 }
        }
    });

    // === Original: Smooth scroll to section ===
    $("nav a[href^='#']").on('click', function (e) {
        e.preventDefault();
        var target = this.hash;
        $('html, body').animate({
            scrollTop: $(target).offset().top - 70
        }, 800);

        // Enhancement: smooth-close mobile menu after clicking a link
        var navMenu = $('#nav-menu ul');
        if (navMenu.hasClass('show')) {
            navMenu.removeClass('show').addClass('closing');
            $('#hamburger').attr('aria-expanded', 'false');
            setTimeout(() => {
                navMenu.removeClass('closing');
            }, 400); // matches CSS transition duration
        }
    });

    // === Original: AOS Init ===
    AOS.init({
        duration: 1000,
        once: true
    });

    // === Original: Hamburger Toggle with animation (enhanced with ARIA) ===
    // Add accessibility attributes without changing your HTML
    $('#hamburger').attr({
        'aria-label': 'Toggle navigation menu',
        'role': 'button',
        'tabindex': '0',
        'aria-controls': 'nav-menu',
        'aria-expanded': 'false'
    });

    $('#hamburger').on('click', function () {
        let navMenu = $('#nav-menu ul');

        if (navMenu.hasClass('show')) {
            // Closing animation
            navMenu.removeClass('show').addClass('closing');
            $('#hamburger').attr('aria-expanded', 'false');
            setTimeout(() => {
                navMenu.removeClass('closing');
            }, 400); // matches transition duration
        } else {
            // Opening animation
            navMenu.addClass('show');
            $('#hamburger').attr('aria-expanded', 'true');
        }
    });

    // Enhancement: Keyboard support for hamburger (Enter/Space)
    $('#hamburger').on('keydown', function (e) {
        const key = e.key || e.which;
        if (key === 'Enter' || key === ' ' || key === 13 || key === 32) {
            e.preventDefault();
            $('#hamburger').trigger('click');
        }
    });

    // Enhancement: Add shadow to navbar on scroll
    const $navBar = $('.navbar');
    const addShadowOnScroll = () => {
        if ($(window).scrollTop() > 10) {
            $navBar.addClass('scrolled');
        } else {
            $navBar.removeClass('scrolled');
        }
    };
    addShadowOnScroll();
    $(window).on('scroll', addShadowOnScroll);

    // Enhancement: Close mobile menu when resizing to desktop
    $(window).on('resize', function () {
        if (window.innerWidth > 768) {
            const navMenu = $('#nav-menu ul');
            navMenu.removeClass('show closing');
            $('#hamburger').attr('aria-expanded', 'false');
        }
    });

    // === EmailJS Contact Form ===

    function showPopup(message) {
        document.getElementById("popup-message").textContent = message;
        document.getElementById("popup").style.display = "flex";
    }

    document.getElementById("popup-close").addEventListener("click", () => {
        document.getElementById("popup").style.display = "none";
    });

    // ✅ Safe form selector
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            emailjs.sendForm("service_uujq8h6", "template_0ir66g5", this)
                .then(() => {
                    document.querySelector(".form-message").textContent = "✅ Message sent successfully!";
                    document.querySelector(".form-message").className = "form-message success";
                    showPopup("✅ Your message has been sent successfully!");
                    this.reset();
                }, (err) => {
                    document.querySelector(".form-message").textContent = "❌ Failed to send. Try again later.";
                    document.querySelector(".form-message").className = "form-message error";
                    showPopup("❌ Failed to send. Please try again later.");
                    console.error("EmailJS error:", err);
                });
        });
    }


});

/* Page intro loader: paper printing -> expand -> reveal site */
(function () {
    const preloader = document.getElementById('preloader');
    const paper = document.getElementById('loader-paper');
    const printerBody = document.querySelector('.printer-body');
    const heroTitle = document.querySelector('.hero-title'); // ✅ grab hero title

    // Start sequence after window load (so images/fonts are ready).
    window.addEventListener('load', () => {
        // small delay so user perceives "arrival"
        setTimeout(startPrintSequence, 200);
    });

    function startPrintSequence() {
        if (!paper || !preloader) return finishImmediately();

        // Step 1: trigger "printing" (paper slides out)
        paper.classList.add('printing');
        printerBody && printerBody.classList.add('printing');

        // after paper is out, pause shortly then expand to reveal
        setTimeout(() => {
            // Step 2: expand paper to fill screen
            paper.classList.remove('printing');
            printerBody && printerBody.classList.remove('printing');

            // move paper to absolute layer and expand
            paper.classList.add('expand');

            // ✅ show image when expand starts
            const expandImage = document.getElementById('expand-image');
            if (expandImage) expandImage.style.opacity = "1";

            // ✅ wait for expand animation to finish
            paper.addEventListener('animationend', onExpandDone, { once: true });
        }, 2000); // matches paper "printing" animation
    }

    function onExpandDone() {
        // Fade out preloader
        preloader.classList.add('hidden');

        // ✅ Trigger hero title animation
        heroTitle && heroTitle.classList.add('animate-in');

        // Optional: completely remove node from DOM after transition for performance
        setTimeout(() => {
            try {
                preloader.parentNode && preloader.parentNode.removeChild(preloader);
            } catch (e) { }
        }, 600);
    }

    function finishImmediately() {
        // In case something goes wrong, remove preloader
        preloader && preloader.classList.add('hidden');
        heroTitle && heroTitle.classList.add('animate-in'); // ✅ still show hero
        setTimeout(() => {
            try {
                preloader && preloader.parentNode && preloader.parentNode.removeChild(preloader);
            } catch (e) { }
        }, 400);
    }

    // If user clicks anywhere on loader, skip animation and reveal instantly
    document.getElementById('preloader')?.addEventListener('click', finishImmediately);
})();



// === GA4 Custom Event Tracking for Clicks ===
(function () {
    function trackClick(selector, eventName) {
        document.querySelectorAll(selector).forEach(el => {
            el.addEventListener('click', () => {
                if (typeof gtag === 'function') {
                    gtag('event', eventName, {
                        event_category: 'engagement',
                        event_label: el.textContent || el.href || eventName
                    });
                    console.log('GA4 Event:', eventName, '->', el);
                }
            });
        });
    }

    // Track phone number clicks
    trackClick("a[href^='tel:']", "phone_click");

    // Track email clicks
    trackClick("a[href^='mailto:']", "email_click");

    // Track WhatsApp clicks (assuming WhatsApp links contain wa.me or api.whatsapp.com)
    trackClick("a[href*='wa.me'], a[href*='api.whatsapp.com']", "whatsapp_click");

    // Track Facebook clicks
    trackClick("a[href*='facebook.com']", "facebook_click");

    // Track Instagram clicks
    trackClick("a[href*='instagram.com']", "instagram_click");

    // Track Reviews clicks automatically (links containing "g.page" or "review")
    trackClick("a[href*='g.page'], a[href*='review']", "reviews_click");

    // Track Floating WhatsApp Button separately
    trackClick(".whatsapp-float", "whatsapp_float_click");


})();
