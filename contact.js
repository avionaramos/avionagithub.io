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
