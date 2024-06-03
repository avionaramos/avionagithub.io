document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("a");

    links.forEach(link => {
        if (link.href && link.href.startsWith(window.location.origin)) {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const href = link.href;
                
                document.body.classList.add("fade-out");
                
                setTimeout(() => {
                    window.location.href = href;
                }, 800); // Match this duration with the transition duration in CSS
            });
        }
    });
});
