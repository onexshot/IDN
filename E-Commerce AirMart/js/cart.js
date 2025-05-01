document.addEventListener('DOMContentLoaded', () => {
  const cartTable = document.querySelector('#cart table tbody');
  const cartSubtotalElem = document.querySelector('#subtotal table tr:first-child td:last-child');
  const cartTotalElem = document.querySelector('#subtotal table tr:last-child td strong');

  // Get cart items from localStorage or return empty array
  function getCartItems() {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
  }

  // Save cart items to localStorage
  function saveCartItems(items) {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }

  // Render cart items in the table
  function renderCartItems() {
    const items = getCartItems();
    console.log('Cart Items from localStorage:', items);
    cartTable.innerHTML = '';
    items.forEach((item, index) => {
      const row = document.createElement('tr');

      row.innerHTML = '<td><a href="#" class="remove-item" data-index="' + index + '"><i class="far fa-times-circle"></i></a></td>' +
                      '<td><img src="' + item.image + '" alt="' + item.name + '"></td>' +
                      '<td>' + item.name + '</td>' +
                      '<td>₹' + item.price + '</td>' +
                      '<td><input type="number" value="' + item.quantity + '" min="1" data-index="' + index + '"></td>' +
                      '<td>₹' + (item.price * item.quantity).toFixed(0) + '</td>';

      cartTable.appendChild(row);
    });

    attachEventListeners();
    updateCartTotal();
  }

  // Update cart total and subtotal
  function updateCartTotal() {
    let total = 0;
    cartTable.querySelectorAll('tr').forEach(row => {
      const priceElem = row.querySelector('td:nth-child(4) strong') || row.querySelector('td:nth-child(4)');
      const priceText = priceElem ? priceElem.textContent.trim() : '0';
      const price = parseFloat(priceText.replace(/[₹,]/g, '')) || 0;
      const quantity = parseInt(row.querySelector('td:nth-child(5) input').value) || 0;
      const subtotal = price * quantity;
      row.querySelector('td:nth-child(6)').textContent = '₹' + subtotal.toFixed(0);
      total += subtotal;
    });
    cartSubtotalElem.textContent = '₹' + total.toFixed(0);
    cartTotalElem.textContent = '₹' + total.toFixed(0);
  }

  // Remove cart item handler
  function removeCartItem(event) {
    event.preventDefault();
    const index = parseInt(event.target.closest('a').dataset.index);
    if (!isNaN(index)) {
      let items = getCartItems();
      items.splice(index, 1);
      saveCartItems(items);
      renderCartItems();
    }
  }

  // Quantity change handler
  function quantityChanged(event) {
    const input = event.target;
    let value = parseInt(input.value);
    if (isNaN(value) || value < 1) {
      value = 1;
      input.value = value;
    }
    const index = parseInt(input.dataset.index);
    if (!isNaN(index)) {
      let items = getCartItems();
      items[index].quantity = value;
      saveCartItems(items);
      updateCartTotal();
    }
  }

  // Attach event listeners to remove buttons and quantity inputs
  function attachEventListeners() {
    cartTable.querySelectorAll('a.remove-item').forEach(removeBtn => {
      removeBtn.addEventListener('click', removeCartItem);
    });

    cartTable.querySelectorAll('td:nth-child(5) input').forEach(input => {
      input.addEventListener('change', quantityChanged);
    });
  }

  // Initial render of cart items
  renderCartItems();
});
