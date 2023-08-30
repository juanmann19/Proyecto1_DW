const productsContainer = document.querySelector('.products');
const cart = document.querySelector('.cart');
const itemCountElement = document.getElementById('item-count');
const totalAmountElement = document.getElementById('total-amount');
const productsData = [
  {
    "name": "Pan",
    "price": 2.5,
    "image": "images/pan.jpg"
  },
  {
    "name": "Leche",
    "price": 1.8,
    "image": "images/leche.jpg"
  },
  {
    "name": "Huevos",
    "price": 3.0,
    "image": "images/huevos.jpg"
  },
  {
    "name": "Frutas",
    "price": 8.5,
    "image": "images/frutas.jpg"
  }
];

const productsInCart = new Map();

productsData.forEach(product => {
  const productElement = document.createElement('div');
  productElement.classList.add('product');
  productElement.draggable = true;
  productElement.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>Precio: $${product.price.toFixed(2)}</p>
  `;
  productsContainer.appendChild(productElement);
  
  productElement.addEventListener('dragstart', dragStart);
});

cart.addEventListener('dragover', dragOver);
cart.addEventListener('dragenter', dragEnter);
cart.addEventListener('dragleave', dragLeave);
cart.addEventListener('drop', drop);

function dragStart(e) {
  const productName = this.querySelector('h3').textContent;
  if (!productsInCart.has(productName)) {
    e.dataTransfer.setData('text/html', this.outerHTML);
  }
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('hovered');
}

function dragLeave() {
  this.classList.remove('hovered');
}

function drop(e) {
  e.preventDefault();
  this.classList.remove('hovered');
  
  const draggedItemHTML = e.dataTransfer.getData('text/html');
  const productName = draggedItemHTML.match(/<h3>(.*?)<\/h3>/)[1];
  
  if (!productsInCart.has(productName)) {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = draggedItemHTML;
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.className = 'quantity-input';
    quantityInput.value = 1;
    quantityInput.addEventListener('input', updateTotal);
    productElement.appendChild(quantityInput);
    this.appendChild(productElement);
    
    productsInCart.set(productName, productElement);
    
    itemCountElement.textContent = parseInt(itemCountElement.textContent) + 1;
    
    const price = parseFloat(draggedItemHTML.match(/Precio: \$(\d+\.\d+)/)[1]);
    totalAmountElement.textContent = `$${(parseFloat(totalAmountElement.textContent.replace('$', '')) + price).toFixed(2)}`;
  }
}

function updateTotal() {
  const productsInCartArray = Array.from(productsInCart.values());
  let totalCount = 0;
  let totalPrice = 0;

  productsInCartArray.forEach(product => {
    const price = parseFloat(product.querySelector('p').textContent.match(/\$(\d+\.\d+)/)[1]);
    const quantity = parseInt(product.querySelector('.quantity-input').value);
    totalCount += quantity;
    totalPrice += price * quantity;
  });

  itemCountElement.textContent = totalCount;
  totalAmountElement.textContent = `$${totalPrice.toFixed(2)}`;
}
