const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("resultsContainer");

searchBtn.addEventListener("click", function () {
  const selectedGroup = document.getElementById("searchBloodGroup").value;
  const enteredDistrict = document.getElementById("searchDistrict").value.trim().toLowerCase();

  const donors = JSON.parse(localStorage.getItem("donors")) || [];
  const matchingDonors = [];

  for (let i = 0; i < donors.length; i++) {
    const donor = donors[i];
    let groupMatches = true;
    let districtMatches = true;

    if (selectedGroup !== "") {
      groupMatches = donor.bloodGroup === selectedGroup;
    }

    if (enteredDistrict !== "") {
      districtMatches = donor.district.toLowerCase().includes(enteredDistrict);
    }

    if (groupMatches && districtMatches) {
      matchingDonors.push(donor);
    }
  }

  resultsContainer.innerHTML = "";

  if (matchingDonors.length === 0) {
    resultsContainer.innerHTML = "<p class='no-results'>No matching donors found. Try different filters.</p>";
    return;
  }

  for (let i = 0; i < matchingDonors.length; i++) {
    const donor = matchingDonors[i];
    const card = document.createElement("div");
    card.classList.add("donor-card");

    card.innerHTML =
      "<span class='donor-bg'>" + donor.bloodGroup + "</span>" +
      "<h3>" + donor.fullName + "</h3>" +
      "<p>District: " + donor.district + "</p>" +
      "<p>Contact: " + donor.contact + "</p>";

    resultsContainer.appendChild(card);
  }
});

// ===== Nearby Hospitals (from data/hospitals.json) =====
function renderHospitals(hospitals) {
  $("#hospitalsGrid").empty();
  for (var i = 0; i < hospitals.length; i++) {
    var h = hospitals[i];
    var card = "<div class='hospital-card'>" +
      "<h3>" + h.name + "</h3>" +
      "<p><strong>Address:</strong> " + h.address + "</p>" +
      "<p><strong>Contact:</strong> " + h.contact + "</p>" +
      "<span class='hospital-type'>" + h.type + "</span>" +
      "</div>";
    $("#hospitalsGrid").append(card);
  }
}

// Try the JSON file first; if it cannot be loaded (e.g. when the site is
// opened straight from a folder), fall back to the bundled copy.
fetch("../data/hospitals.json")
  .then(function (response) {
    return response.json();
  })
  .then(renderHospitals)
  .catch(function () {
    renderHospitals(HOSPITALS_DATA);
  });
