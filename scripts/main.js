document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = document.lastModified;

const courses = [
  { name: "CSE 110", completed: true, credits: 3 },
  { name: "WDD 130", completed: false, credits: 3 },
  { name: "CSE 111", completed: true, credits: 4 },
  { name: "CSE 210", completed: false, credits: 3 },
  { name: "WDD 131", completed: true, credits: 3 },
  { name: "WDD 231", completed: false, credits: 3 },
];
  
function displayCourses(filter = "all") {
  const courseList = document.getElementById("courseList");
  courseList.innerHTML = ""; // Clear existing content

  let totalCredits = 0;

  courses
    .filter(course => filter === "all" || course.name.startsWith(filter))
    .forEach(course => {
      const courseDiv = document.createElement("div");
      courseDiv.textContent = `${course.name} - ${course.credits} Credits`;
      courseDiv.className = course.completed ? "completed" : "incomplete";

      if (course.completed) {
        const checkmark = document.createElement("span");
        checkmark.textContent = " ✔";
        checkmark.style.color = "green";
        courseDiv.appendChild(checkmark);
      }

      courseList.appendChild(courseDiv);
      totalCredits += course.credits;
    });

  document.getElementById("totalCredits").textContent = totalCredits;
}

const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll("nav a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
  
displayCourses(); // Initial load
  