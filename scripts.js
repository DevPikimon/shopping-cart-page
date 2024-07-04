document.addEventListener('DOMContentLoaded', function() {
    const cart = [
      {
        id: 1,
        image: 'https://via.placeholder.com/100',
        title: 'Cozy Blanket',
        price: 29.99,
        quantity: 1
      },
      {
        id: 2,
        image: 'https://via.placeholder.com/100',
        title: 'Autumn Mug',
        price: 12.99,
        quantity: 1
      },
      {
        id: 3,
        image: 'https://via.placeholder.com/100',
        title: 'Fall Fragrance Candle',
        price: 16.99,
        quantity: 1
      }
    ];
  
    let promoCode = '';
  
    function renderCart() {
      const cartItemsContainer = document.getElementById('cart-items');
      cartItemsContainer.innerHTML = '';
      
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <div class="cart-item-details">
            <h3>${item.title}</h3>
            <p>$${item.price.toFixed(2)}</p>
          </div>
          <div class="cart-item-actions">
            <button class="icon-button" onclick="handleQuantityChange(${item.id}, ${item.quantity - 1})" ${item.quantity === 1 ? 'disabled' : ''}>-</button>
            <span>${item.quantity}</span>
            <button class="icon-button" onclick="handleQuantityChange(${item.id}, ${item.quantity + 1})">+</button>
            <button class="icon-button" onclick="handleRemoveItem(${item.id})">x</button>
          </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
      });
  
      renderOrderSummary();
    }
  
    function handleQuantityChange(id, quantity) {
      if (quantity < 1) return; // Prevent quantity from going below 1
      const item = cart.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      renderCart();
    }
  
    function handleRemoveItem(id) {
      const itemIndex = cart.findIndex(item => item.id === id);
      if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
      }
      renderCart();
    }
  
    function calculateTotal() {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }
  
    function handlePromoCodeChange(e) {
      promoCode = e.target.value;
    }
  
    function renderOrderSummary() {
      const orderSummaryContainer = document.getElementById('order-summary');
      orderSummaryContainer.innerHTML = `
        <div>
          <span>Subtotal</span>
          <span>$${calculateTotal()}</span>
        </div>
        <div>
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div class="promo-code">
          <span>Promo Code</span>
          <div class="promo-code-actions">
            <input type="text" placeholder="Enter code" value="${promoCode}" oninput="handlePromoCodeChange(event)">
            <button class="text-button">Apply</button>
          </div>
        </div>
        <div>
          <span>Total</span>
          <span>$${calculateTotal()}</span>
        </div>
        <div class="checkout-buttons">
          <button class="text-button">Continue Shopping</button>
          <button class="blue-button">Proceed to Checkout</button>
        </div>
      `;
    }
  
    window.handleQuantityChange = handleQuantityChange;
    window.handleRemoveItem = handleRemoveItem;
    window.handlePromoCodeChange = handlePromoCodeChange;
  
    renderCart();
  });
  