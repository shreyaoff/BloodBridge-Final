const proceedBtn = document.getElementById("proceedBtn");

proceedBtn.addEventListener("click", function () {
  localStorage.setItem("acceptedTerms", "true");
  window.location.href = "signup.html";
});
