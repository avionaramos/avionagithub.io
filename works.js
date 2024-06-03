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
                const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
                
                scrollbarThumb.style.left = `${boundedPosition}px`;
                imageList.scrollLeft = scrollPosition;
            }
    
            // Remove event listeners on mouse up
            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            }
    
            // Add event listeners for drag interaction
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        });
    
        // Slide images according to the slide button clicks
        slideButtons.forEach(button => {
            button.addEventListener("click", () => {
                const direction = button.id === "prev-slide" ? -1 : 1;
                const scrollAmount = imageList.clientWidth * direction;
                imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
            });
        });
    
         // Show or hide slide buttons based on scroll position
        const handleSlideButtons = () => {
            slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
            slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
        }
    
        // Update scrollbar thumb position based on image scroll
        const updateScrollThumbPosition = () => {
            const scrollPosition = imageList.scrollLeft;
            const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
            scrollbarThumb.style.left = `${thumbPosition}px`;
        }
    
        // Call these two functions when image list scrolls
        imageList.addEventListener("scroll", () => {
            updateScrollThumbPosition();
            handleSlideButtons();
        });
    }
    
    window.addEventListener("resize", initSlider);
    window.addEventListener("load", initSlider);

    document.addEventListener("DOMContentLoaded", function () {
        // Function to add the fade-out class and navigate after a delay
        function handleNavigation(event) {
            event.preventDefault();
            const targetUrl = event.currentTarget.getAttribute("href");
    
            document.body.classList.add("fade-out");
    
            setTimeout(function () {
                window.location.href = targetUrl;
            }, 500); // Match this duration with the CSS transition duration
        }
    
        // Attach event listeners to all navigation and social media links
        const navLinks = document.querySelectorAll("a");
        navLinks.forEach(function (link) {
            link.addEventListener("click", handleNavigation);
        });
});
});
