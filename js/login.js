const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  document.getElementById("loginUsernameError").textContent = "";
  document.getElementById("loginEmailError").textContent = "";
  document.getElementById("loginPasswordError").textContent = "";
  document.getElementById("loginSuccessMsg").textContent = "";

  let isValid = true;

  if (username === "") {
    document.getElementById("loginUsernameError").textContent = "Please enter your username.";
    isValid = false;
  }

  if (email === "") {
    document.getElementById("loginEmailError").textContent = "Please enter your email.";
    isValid = false;
  }

  if (password === "") {
    document.getElementById("loginPasswordError").textContent = "Please enter your password.";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Admin account - the only one who can view the Donor List
  if (
    username === "shreya" &&
    email === "shreyaaaoff60@gmail.com" &&
    password === "Shreya@1121"
  ) {
    localStorage.setItem("loggedInUser", "shreya");
    localStorage.setItem("isAdmin", "true");
    document.getElementById("loginSuccessMsg").textContent = "Admin login successful. Redirecting...";

    setTimeout(function () {
      window.location.href = "donors.html";
    }, 1000);
    return;
  }

  let accountExists = false;
  let matchedUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      accountExists = true;
      if (users[i].email === email && users[i].password === password) {
        matchedUser = users[i];
      }
    }
  }

  if (!accountExists) {
    window.location.href = "signup.html";
    return;
  }

  if (!matchedUser) {
    document.getElementById("loginPasswordError").textContent = "Incorrect email or password.";
    return;
  }

  localStorage.setItem("loggedInUser", username);
  localStorage.setItem("isAdmin", "false");
  document.getElementById("loginSuccessMsg").textContent = "Login successful. Redirecting...";

  setTimeout(function () {
    window.location.href = "../index.html";
  }, 1000);
});
