const favoritosDOM = document.querySelector('.cards-favoritos');

function generarHTMLFavoritos() {
  favoritosDOM.innerHTML = '';
  let favoritos = JSON.parse(localStorage.getItem('favorites')) || [];
  
  favoritos.forEach(producto => {
    const productoDOM = document.createElement('div');
    productoDOM.classList.add('card');
    productoDOM.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <button class="btn-eliminar-favorito">Eliminar</button>
    `;
    favoritosDOM.appendChild(productoDOM);
  });
}

generarHTMLFavoritos();

favoritosDOM.addEventListener('click', e => {
  if (e.target.classList.contains('btn-eliminar-favorito')) {
    const nombreProducto = e.target.parentNode.querySelector('h3').textContent;
    let favoritos = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritos = favoritos.filter(producto => producto.nombre !== nombreProducto);
    localStorage.setItem('favorites', JSON.stringify(favoritos));
    generarHTMLFavoritos();
  }
});
