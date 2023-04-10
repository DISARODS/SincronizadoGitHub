let products = [];
localStorage.setItem('productos',JSON.stringify(products));
const form = document.getElementById('productform');
form.addEventListener('submit', addProduct);

function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById('productname').value;
    const price = document.getElementById('productprice').value;
    const quantity = document.getElementById('productquantity').value;
    const category = document.getElementById('productcategory').value;

    const botonedit = document.createElement('button');
        botonedit.textContent = 'Editar';
        //no le supe dar funcion al boton de editar
        
    
    const botondelete = document.createElement('button');
        botondelete.textContent = 'Borrar';
        botondelete.addEventListener('click', function() {
            // obtiene la fila padre del botón
            var fila = this.parentNode.parentNode;
            // elimina la fila
            fila.parentNode.removeChild(fila);
        });

    const product = {
    name,
    price,
    quantity,
    category
    };

    products.push(product);
    localStorage.setItem('productos',JSON.stringify(products));
    console.log(JSON.parse(localStorage.getItem('productos')));
    console.log(product);

    const tableBody = document.querySelector('#product-table tbody');
    const row = tableBody.insertRow(-1);
    const nameCell = row.insertCell(0);
    const priceCell = row.insertCell(1);
    const quantityCell = row.insertCell(2);
    const categoryCell = row.insertCell(3);
    const actionsCell = row.insertCell(4);
    nameCell.textContent = product.name;
    priceCell.textContent = product.price;
    quantityCell.textContent = product.quantity;
    categoryCell.textContent = product.category;
    actionsCell.appendChild(botondelete);
    actionsCell.appendChild(botonedit);

}
