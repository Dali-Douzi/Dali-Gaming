const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");
const navLogo = document.querySelector("#navbar__logo");

// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

if (menu) {
  menu.addEventListener('click', mobileMenu);
}

// Show active menu when scrolling
const highlightMenu = () => {
  const elem = document.querySelector(".highlight");
  const homeMenu = document.querySelector("#home-page");
  const aboutMenu = document.querySelector("#categories-page");
  const servicesMenu = document.querySelector("#services-page");
  let scrollPos = window.scrollY;

  // adds 'highlight' class to my menu items
  if (window.innerWidth > 960 && scrollPos < 600) {
    if (homeMenu) homeMenu.classList.add("highlight");
    if (aboutMenu) aboutMenu.classList.remove("highlight");
    return;
  } else if (window.innerWidth > 960 && scrollPos < 1400) {
    if (aboutMenu) aboutMenu.classList.add("highlight");
    if (homeMenu) homeMenu.classList.remove("highlight");
    if (servicesMenu) servicesMenu.classList.remove("highlight");
    return;
  } else if (window.innerWidth > 960 && scrollPos < 2345) {
    if (servicesMenu) servicesMenu.classList.add("highlight");
    if (aboutMenu) aboutMenu.classList.remove("highlight");
    return;
  }

  if ((elem && window.innerWidth < 960 && scrollPos < 600) || elem) {
    elem.classList.remove("highlight");
  }
};

window.addEventListener("scroll", highlightMenu);
window.addEventListener("click", highlightMenu);

//  Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
  const menuBars = document.querySelector(".is-active");
  if (window.innerWidth <= 768 && menuBars) {
    menu.classList.toggle("is-active");
    menuLinks.classList.remove("active");
  }
};

if (menuLinks) {
  menuLinks.addEventListener("click", hideMobileMenu);
}

if (navLogo) {
  navLogo.addEventListener("click", hideMobileMenu);
}

// SLIDESHOW
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  if (slides.length > 0) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].className += " active";
    }
    setTimeout(showSlides, 2000); // Change image every 2 seconds
  }
}

/*FORM VALIDATION*/
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get form values
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validate form
    if (firstname === "") {
      alert("First name is required!");
      return false;
    }
    
    if (lastname === "") {
      alert("Last name is required!");
      return false;
    }
    
    if (email === "") {
      alert("Email is required!");
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return false;
    }
    
    if (password === "") {
      alert("Password is required!");
      return false;
    }
    
    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return false;
    }
    
    if (confirmPassword === "") {
      alert("Please confirm your password!");
      return false;
    }
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return false;
    }

    // If all validations pass
    alert("Sign up successful! Welcome " + firstname + " " + lastname + "!");
    console.log("Form submitted:");
    console.log("Name: " + firstname + " " + lastname);
    console.log("Email: " + email);
    
    // Reset the form
    signupForm.reset();
    
    return false;
  });
}