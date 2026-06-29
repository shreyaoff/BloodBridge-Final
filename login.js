const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  document.getElementById("loginUsernameError").textContent = "";
  document.getElementById("loginPasswordError").textContent = "";
  document.getElementById("loginSuccessMsg").textContent = "";

  let isValid = true;

  if (username === "") {
    document.getElementById("loginUsernameError").textContent = "Please enter your username.";
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
  const accountExists = users.some(function (user) {
    return user.username === username;
  });

  if (!accountExists) {
    window.location.href = "signup.html";
    return;
  }

  const matchedUser = users.find(function (user) {
    return user.username === username && user.password === password;
  });

  if (!matchedUser) {
    document.getElementById("loginPasswordError").textContent = "Incorrect password.";
    return;
  }

  localStorage.setItem("loggedInUser", username);
  document.getElementById("loginSuccessMsg").textContent = "Login successful. Redirecting...";

  setTimeout(function () {
    window.location.href = "index.html";
  }, 1000);
});
