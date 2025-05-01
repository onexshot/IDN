const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });

  if (close) {
    close.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  }
}

// Add to Cart functionality

// Function to get cart items from localStorage
function getCartItems() {
  const items = localStorage.getItem('cartItems');
  return items ? JSON.parse(items) : [];
}

// Function to save cart items to localStorage
function saveCartItems(items) {
  localStorage.setItem('cartItems', JSON.stringify(items));
}

// Function to add item to cart
function addItemToCart(item) {
  let items = getCartItems();
  // Check if item already exists in cart
  const existingIndex = items.findIndex(i => i.name === item.name);
  if (existingIndex !== -1) {
    // Update quantity if exists
    items[existingIndex].quantity += item.quantity;
  } else {
    items.push(item);
  }
  saveCartItems(items);
  alert(item.name + " added to cart!");
}

// Event listener for "Add to Cart" button on product page
const addToCartBtn = document.querySelector('.single-pro-details button.normal');
if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    const productName = document.querySelector('.single-pro-details h4:nth-of-type(2)').textContent.trim();
    const productPriceText = document.querySelector('.single-pro-details h2').textContent.trim();
    const productPrice = parseFloat(productPriceText.replace(/[₹,]/g, '')) || 0;
    const productImage = document.querySelector('.single-pro-image #MainImg').src;
    const quantityInput = document.querySelector('.single-pro-details input[type="number"]');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

    if (quantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }

    const item = {
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: quantity
    };

    addItemToCart(item);
  });
}

// Event listeners for cart icons in featured products section
const featuredCartIcons = document.querySelectorAll('#product1 .pro a i.cart');
featuredCartIcons.forEach(icon => {
  icon.addEventListener('click', (e) => {
    e.preventDefault();
    const proDiv = icon.closest('.pro');
    if (!proDiv) return;

    const productName = proDiv.querySelector('.des h5').textContent.trim();
    const productPriceText = proDiv.querySelector('.des h4').textContent.trim();
    const productPrice = parseFloat(productPriceText.replace(/[₹,]/g, '')) || 0;
    const productImage = proDiv.querySelector('img').src;
    const quantity = 1;

    const item = {
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: quantity
    };

    addItemToCart(item);
  });
});
