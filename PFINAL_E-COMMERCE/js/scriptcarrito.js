// 1. Obtener el elemento del DOM donde se va a mostrar el carrito
const carritoDOM = document.querySelector('.card-carrito');

// 2. Obtener los productos del local storage
let productos = JSON.parse(localStorage.getItem('carrito')) || [];

// 3. Generar el HTML para mostrar los productos en el carrito
function generarHTMLProductoEnCarrito(producto) {
  return `
    <div class="card-producto">
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <div class="card-producto-info">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio.toFixed(2)}</p>
        <p>Cantidad: <button class="btn-cantidad btn-cantidad-reducir" data-id="${producto.id}">-</button>${producto.cantidad}<button class="btn-cantidad btn-cantidad-aumentar" data-id="${producto.id}">+</button></p>
        <p>Total: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
        <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
      </div>
    </div>
  `;
}

// 4. Generar el HTML para mostrar el carrito vacío o con los productos
function generarHTMLCarrito() {
  const listaProductosDOM = document.querySelector('#lista-productos');
  if (productos.length === 0) {
    listaProductosDOM.innerHTML = '<p>No hay productos en el carrito</p>';
  } else {
    listaProductosDOM.innerHTML = '';
    productos.forEach(producto => {
      listaProductosDOM.innerHTML += generarHTMLProductoEnCarrito(producto);
    });
  }
  generarHTMLTotal();
}

// 5. Agregar un evento para escuchar los clicks en los botones de eliminar producto y actualizar el array del carrito en el local storage y volver a generar el HTML del carrito sin el producto eliminado.
carritoDOM.addEventListener('click', e => {
  if (e.target.classList.contains('btn-eliminar')) {
    const productoID = parseInt(e.target.dataset.id);
    productos = productos.filter(producto => producto.id !== productoID);
    localStorage.setItem('carrito', JSON.stringify(productos));
    generarHTMLCarrito();
  } else if (e.target.classList.contains('btn-cantidad-reducir')) {
    const productoID = parseInt(e.target.dataset.id);
    const producto = productos.find(producto => producto.id === productoID);
    if (producto.cantidad > 1) {
      producto.cantidad--;
      localStorage.setItem('carrito', JSON.stringify(productos));
      generarHTMLCarrito();
    }
  } else if (e.target.classList.contains('btn-cantidad-aumentar')) {
    const productoID = parseInt(e.target.dataset.id);
    const producto = productos.find(producto => producto.id === productoID);
    producto.cantidad++;
    localStorage.setItem('carrito', JSON.stringify(productos));
    generarHTMLCarrito();
  }
});

// 6. Generar el HTML del carrito al cargar la página
generarHTMLCarrito();
generarHTMLTotal();

// 7. Generar el HTML para mostrar el total de la compra y un botón para proceder al pago
function generarHTMLTotal() {
  const totalCarritoDOM = document.getElementById('total-carrito');
  let total = 0;
  productos.forEach(producto => {
    total += producto.precio * producto.cantidad;
  });
  totalCarritoDOM.innerHTML = `<h3>Total de la compra: $${total.toFixed(2)}</h3><a href="#" class="btn-pagar">Proceed to check out</a>`;
}


// 8. Agregar evento al botón de pagar para vaciar el carrito y mostrar un mensaje de éxito
carritoDOM.addEventListener('click', e => {
  if (e.target.classList.contains('btn-pagar')) {
    // Vaciar carrito
    localStorage.removeItem('carrito');
    productos = [];
    generarHTMLCarrito();
    generarHTMLTotalCarrito();

  } else if (e.target.classList.contains('btn-eliminar')) {
    const productoID = parseInt(e.target.dataset.id);
    productos = productos.filter(producto => producto.id !== productoID);
    localStorage.setItem('carrito', JSON.stringify(productos));
    generarHTMLCarrito();
    generarHTMLTotalCarrito();
    
  } else if (e.target.classList.contains('btn-cantidad-reducir')) {
    const productoID = parseInt(e.target.dataset.id);
    const producto = productos.find(producto => producto.id === productoID);
    if (producto.cantidad > 1) {
      producto.cantidad--;
      localStorage.setItem('carrito', JSON.stringify(productos));
      generarHTMLCarrito();
      generarHTMLTotalCarrito();
    }
  } else if (e.target.classList.contains('btn-cantidad-aumentar')) {
    const productoID = parseInt(e.target.dataset.id);
    const producto = productos.find(producto => producto.id === productoID);
    producto.cantidad++;
    localStorage.setItem('carrito', JSON.stringify(productos));
    generarHTMLCarrito();
    generarHTMLTotalCarrito();
  }
});

// 9. Generar el HTML del total del carrito al cargar la página
generarHTMLTotal();

// 10. Generar el HTML del formulario de pago y mostrarlo al dar click en el botón de pagar
function generarHTMLFormularioPago() {
    const formularioPagoDOM = document.createElement('div');
    formularioPagoDOM.classList.add('formulario-pago');
    formularioPagoDOM.innerHTML = `
      <h3>Ingresa tus datos de pago:</h3>
      <form>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre">
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" name="direccion">
        <label for="telefono">Teléfono:</label>
        <input type="text" id="telefono" name="telefono">
        <button type="submit" class="btn-comprar-ahora">Buy now</button>
      </form>
    `;
    carritoDOM.appendChild(formularioPagoDOM);
    const btnPagarDOM = document.querySelector('.btn-pagar');
    btnPagarDOM.style.display = 'none';
  }
  
  carritoDOM.addEventListener('click', e => {
    if (e.target.classList.contains('btn-pagar')) {
      generarHTMLFormularioPago();
    } else if (e.target.classList.contains('btn-eliminar')) {
      // ...
    }
  });

  // 11. Agregar evento submit al formulario y redirigir a index.html
carritoDOM.addEventListener('submit', e => {
    e.preventDefault();
    localStorage.removeItem('carrito');
    productos = [];
    generarHTMLCarrito();
    generarHTMLTotal();
    window.location.href = 'index.html';
  });
  
  
