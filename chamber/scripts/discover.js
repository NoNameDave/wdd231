document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    
    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("open");
        });
    }
    
    // Dynamic Year and Last Modified Date
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    const visitMessage = document.getElementById("visitMessage");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetween = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysBetween < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysBetween} day${daysBetween > 1 ? 's' : ''} ago.`;
        }
    }
    
    localStorage.setItem("lastVisit", now);
    
    // Fetch JSON Data for Cards
    fetch("places.json")
        .then(response => response.json())
        .then(data => {
            const discoverGrid = document.querySelector(".discover-grid");
            
            data.places.forEach(place => {
                const card = document.createElement("div");
                card.classList.add("card");
                
                card.innerHTML = `
                    <img src="${place.image}" alt="${place.title}">
                    <h2>${place.title}</h2>
                    <address>${place.address}</address>
                    <p>${place.description}</p>
                    <button>Learn More</button>
                `;
                
                discoverGrid.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading places.json:", error));
    
    // Lazy loading images
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});