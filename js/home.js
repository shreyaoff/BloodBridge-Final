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
