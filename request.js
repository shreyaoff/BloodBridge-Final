// ===== Blood Request Form =====
const requestForm = document.getElementById("requestForm");

requestForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // get all the input values
  const reqName = document.getElementById("reqName").value.trim();
  const reqBloodGroup = document.getElementById("reqBloodGroup").value;
  const reqLocation = document.getElementById("reqLocation").value.trim();
  const reqContact = document.getElementById("reqContact").value.trim();

  // clear old error messages
  document.getElementById("reqNameError").textContent = "";
  document.getElementById("reqBloodGroupError").textContent = "";
  document.getElementById("reqLocationError").textContent = "";
  document.getElementById("reqContactError").textContent = "";
  document.getElementById("reqSuccessMsg").textContent = "";

  let isValid = true;

  // check full name is not empty
  if (reqName === "") {
    document.getElementById("reqNameError").textContent = "Please enter your full name.";
    isValid = false;
  }

  // check blood group is selected
  if (reqBloodGroup === "") {
    document.getElementById("reqBloodGroupError").textContent = "Please select the required blood group.";
    isValid = false;
  }

  // check location is not empty
  if (reqLocation === "") {
    document.getElementById("reqLocationError").textContent = "Please enter a location or hospital name.";
    isValid = false;
  }

  // check contact number format (10 digit number starting with 9)
  const contactPattern = /^9[0-9]{9}$/;
  if (reqContact === "") {
    document.getElementById("reqContactError").textContent = "Please enter your contact number.";
    isValid = false;
  } else if (!contactPattern.test(reqContact)) {
    document.getElementById("reqContactError").textContent = "Enter a valid 10 digit number starting with 9.";
    isValid = false;
  }

  // stop here if any field failed validation
  if (!isValid) {
    return;
  }

  // build the request object
  const newRequest = {
    fullName: reqName,
    bloodGroup: reqBloodGroup,
    location: reqLocation,
    contact: reqContact
  };

  // get existing requests from localStorage, add the new one, save it back
  const requests = JSON.parse(localStorage.getItem("requests")) || [];
  requests.push(newRequest);
  localStorage.setItem("requests", JSON.stringify(requests));

  // show confirmation message and reset the form
  document.getElementById("reqSuccessMsg").textContent = "Your blood request has been submitted.";
  requestForm.reset();
});
