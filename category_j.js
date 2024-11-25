let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}



document.addEventListener('click', (event) => {
  if (event.target.classList.contains('quantity-btn')) {
    const action = event.target.dataset.action;
    const productId = event.target.closest('.product').querySelector('.add-to-cart').dataset.product;
    const quantitySpan = event.target.closest('.product').querySelector('.quantity');

    let quantity = parseInt(quantitySpan.textContent);

    if (action === 'increase') {
      quantity++;
    } else if (action === 'decrease' && quantity > 1) {
      quantity--;
    }

    quantitySpan.textContent = quantity;
  }
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart')) {
    const productElement = event.target.closest('.product');
    const productId = event.target.dataset.product;
    const productName = productElement.querySelector('h2').textContent.trim();
    const productPrice = parseFloat(productElement.querySelector('p:nth-of-type(2)').textContent.replace('Price: SAR ', ''));
    const productQuantity = parseInt(productElement.querySelector('.quantity').textContent);
    const productImage = productElement.querySelector('img').src;
    const productDescription = productElement.querySelector('p:nth-of-type(1)').textContent.trim();

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
      existingProduct.quantity += productQuantity;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        image: productImage,
        description: productDescription,
      });
    }

    updateCartStorage();

    alert(`${productQuantity} x ${productName} added to the cart!`);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const sortSelect = document.getElementById('sort-options');
  const productList = document.querySelector('.product-list');
  const products = Array.from(productList.getElementsByClassName('product'));

  function sortByName(order) {
    return products.sort((a, b) => {
      const nameA = a.querySelector('h2').textContent.toUpperCase();
      const nameB = b.querySelector('h2').textContent.toUpperCase();

      if (order === 'name-a-z') {
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      } else if (order === 'name-z-a') {
        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      }
    });
  }

  function sortByPrice(order) {
    return products.sort((a, b) => {
      const priceA = parseFloat(a.querySelectorAll('p')[1].textContent.replace(/[^0-9.-]+/g, ''));
      const priceB = parseFloat(b.querySelectorAll('p')[1].textContent.replace(/[^0-9.-]+/g, ''));

      if (order === 'price-low-high') {
        return priceA - priceB;
      } else if (order === 'price-high-low') {
        return priceB - priceA;
      }
    });
  }

  function updateProductList(sortedProducts) {
    productList.innerHTML = '';
    sortedProducts.forEach(product => {
      productList.appendChild(product);
    });
  }

  sortSelect.addEventListener('change', (e) => {
    const sortValue = e.target.value;
    let sortedProducts;

    if (sortValue === 'price-low-high' || sortValue === 'price-high-low') {
      sortedProducts = sortByPrice(sortValue);
    } else if (sortValue === 'name-a-z' || sortValue === 'name-z-a') {
      sortedProducts = sortByName(sortValue);
    }

    updateProductList(sortedProducts);
  });

  function loadCart() {
    let MakeupCart = JSON.parse(localStorage.getItem('MakeupCart')) || [];
    console.log('Loaded MakeupCart:', MakeupCart);

    MakeupCart.forEach(item => {
      console.log(`Product: ${item.name}, Quantity: ${item.quantity}, Price: ${item.price}`);
    });
  }

  loadCart();
});

document.addEventListener('DOMContentLoaded', () => {
  const productList = document.querySelector('.product-list');
  const checkOutButton = document.createElement('button');

  checkOutButton.textContent = 'Add Selected to Cart';
  checkOutButton.id = 'checkout-button';
  checkOutButton.style.width = '120px'; 
  checkOutButton.style.height = '50px';
  checkOutButton.style.fontSize = '12px'; 
  checkOutButton.style.position = 'relative';
  checkOutButton.style.display = 'block'; 
  checkOutButton.style.margin = '10px auto';
  checkOutButton.style.cursor = 'pointer';
  checkOutButton.style.backgroundColor = '#214388'; 
  checkOutButton.style.color = '#fff'; 
  checkOutButton.style.border = 'none';
  checkOutButton.style.borderRadius = '5px'; 

  const footer = document.querySelector('footer');
  footer.parentNode.insertBefore(checkOutButton, footer);

  checkOutButton.addEventListener('click', () => {
    const checkedProducts = Array.from(productList.querySelectorAll('input[type="checkbox"]:checked'));
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    checkedProducts.forEach((checkbox) => {
      const productElement = checkbox.closest('.product');
      const productId = checkbox.dataset.product;
      const productName = productElement.querySelector('h2').textContent.trim();
      const productPrice = parseFloat(productElement.querySelector('p:nth-of-type(2)').textContent.replace('Price: SAR ', ''));
      const productQuantity = parseInt(productElement.querySelector('.quantity').textContent.trim());
      const productImage = productElement.querySelector('img').src;
      const productDescription = productElement.querySelector('p:nth-of-type(1)').textContent.trim();

      const existingProduct = cart.find((item) => item.id === productId);

      if (existingProduct) {
        existingProduct.quantity += productQuantity;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          quantity: productQuantity,
          image: productImage,
          description: productDescription,
        });
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Selected products have been added to your cart!');
  });
});
