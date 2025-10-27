const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");
const navLogo = document.querySelector("#navbar__logo");

// Cart array to store items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

// CART FUNCTIONALITY

// Function to add item to cart
function addToCart(productName, price, imageSrc) {
  const item = {
    id: Date.now(),
    name: productName,
    price: parseInt(price),
    image: imageSrc,
    quantity: 1
  };
  
  // Check if item already exists in cart
  const existingItem = cart.find(cartItem => cartItem.name === productName);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(item);
  }
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart display
  updateCartCount();
  updateCartDisplay();
  
  // Show confirmation
  alert(`${productName} has been added to your cart!`);
}

// Function to remove item from cart
function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  updateCartDisplay();
}

// Function to update quantity
function updateQuantity(itemId, change) {
  const item = cart.find(cartItem => cartItem.id === itemId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(itemId);
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartDisplay();
    }
  }
}

// Function to clear entire cart
function clearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
  }
}

// Function to update cart count in navbar
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

// Function to update cart display
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const clearCartBtn = document.getElementById('clear-cart-btn');
  
  if (!cartItemsContainer) return;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    if (cartTotal) cartTotal.textContent = '0DT';
    if (checkoutBtn) checkoutBtn.style.display = 'none';
    if (clearCartBtn) clearCartBtn.style.display = 'none';
    return;
  }
  
  let total = 0;
  let cartHTML = '';
  
  cart.forEach(item => {
    total += item.price * item.quantity;
    cartHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p class="cart-item-price">${item.price}DT</p>
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
        </div>
        <div class="cart-item-total">
          <p>${item.price * item.quantity}DT</p>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `;
  });
  
  cartItemsContainer.innerHTML = cartHTML;
  if (cartTotal) cartTotal.textContent = total + 'DT';
  if (checkoutBtn) checkoutBtn.style.display = 'block';
  if (clearCartBtn) clearCartBtn.style.display = 'block';
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  updateCartDisplay();
  
  // Add click event listeners to all "Add to Cart" buttons
  const addButtons = document.querySelectorAll('.addbutton');
  addButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('.product-name').textContent.trim();
      const priceText = productCard.querySelector('p').textContent.trim();
      const price = priceText.replace('DT', '').trim();
      const imageSrc = productCard.querySelector('img').src;
      
      addToCart(productName, price, imageSrc);
    });
  });
  
  // Clear cart button
  const clearCartBtn = document.getElementById('clear-cart-btn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }
  
  // Update current year in footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});