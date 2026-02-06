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
        // Try to play with sound on load
        vslVideo.muted = false;
        soundToggle.classList.add('unmuted');
        
        var playPromise = vslVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(function() {
                // Browser blocked autoplay with sound, fall back to muted
                vslVideo.muted = true;
                soundToggle.classList.remove('unmuted');
                vslVideo.play();
            });
        }
        
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
    // Testimonial Videos - Sound Toggle
    // ================================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        const video = card.querySelector('video');
        const soundToggle = card.querySelector('.testimonial-sound-toggle');
        
        if (video && soundToggle) {
            soundToggle.addEventListener('click', function() {
                if (video.muted) {
                    // Mute all other videos first
                    testimonialCards.forEach(otherCard => {
                        const otherVideo = otherCard.querySelector('video');
                        const otherToggle = otherCard.querySelector('.testimonial-sound-toggle');
                        if (otherVideo !== video) {
                            otherVideo.muted = true;
                            if (otherToggle) otherToggle.classList.remove('unmuted');
                        }
                    });
                    
                    video.muted = false;
                    soundToggle.classList.add('unmuted');
                } else {
                    video.muted = true;
                    soundToggle.classList.remove('unmuted');
                }
            });
        }
    });

    // ================================================
    // Auto-play Testimonial Videos on Scroll (staggered, muted)
    // ================================================
    const videoAutoplayObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            const soundToggle = entry.target.querySelector('.testimonial-sound-toggle');
            
            if (entry.isIntersecting && video) {
                // Small delay based on card index for staggered effect
                const cardIndex = Array.from(testimonialCards).indexOf(entry.target);
                const delay = cardIndex * 200; // 200ms stagger
                
                setTimeout(() => {
                    video.muted = true;
                    video.play().catch(() => {});
                }, delay);
            } else if (!entry.isIntersecting && video) {
                // Pause and mute when out of view
                video.pause();
                video.muted = true;
                if (soundToggle) {
                    soundToggle.classList.remove('unmuted');
                }
            }
        });
    }, { threshold: 0.3 });
    
    testimonialCards.forEach(card => {
        videoAutoplayObserver.observe(card);
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
