$(".gallery-item").on("click", function () {
  var imgSrc = $(this).find("img").attr("src");
  var caption = $(this).data("caption");
  $("#lightboxImg").attr("src", imgSrc);
  $("#lightboxCaption").text(caption);
  $("#lightbox").addClass("open");
});

$("#lightboxClose, #lightboxOverlay").on("click", function () {
  $("#lightbox").removeClass("open");
});
