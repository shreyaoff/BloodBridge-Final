const requestForm = document.getElementById("requestForm");

requestForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const reqName = document.getElementById("reqName").value.trim();
  const reqBloodGroup = document.getElementById("reqBloodGroup").value;
  const reqLocation = document.getElementById("reqLocation").value.trim();
  const reqContact = document.getElementById("reqContact").value.trim();

  document.getElementById("reqNameError").textContent = "";
  document.getElementById("reqBloodGroupError").textContent = "";
  document.getElementById("reqLocationError").textContent = "";
  document.getElementById("reqContactError").textContent = "";
  document.getElementById("reqSuccessMsg").textContent = "";

  let isValid = true;

  if (reqName === "") {
    document.getElementById("reqNameError").textContent = "Please enter your full name.";
    isValid = false;
  }

  if (reqBloodGroup === "") {
    document.getElementById("reqBloodGroupError").textContent = "Please select the required blood group.";
    isValid = false;
  }

  if (reqLocation === "") {
    document.getElementById("reqLocationError").textContent = "Please enter a location or hospital name.";
    isValid = false;
  }

  const contactPattern = /^9[0-9]{9}$/;
  if (reqContact === "") {
    document.getElementById("reqContactError").textContent = "Please enter your contact number.";
    isValid = false;
  } else if (!contactPattern.test(reqContact)) {
    document.getElementById("reqContactError").textContent = "Enter a valid 10 digit number starting with 9.";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const newRequest = {
    fullName: reqName,
    bloodGroup: reqBloodGroup,
    location: reqLocation,
    contact: reqContact
  };

  const requests = JSON.parse(localStorage.getItem("requests")) || [];
  requests.push(newRequest);
  localStorage.setItem("requests", JSON.stringify(requests));

  document.getElementById("reqSuccessMsg").textContent = "Your blood request has been submitted.";
  requestForm.reset();
});
