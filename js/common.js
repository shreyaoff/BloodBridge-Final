// ===== Dark Mode Toggle (runs on every page) =====
const darkModeBtn = document.getElementById("darkModeBtn");
darkModeBtn.textContent = localStorage.getItem("darkMode") === "on" ? "☀️" : "🌙";

// load saved dark mode setting
if (localStorage.getItem("darkMode") === "on") {
  document.body.classList.add("dark-mode");
}

darkModeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "on");
    darkModeBtn.textContent = "☀️";
  } else {
    localStorage.setItem("darkMode", "off");
    darkModeBtn.textContent = "🌙";
  }
});

// ===== Hamburger Menu Toggle (runs on every page) =====
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    hamburgerBtn.classList.toggle("open");
    hamburgerBtn.setAttribute("aria-expanded", isOpen);
  });
}
