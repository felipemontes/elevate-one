/**
 * ELEVATE BY RAM - Main JavaScript
 * Landing Page Interactions
 */

(function() {
    'use strict';

    // ================================================
    // Floating Navigation Bar
    // ================================================
    const floatingBar = document.getElementById('floatingBar');
    const scrollThreshold = 500;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            floatingBar.classList.add('visible');
        } else {
            floatingBar.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ================================================
    // Intersection Observer for Animations
    // ================================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        animationObserver.observe(el);
    });

    // ================================================
    // Smooth Scroll for Anchor Links
    // ================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================================
    // Video Player - Sound Toggle
    // ================================================
    const vslVideo = document.getElementById('vslVideo');
    const soundToggle = document.getElementById('soundToggle');
    
    if (vslVideo && soundToggle) {
        soundToggle.addEventListener('click', function() {
            if (vslVideo.muted) {
                vslVideo.muted = false;
                soundToggle.classList.add('unmuted');
            } else {
                vslVideo.muted = true;
                soundToggle.classList.remove('unmuted');
            }
        });
    }

    // ================================================
    // Testimonial Videos Play/Pause
    // ================================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        const video = card.querySelector('video');
        const playBtn = card.querySelector('.play-testimonial');
        
        if (video && playBtn) {
            playBtn.addEventListener('click', function() {
                if (video.paused) {
                    // Pause all other testimonial videos
                    testimonialCards.forEach(otherCard => {
                        const otherVideo = otherCard.querySelector('video');
                        const otherBtn = otherCard.querySelector('.play-testimonial');
                        if (otherVideo !== video && !otherVideo.paused) {
                            otherVideo.pause();
                            otherVideo.muted = true;
                            otherBtn.classList.remove('playing');
                        }
                    });
                    
                    video.muted = false;
                    video.play();
                    playBtn.classList.add('playing');
                } else {
                    video.pause();
                    video.muted = true;
                    playBtn.classList.remove('playing');
                }
            });
            
            // Show play button again when video ends
            video.addEventListener('ended', function() {
                playBtn.classList.remove('playing');
                video.muted = true;
            });
        }
    });

    // ================================================
    // FAQ Accordion (Optional Enhancement)
    // ================================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Initially show all answers (no accordion behavior by default)
        // Uncomment below to enable accordion behavior:
        
        /*
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
        answer.style.opacity = '0';
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.opacity = '0';
                }
            });
            
            // Toggle current item
            if (isOpen) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
            }
        });
        */
    });

    // ================================================
    // Preload Images for Better Performance
    // ================================================
    const imagesToPreload = [
        'images/fire-therapy.jpg',
        'images/ice-bath.jpg',
        'images/lake-navigation.jpg',
        'images/healthy-food.jpg',
        'images/networking.jpg'
    ];

    function preloadImages(imageArray) {
        imageArray.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Preload after page load
    window.addEventListener('load', () => {
        preloadImages(imagesToPreload);
    });

    // ================================================
    // Track CTA Button Clicks (Analytics Ready)
    // ================================================
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            // Google Analytics 4 event (if configured)
            if (typeof gtag === 'function') {
                gtag('event', 'cta_click', {
                    'button_text': buttonText,
                    'page_location': window.location.href
                });
            }
            
            // Facebook Pixel event (if configured)
            if (typeof fbq === 'function') {
                fbq('track', 'Lead', {
                    content_name: buttonText
                });
            }
        });
    });

    // ================================================
    // Console Message
    // ================================================
    console.log('%c ELEVATE BY RAM ', 'background: linear-gradient(135deg, #10b981, #059669); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
    console.log('%c La expansion se vive, no se teoriza ', 'color: #9ca3af; font-size: 12px;');

})();
