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

// ===== Emergency Button (runs on every page) =====
// takes the user straight to the Request Blood page
const emergencyBtn = document.getElementById("emergencyBtn");

emergencyBtn.addEventListener("click", function () {
  window.location.href = "request.html";
});
