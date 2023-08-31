const productsContainer = document.querySelector('.products');
const cart = document.querySelector('.cart');
const itemCountElement = document.getElementById('item-count');
const totalAmountElement = document.getElementById('total-amount');
const locationElement = document.getElementById('location'); 

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
    "price": 900,
    "image": "imagenes/case.png"
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
    <p>Precio: Q${product.price.toFixed(2)}</p>
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
    const productNameMatch = draggedItemHTML.match(/<h3>(.*?)<\/h3>/);
    
    if (productNameMatch && productNameMatch.length >= 2) {
      const productName = productNameMatch[1];
    
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = draggedItemHTML;
      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.className = 'quantity-input';
      quantityInput.value = 1;  // Set quantity to 1 by default
      quantityInput.min = 1;
      quantityInput.max = 10;
      quantityInput.addEventListener('input', updateTotal);
      productElement.appendChild(quantityInput);
      this.appendChild(productElement);
      
      productsInCart.set(productName, productElement);
      
      itemCountElement.textContent = parseInt(itemCountElement.textContent) + 1;
      
      const price = parseFloat(draggedItemHTML.match(/Precio: Q(\d+\.\d+)/)[1]);
      totalAmountElement.textContent = `$${(parseFloat(totalAmountElement.textContent.replace('$', '')) + price).toFixed(2)}`;
      
      // Update the total after adding the new product
      updateTotal();
    }
  }
  
  

function updateTotal() {
  const productsInCartArray = Array.from(productsInCart.values());
  let totalCount = 0;
  let totalPrice = 0;

  productsInCartArray.forEach(product => {
    const price = parseFloat(product.querySelector('p').textContent.match(/Q(\d+\.\d+)/)[1]);
    const quantity = parseInt(product.querySelector('.quantity-input').value);
    totalCount += quantity;
    totalPrice += price * quantity;
  });

  itemCountElement.textContent = totalCount;
  totalAmountElement.textContent = `$${totalPrice.toFixed(2)}`;


  const saveCartButton = document.getElementById('save-cart');
  saveCartButton.addEventListener('click', function() {
    const productsInCartArray = Array.from(productsInCart.values()).map(productElement => {
      const product = {
        image: productElement.querySelector('img').src,
        name: productElement.querySelector('h3').textContent,
        price: parseFloat(productElement.querySelector('p').textContent.match(/Q(\d+\.\d+)/)[1]),
        quantity: parseInt(productElement.querySelector('.quantity-input').value)
      };
      return product;
    });
    localStorage.setItem('cartProducts', JSON.stringify(productsInCartArray));
    alert('Carrito guardado en Local Storage.');
  });  
  }
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          locationElement.textContent = `Ubicación: Latitud ${latitude}, Longitud ${longitude}`;
        },
        error => {
          locationElement.textContent = 'No se pudo obtener la ubicación';
        }
      );
    } else {
      locationElement.textContent = 'La geolocalización no está disponible en este navegador';
    }
  }
  
  // Llamamos a la función para obtener la ubicación
  getLocation();
