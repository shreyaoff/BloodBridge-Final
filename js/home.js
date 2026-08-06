var currentSlide = 0;
var totalSlides = $(".slide").length;

function buildDots() {
  for (var i = 0; i < totalSlides; i++) {
    var dot = $("<span></span>");
    if (i === 0) dot.addClass("active");
    dot.attr("data-index", i);
    $("#sliderDots").append(dot);
  }
}

function goToSlide(index) {
  currentSlide = index;
  $("#sliderTrack").css("transform", "translateX(-" + (currentSlide * 100) + "%)");
  $("#sliderDots span").removeClass("active");
  $("#sliderDots span").eq(currentSlide).addClass("active");
}

buildDots();

$("#sliderDots").on("click", "span", function () {
  goToSlide($(this).data("index"));
});

setInterval(function () {
  goToSlide((currentSlide + 1) % totalSlides);
}, 4000);

// Blood Availability (plain JavaScript, no AngularJS needed) =====
function renderBloodAvailability() {
  var grid = document.getElementById("bloodGrid");
  if (!grid) {
    return;
  }

  var donors = JSON.parse(localStorage.getItem("donors")) || [];
  var groupNames = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  var html = "";

  for (var i = 0; i < groupNames.length; i++) {
    var count = 0;
    for (var j = 0; j < donors.length; j++) {
      if (donors[j].bloodGroup === groupNames[i]) {
        count++;
      }
    }

    html +=
      "<div class='blood-card'>" +
      "<p class='blood-type'>" + groupNames[i] + "</p>" +
      "<p class='blood-count'>" + count + "</p>" +
      "<p class='blood-label'>Donors</p>" +
      "</div>";
  }

  grid.innerHTML = html;
}

renderBloodAvailability();

