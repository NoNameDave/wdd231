document.addEventListener("DOMContentLoaded", async () => {
    const spotlightContainer = document.getElementById("spotlight-cards");
    const weatherContainer = document.getElementById("weather-info");

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
    const response = await fetch("../chamber/data/members.json");
    const members = await response.json();

    const membershipLevels = {
        1: "Member",
        2: "Silver",
        3: "Gold"
    };

    // Spotlight Members Function
    const renderSpotlight = () => {
        const spotlightCandidates = members.filter(
            member => member.membership_level === 2 || member.membership_level === 3
        );

        const shuffled = spotlightCandidates.sort(() => 0.5 - Math.random());
        const selectedSpotlights = shuffled.slice(0, 2);

        spotlightContainer.innerHTML = selectedSpotlights.map(member => `
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
    };

    // Fetch weather data
    const fetchWeatherData = async () => {
        const apiKey = '92ea5c2e29da4bf6bcde4063dfdef644'; // Your API key
        const cityId = '993800'; // Your city ID for Timbuktu
        const url = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Display current weather
            const currentTemp = data.list[0].main.temp;
            const currentDesc = data.list[0].weather[0].description;
            weatherContainer.innerHTML = `
                <p><strong>Current Temperature:</strong> ${currentTemp}°C</p>
                <p><strong>Condition:</strong> ${currentDesc}</p>
            `;

            // Extract and display 3-day forecast
            const forecast = data.list.filter((_, index) => index % 8 === 0).slice(1, 4);
            forecast.forEach((day, i) => {
                const date = new Date(day.dt_txt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                });
                const dayTemp = day.main.temp;
                const dayDesc = day.weather[0].description;

                weatherContainer.innerHTML += `
                    <div class="forecast">
                        <p><strong>${date}:</strong> ${dayTemp}°C, ${dayDesc}</p>
                    </div>
                `;
            });
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherContainer.innerHTML = '<p>Unable to fetch weather data. Please try again later.</p>';
        }
    };

    // Call fetchWeatherData and renderSpotlight on page load
    fetchWeatherData();
    renderSpotlight();
});