document.addEventListener("DOMContentLoaded", async () => {
    const directory = document.getElementById("directory");
    const toggleView = document.getElementById("toggleView");

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    // Toggle Navigation Menu
    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("open");
        });
    }

    // Dynamic Year and Last Modified Date
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    // Fetch member data
    const response = await fetch("/../chamber/data/members.json");
    const members = await response.json();

    // Membership Levels Mapping
    const membershipLevels = {
        1: "Member",
        2: "Silver",
        3: "Gold"
    };

    // Render Members Function
    const renderMembers = (viewType = "grid-view") => {
        // Clear directory content and apply the selected view
        directory.className = viewType;
        directory.innerHTML = members.map(member => `
          <div class="member-card">
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Membership Level:</strong> ${membershipLevels[member.membership_level]}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
          </div>
        `).join("");

        // Resize images after rendering
        const images = document.querySelectorAll(".member-card img");
        images.forEach((img) => {
            img.style.width = "100%"; // Adjust to fit the container
            img.style.height = "auto"; // Maintain aspect ratio
            img.style.objectFit = "cover"; // Optional: Ensure it fills the container without distortion
        });
    };

    // Toggle View
    toggleView.addEventListener("click", () => {
        const isGrid = directory.classList.contains("grid-view");
        renderMembers(isGrid ? "list-view" : "grid-view");
    });

    // Initial Render
    renderMembers("grid-view");
});