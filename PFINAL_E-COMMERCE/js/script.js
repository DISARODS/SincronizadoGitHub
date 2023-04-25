

const productList = document.querySelector('.product-list');
const allCategoriesDiv = document.querySelector('.categorias-json');

const categoryIcons = {
  'Vegetables & Fruit': 'https://themes.pixelstrap.com/fastkart/assets/svg/1/vegetable.svg',
  'Frozen Foods': 'https://themes.pixelstrap.com/fastkart/assets/svg/1/frozen.svg',
  'Meats & Seafood': 'https://themes.pixelstrap.com/fastkart/assets/svg/1/meats.svg',
  'Biscuits & Snacks': 'https://themes.pixelstrap.com/fastkart/assets/svg/1/biscuit.svg',
  'Beverages': 'https://themes.pixelstrap.com/fastkart/assets/svg/1/cup.svg',
  'Grocery & Staples': 'https://themes.pixelstrap.com/fastkart/assets/svg/1/grocery.svg',
  'Breakfast & Dairy': 'https://themes.pixelstrap.com/fastkart/assets/svg/1/breakfast.svg',
  'Wines & Alcohol Drinks': 'https://themes.pixelstrap.com/fastkart/assets/svg/1/drink.svg'
};



if (productList && allCategoriesDiv) {
  async function fetchData() {
    
    try {

      const response = await fetch('http://localhost:3000/productos');
      const data = await response.json();

      const categorias = [...new Set(data.map(producto => producto.categoria))];

      for (const categoria of categorias) {
        const categoryIcon = document.createElement('img');
        categoryIcon.src = categoryIcons[categoria] || 'ruta-a-imagen-por-defecto';
        const categoryText = document.createElement('span');
        categoryText.textContent = categoria;
        const categoryContainer = document.createElement('li');
        categoryContainer.appendChild(categoryIcon);
        categoryContainer.appendChild(categoryText);
        categoryContainer.addEventListener('click', () => {
          const filteredProducts = data.filter(producto => producto.categoria === categoria);
          renderProducts(filteredProducts);
        });
        allCategoriesDiv.appendChild(categoryContainer);
      }

      renderProducts(data);

    } catch (error) {
      console.error(error);
    }
  }


  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


  function renderProducts(data) {
    productList.innerHTML = '';
    data.forEach(producto => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      const productImage = document.createElement('img');
      productImage.src = producto.imagen;
      productCard.appendChild(productImage);
      const productName = document.createElement('h2');
      productName.textContent = producto.nombre;
      productCard.appendChild(productName);
      const productPrice = document.createElement('p');
      productPrice.textContent = `$${producto.precio}`;
      productCard.appendChild(productPrice);
  
      const productCount = document.createElement('p');
      productCount.textContent = '0';
      productCount.classList.add('count');
  
      const subtractButton = document.createElement('button');
      subtractButton.textContent = '-';
      subtractButton.addEventListener('click', () => {
        const count = parseInt(productCount.textContent);
        if (count > 0) {
          productCount.textContent = count - 1;
  
          // Update cart
          const productIndex = carrito.findIndex(item => item.id === producto.id);
          if (productIndex !== -1) {
            carrito[productIndex].cantidad = count - 1;
            if (carrito[productIndex].cantidad === 0) {
              carrito.splice(productIndex, 1);
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
          }
        }
      });
  
      const addButton = document.createElement('button');
      addButton.textContent = '+';
      addButton.addEventListener('click', () => {
        const count = parseInt(productCount.textContent);
        productCount.textContent = count + 1;
  
        // Update cart
        const productIndex = carrito.findIndex(item => item.id === producto.id);
        if (productIndex === -1) {
          carrito.push({ ...producto, cantidad: 1 });
        } else {
          carrito[productIndex].cantidad = count + 1;
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
      });
  
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('buttons');
      buttonContainer.appendChild(subtractButton);
      buttonContainer.appendChild(productCount);
      buttonContainer.appendChild(addButton);
  
      const imageButton = document.createElement('button');
      const image = document.createElement('img');
      imageButton.classList.add('image-button');
      image.src = '/IMAGENES/corazon.png';
      imageButton.appendChild(image);
      imageButton.addEventListener('click', () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const productIndex = favorites.findIndex(favorite => favorite.id === producto.id);
        if (productIndex === -1) {
          favorites.push(producto);
          image.src = '/IMAGENES/corazonlleno.png';
        } else {
          favorites.splice(productIndex, 1);
          image.src = '/IMAGENES/corazon.png';
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
      });
      productCard.appendChild(imageButton);
      productCard.appendChild(buttonContainer);
      productList.appendChild(productCard);
    });
  }
  
    fetchData();
    } else {
    console.error('No se ha encontrado algún elemento con la clase "product-list" o "categorias-json"');
    }




   