const proceedBtn = document.getElementById("proceedBtn");
const agreeCheck = document.getElementById("agreeCheck");

// the "I Agree" button turns green only when the checkbox is ticked
agreeCheck.addEventListener("change", function () {
  if (agreeCheck.checked) {
    proceedBtn.classList.add("enabled");
    proceedBtn.disabled = false;
  } else {
    proceedBtn.classList.remove("enabled");
    proceedBtn.disabled = true;
  }
});

proceedBtn.addEventListener("click", function () {
  if (!agreeCheck.checked) {
    return;
  }
  localStorage.setItem("acceptedTerms", "true");
  window.location.href = "signup.html";
});
