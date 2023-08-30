const displayProducts = document.getElementById('display-products');
const itemCountElement = document.getElementById('item-count');
const totalAmountElement = document.getElementById('total-amount');
const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

function updateTotals() {
  const updatedCartProducts = JSON.parse(localStorage.getItem('cartProducts'));
  let totalCount = 0;
  let totalPrice = 0;

  updatedCartProducts.forEach(product => {
    totalCount += product.quantity;
    totalPrice += product.price * product.quantity;
  });

  itemCountElement.textContent = totalCount;
  totalAmountElement.textContent = `$${totalPrice.toFixed(2)}`;
}

if (cartProducts) {
  cartProducts.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Precio: Q${product.price.toFixed(2)}</p>
      <p>Cantidad: ${product.quantity}</p>
      <button class="remove-button">Eliminar</button>
    `;
    displayProducts.appendChild(productElement);

    const removeButton = productElement.querySelector('.remove-button');
    removeButton.addEventListener('click', () => {
      const existingProducts = JSON.parse(localStorage.getItem('cartProducts'));
      const updatedProducts = existingProducts.filter(p => p.name !== product.name);
      localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
      productElement.remove();
      updateTotals(); // Actualizar totales después de eliminar
    });
  });

  updateTotals(); // Llamada inicial para mostrar los totales
}