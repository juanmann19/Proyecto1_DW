const displayProducts = document.getElementById('display-products');
const itemCountElement = document.getElementById('item-count');
const totalAmountElement = document.getElementById('total-amount');

const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

if (cartProducts) {
  cartProducts.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Precio: Q${product.price.toFixed(2)}</p>
      <p>Cantidad: ${product.quantity}</p>
    `;
    displayProducts.appendChild(productElement);
  });

  // Calcula el total de productos y el total de precios
  let totalCount = 0;
  let totalPrice = 0;

  cartProducts.forEach(product => {
    totalCount += product.quantity;
    totalPrice += product.price * product.quantity;
  });

  itemCountElement.textContent = totalCount;
  totalAmountElement.textContent = `Total: Q${totalPrice.toFixed(2)}`;
} else {
  displayProducts.innerHTML = '<p>No hay productos en el carrito.</p>';
  itemCountElement.textContent = '0';
  totalAmountElement.textContent = 'Total: Q0.00';
}
