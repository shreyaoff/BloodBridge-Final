// ===== Search Donor =====
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("resultsContainer");

searchBtn.addEventListener("click", function () {
  const selectedGroup = document.getElementById("searchBloodGroup").value;
  const enteredDistrict = document.getElementById("searchDistrict").value.trim().toLowerCase();

  // get all donors saved in localStorage
  const donors = JSON.parse(localStorage.getItem("donors")) || [];

  // filter donors based on the selected blood group and district
  const matchingDonors = donors.filter(function (donor) {
    let groupMatches = true;
    let districtMatches = true;

    if (selectedGroup !== "") {
      groupMatches = donor.bloodGroup === selectedGroup;
    }

    if (enteredDistrict !== "") {
      districtMatches = donor.district.toLowerCase().includes(enteredDistrict);
    }

    return groupMatches && districtMatches;
  });

  // clear old results
  resultsContainer.innerHTML = "";

  if (matchingDonors.length === 0) {
    resultsContainer.innerHTML = "<p class='no-results'>No matching donors found. Try different filters.</p>";
    return;
  }

  // create a card for each matching donor
  matchingDonors.forEach(function (donor) {
    const card = document.createElement("div");
    card.classList.add("donor-card");

    card.innerHTML =
      "<span class='donor-bg'>" + donor.bloodGroup + "</span>" +
      "<h3>" + donor.fullName + "</h3>" +
      "<p>District: " + donor.district + "</p>" +
      "<p>Contact: " + donor.contact + "</p>";

    resultsContainer.appendChild(card);
  });
});

fetch("hospitals.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (hospitals) {
    $("#hospitalsGrid").empty();
    for (var i = 0; i < hospitals.length; i++) {
      var h = hospitals[i];
      var card = "<div class='hospital-card'>" +
        "<h3>" + h.name + "</h3>" +
        "<p>📍 " + h.address + "</p>" +
        "<p>📞 " + h.contact + "</p>" +
        "<span class='hospital-type'>" + h.type + "</span>" +
        "</div>";
      $("#hospitalsGrid").append(card);
    }
  })
  .catch(function () {
    $("#hospitalsGrid").html("<p>Could not load hospital data.</p>");
  });
