const productList = document.querySelector('.product-list');
const allCategoriesDiv = document.querySelector('.categorias-json');

if (productList && allCategoriesDiv) {
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3000/productos');
      const data = await response.json();
      const categories = [...new Set(data.map(producto => producto.categoria))];
      const allCategoriesText = categories.join(' | ');
      allCategoriesDiv.innerHTML = `<p>ALL CATEGORIES: ${allCategoriesText}</p>`;
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
        productList.appendChild(productCard);
      });
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();
} else {
  console.error('No se ha encontrado algún elemento con la clase "product-list" o "all-categories"');
}
