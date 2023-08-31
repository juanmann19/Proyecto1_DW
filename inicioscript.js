const productContainer = document.getElementById('product-list');

const productsData = [
  {
    "name": "Monitor Asus Gaming G324",
    "price": 2500,
    "image": "imagenes/Monitor.jpg"
  },
  {
    "name": "Teclado Gaming HyperX Alloy",
    "price": 1200,
    "image": "imagenes/teclado.jpg"
  },
  {
    "name": "Marvo Mouse Gaming Inalambrico M728W",
    "price": 800,
    "image": "imagenes/mouse.jpg"
  },
  {
    "name": "Case Gamer Tikal J3 Con RGB",
    "price": 945,
    "image": "imagenes/case.png"
  }
];

// Mostrar productos
productsData.forEach(product => {
  const productElement = document.createElement('div');
  productElement.classList.add('product');
  productElement.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>Precio: Q${product.price.toFixed(2)}</p>
  `;
  productContainer.appendChild(productElement);
});
