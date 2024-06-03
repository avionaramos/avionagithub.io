document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader");
    const greetings = document.querySelectorAll(".greeting");
    let currentGreeting = 0;

    // Image reveal on hover
    const links = document.querySelectorAll('.link');
    const hoverReveals = document.querySelectorAll('.hover-reveal');
    const linkImages = document.querySelectorAll('.hidden-img');

    links.forEach((link, index) => {
        link.addEventListener('mousemove', (e) => {
            const linkRect = link.getBoundingClientRect();
            const revealRect = hoverReveals[index].getBoundingClientRect();

            // Calculate the position to place the hover image
            const offsetX = e.clientX - linkRect.left - revealRect.width / 2;
            const offsetY = e.clientY - linkRect.top - revealRect.height / 2;

            hoverReveals[index].style.opacity = 1;
            hoverReveals[index].style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1)`;
            linkImages[index].style.transform = `scale(1,1)`;
        });

        link.addEventListener('mouseleave', () => {
            hoverReveals[index].style.opacity = 0;
            hoverReveals[index].style.transform = `translate(0, 0) scale(0.5)`;
            linkImages[index].style.transform = `scale(0.8,0.8)`;
        });
    });

    const initSlider = () => {
        const imageList = document.querySelector(".slider-wrapper .image-list");
        const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
        const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
        const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
        const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

        // Handle scrollbar thumb drag
        scrollbarThumb.addEventListener("mousedown", (e) => {
            const startX = e.clientX;
            const thumbPosition = scrollbarThumb.offsetLeft;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            // Update thumb position on mouse move
            const handleMouseMove = (e) => {
                const deltaX = e.clientX - startX;
                const newThumbPosition = thumbPosition + deltaX;

                // Ensure the scrollbar thumb stays within bounds
                const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));

                // Update the thumb position
                scrollbarThumb.style.left = `${boundedPosition}px`;

                // Calculate the corresponding scroll position
                const scrollFraction = boundedPosition / maxThumbPosition;
                const newScrollLeft = scrollFraction * maxScrollLeft;

                // Scroll the image list
                imageList.scrollLeft = newScrollLeft;
            };

            // Remove mouse move event listener on mouse up
            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        });

        slideButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const increment = button.classList.contains("prev") ? -300 : 300;
                const newScrollLeft = imageList.scrollLeft + increment;
                imageList.scrollTo({ left: newScrollLeft, behavior: "smooth" });

                // Calculate the scrollbar thumb position
                const thumbPosition = (newScrollLeft / maxScrollLeft) * 100;
                scrollbarThumb.style.left = `${thumbPosition}%`;
            });
        });

        // Update the position of the scrollbar thumb on image list scroll
        imageList.addEventListener("scroll", () => {
            const scrollFraction = imageList.scrollLeft / maxScrollLeft;
            const thumbPosition = scrollFraction * 100;
            scrollbarThumb.style.left = `${thumbPosition}%`;
        });
    };

    // Initialize the slider when the DOM is fully loaded
    document.addEventListener("DOMContentLoaded", initSlider);

    // Function to show the preloader greetings in sequence
    function showNextGreeting() {
        if (currentGreeting > 0) {
            greetings[currentGreeting - 1].style.opacity = 0;
        }
        greetings[currentGreeting].style.opacity = 1;
        currentGreeting++;
        if (currentGreeting < greetings.length) {
            setTimeout(showNextGreeting, 150); // Shorter delay between greetings
        } else {
            setTimeout(() => {
                preloader.classList.add("fade-out");
                document.body.classList.add("animate-homepage"); // Trigger the homepage animation
                localStorage.setItem("preloaderShown", "true"); // Set preloader shown status
            }, 250); // Shorter delay before fading out
        }
    }

    function rotateSparkle(scrollTop) {
        const sparkle = document.querySelector('.sparkle');
        const rotation = scrollTop * 0.5; // Adjust rotation speed as needed
        gsap.to(sparkle, { rotation: rotation });
    }

    // Initial rotation of the sparkle based on the initial scroll position
    rotateSparkle(window.pageYOffset || document.documentElement.scrollTop);

    // Listen for scroll event to update the rotation of the sparkle
    window.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        rotateSparkle(scrollTop);
    });

    // Check if preloader has been shown before
    if (localStorage.getItem("preloaderShown") === "true" && sessionStorage.getItem("internalNavigation") === "true") {
        preloader.style.display = "none";
        document.body.classList.add("animate-homepage");
    } else {
        showNextGreeting();
    }

    // Initialize carousels
    const carouselElements = document.querySelectorAll(".splide");
    carouselElements.forEach((carouselElement) => {
        const splide = new Splide(carouselElement, {
            type: "loop",
            drag: false,
            autoWidth: true,
            gap: 30,
            pagination: false,
            arrows: false,
            autoScroll: {
                speed: 3,
                pauseOnHover: false,
            },
        });

        splide.mount(window.splide.Extensions);
    });

    // Handle scroll event for star rotation
    window.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const stars = document.querySelectorAll('.splide__slide img.star');
        stars.forEach((star) => {
            star.style.transform = `rotate(${scrollTop}deg)`;
        });

        // Rotate the star behind the "ABOUT ME" section
        const star = document.querySelector('.page2 .star');
        const aboutSection = document.querySelector('.page2');
        const aboutSectionTop = aboutSection.offsetTop;
        const aboutSectionHeight = aboutSection.clientHeight;
        const windowScrollTop = window.scrollY || window.pageYOffset;
        const starRotation = (windowScrollTop - aboutSectionTop) / aboutSectionHeight * 360;
        star.style.transform = `rotate(${starRotation}deg)`;
    });

    const homeLink = document.getElementById('home-link');
    const galleryLink = document.getElementById('gallery-link');
    const aboutLink = document.getElementById('about-link');
    const worksLink = document.getElementById('works-link');
    const contactLink = document.getElementById('contact-link');
    const logoLink = document.querySelector('.logo a');

    // Handle the navigation to homepage without showing preloader
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.add('fade-out');
        sessionStorage.setItem("internalNavigation", "true");
        setTimeout(() => {
            window.location.href = homeLink.href;
        }, 800); // Duration should match the CSS transition time
    });

    // Handle the navigation to gallery with fade-out effect
    galleryLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.add('fade-out');
        sessionStorage.setItem("internalNavigation", "true");
        setTimeout(() => {
            window.location.href = galleryLink.href;
        }, 800); // Duration should match the CSS transition time
    });

    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.add('fade-out');
        sessionStorage.setItem("internalNavigation", "true");
        setTimeout(() => {
            window.location.href = aboutLink.href;
        }, 800); // Duration should match the CSS transition time
    });

    worksLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.add('fade-out');
        sessionStorage.setItem("internalNavigation", "true");
        setTimeout(() => {
            window.location.href = worksLink.href;
        }, 800); // Duration should match the CSS transition time
    });

    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.add('fade-out');
        sessionStorage.setItem("internalNavigation", "true");
        setTimeout(() => {
            window.location.href = contactLink.href;
        }, 800); // Duration should match the CSS transition time
    });

    // Reset preloader state when logo is clicked
    logoLink.addEventListener('click', () => {
        localStorage.removeItem("preloaderShown");
        sessionStorage.removeItem("internalNavigation");
    });

    gsap.registerPlugin(ScrollTrigger);

    const galleryImages = document.querySelectorAll('.gallery .image-box');

    galleryImages.forEach((image, index) => {
        const directionClass = index < galleryImages.length / 2 ? 'left-slide' : 'right-slide';
        gsap.set(image, { className: directionClass });

        gsap.to(image, {
            opacity: 1,
            x: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: image,
                start: 'top 80%', // Adjust start point as needed
                end: 'top 20%', // Adjust end point as needed
                scrub: true,
                onEnter: () => image.classList.remove(directionClass),
                onLeaveBack: () => image.classList.add(directionClass)
            }
        });
    });

    // Initialize ScrollTrigger (to update in case of dynamic content changes)
    ScrollTrigger.refresh();

    // Initialize Splide slider with Auto Scroll extension for gallery
    const splideGallery = new Splide('.gallery', {
        type: 'loop',
        perPage: 4, // Adjust the number of visible images
        autoplay: true, // Enable auto scrolling
        pauseOnHover: false, // Disable pause on hover
        interval: 100, // Set the interval for auto scrolling in milliseconds
    });

    splideGallery.mount(window.splide.Extensions);
});
