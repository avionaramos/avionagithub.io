document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Check if any image is already enlarged
            if (document.querySelector('.gallery-item.enlarged')) {
                return; // If an image is already enlarged, do nothing
            }

            // Enlarge the clicked item
            item.classList.add('enlarged');
            gallery.classList.add('gallery-blur');
        });

        const closeButton = item.querySelector('.close-button');
        closeButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering the click event on the gallery-item
            item.classList.remove('enlarged');
            gallery.classList.remove('gallery-blur');
        });
    });

    // Add fade-out effect to navigation links
    const navigationLinks = document.querySelectorAll('header .links a');
    navigationLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const targetUrl = event.target.href;

            document.body.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500); // Duration should match the CSS transition duration
        });
    });
});
