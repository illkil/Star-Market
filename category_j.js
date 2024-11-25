document.addEventListener('DOMContentLoaded', () => {
  let cart = {};

  const checkboxes = document.querySelectorAll('.select-product');
  if (checkboxes.length > 0) {
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const product = checkbox.getAttribute('data-product');
        if (checkbox.checked) {
          cart[product] = { quantity: 1, price: parseFloat(checkbox.getAttribute('data-price')) };
        } else {
          delete cart[product];
        }
        console.log(cart);
      });
    });
  } else {
    console.warn('No checkboxes found for product selection.');
  }

  const quantityButtons = document.querySelectorAll('.quantity-btn');
  if (quantityButtons.length > 0) {
    quantityButtons.forEach(button => {
      button.addEventListener('click', () => {
        const product = button.closest('.product').querySelector('.select-product').getAttribute('data-product');
        const action = button.getAttribute('data-action');

        if (cart[product]) {
          if (action === 'increase') {
            cart[product].quantity++;
          } else if (action === 'decrease' && cart[product].quantity > 1) {
            cart[product].quantity--;
          }

          button.closest('.product').querySelector('.quantity').textContent = cart[product].quantity;
        }

        console.log(cart);
      });
    });
  } else {
    console.warn('No quantity buttons found.');
  }

  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        const product = button.getAttribute('data-product');
        const quantityElement = document.querySelector(`[data-product="${product}"] .quantity`);

        if (cart[product] && quantityElement) {
          alert(`Added ${cart[product].quantity} x ${product} to the cart`);
          
          let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
          let existingProduct = storedCart.find(item => item.product === product);

          if (existingProduct) {
            existingProduct.quantity += cart[product].quantity;
          } else {
            storedCart.push({ product, quantity: cart[product].quantity, price: cart[product].price });
          }

          localStorage.setItem('cart', JSON.stringify(storedCart));
          console.log('Cart saved to Local Storage:', storedCart);

          window.location.href = 'cart.html';
        } else {
          alert('Please select a product first or check if quantity element exists.');
        }
      });
    });
  } else {
    console.warn('No "Add to Cart" buttons found.');
  }
});
