// Dark mode toggle functionality
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark');
  
  // Store preference in localStorage
  const isDarkMode = body.classList.contains('dark');
  localStorage.setItem('darkMode', isDarkMode);
}

// Check for saved dark mode preference
function checkDarkModePreference() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  const body = document.body;
  
  if (isDarkMode) {
    body.classList.add('dark');
  }
}

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('hidden');
  }
}

// Initialize the website
function initWebsite() {
  // Check for dark mode preference on page load
  checkDarkModePreference();
  
  // Add event listener for dark mode toggle
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
  
  // Add event listener for mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
  }
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add active class to current page in navigation
  setActiveNavigation();
}

// Set active class to current page in navigation
function setActiveNavigation() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Add to cart functionality
function addToCart(itemName, price) {
  // Create or update cart in localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if item already exists in cart
  const existingItemIndex = cart.findIndex(item => item.name === itemName);
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({
      name: itemName,
      price: price,
      quantity: 1
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart count in UI
  updateCartCount();
  
  // Show confirmation message
  alert(`${itemName} ถูกเพิ่มลงในตะกร้าเรียบร้อยแล้ว!`);
}

// Update cart count display
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.querySelector('.cart-count');
  
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', initWebsite);

// Add review submission functionality
function submitReview() {
  const reviewText = document.getElementById('review-text').value;
  const reviewRating = document.getElementById('review-rating').value;
  
  if (reviewText.trim() === '') {
    alert('กรุณากรอกข้อความรีวิว');
    return;
  }
  
  if (!reviewRating) {
    alert('กรุณาเลือกคะแนนรีวิว');
    return;
  }
  
  // Here you would typically send the review to a server
  // For now, we'll just show an alert
  alert('ขอบคุณสำหรับรีวิวของคุณ!');
  
  // Reset the form
  document.getElementById('review-form').reset();
}

// Add event listeners for "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const itemName = this.getAttribute('data-name');
      const price = parseFloat(this.getAttribute('data-price'));
      addToCart(itemName, price);
    });
  });
});