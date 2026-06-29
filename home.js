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

$("#nextBtn").on("click", function () {
  var next = (currentSlide + 1) % totalSlides;
  goToSlide(next);
});

$("#prevBtn").on("click", function () {
  var prev = (currentSlide - 1 + totalSlides) % totalSlides;
  goToSlide(prev);
});

$("#sliderDots").on("click", "span", function () {
  goToSlide($(this).data("index"));
});

setInterval(function () {
  goToSlide((currentSlide + 1) % totalSlides);
}, 4000);

var donors = JSON.parse(localStorage.getItem("donors")) || [];

$(".blood-count").each(function () {
  var group = $(this).data("group");
  var count = 0;
  for (var i = 0; i < donors.length; i++) {
    if (donors[i].bloodGroup === group) count++;
  }
  $(this).text(count);
});
