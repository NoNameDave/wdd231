// JavaScript for Navigation Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
  
    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("open");
        });
    }
  });
  
  // Dynamic Year and Last Modified Date
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
  
  // Dynamic Product Filtering
  const products = [
    { name: "Birthday Card - Balloons", category: "birthday" },
    { name: "Holiday Card - Snowflakes", category: "holiday" },
    { name: "Thank You Card - Floral", category: "all" },
    { name: "Love Card - Hearts", category: "all" }
  ];
  
  function displayProducts(filter = "all") {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
  
    products
      .filter(product => filter === "all" || product.category === filter)
      .forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.textContent = product.name;
        productList.appendChild(productDiv);
      });
  }
  
  displayProducts();