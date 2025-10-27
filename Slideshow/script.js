// Set variables for the slideshow
var slideIndex = 1;
var slides = document.getElementsByClassName("slideshow");
var dots = document.getElementsByClassName("dot");

// Show the first slide and dot
showSlides(slideIndex);

// Functions to show the current slide and dot
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;

  // If the slide index is out of range, set it to 1
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all slides and dots
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Show the current slide and dot
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Functions to move to the next/previous slide
function nextSlide() {
  showSlides((slideIndex += 1));
}

function prevSlide() {
  showSlides((slideIndex -= 1));
}
document.getElementById("next").onclick = function () {
  nextSlide();
};

document.getElementById("previous").onclick = function () {
  prevSlide();
};

setInterval(function () {
  nextSlide();
}, 5000);
