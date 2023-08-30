const productsContainer = document.querySelector('.products');
const cart = document.getElementById('cart');
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

const itemCountElement = document.getElementById('item-count');
const totalAmountElement = document.getElementById('total-amount');

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
  e.dataTransfer.setData('text/html', this.outerHTML);
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
  this.insertAdjacentHTML('beforeend', draggedItemHTML);
  
  itemCountElement.textContent = ++itemCountElement.textContent;
  
  const price = parseFloat(draggedItemHTML.match(/Precio: \$(\d+\.\d+)/)[1]);
  totalAmountElement.textContent = `$${(parseFloat(totalAmountElement.textContent.replace('$', '')) + price).toFixed(2)}`;
}
