// Seleccionar todas las imágenes de clase "thumbnail"
var imagenes = document.querySelectorAll('.thumbnail');

// Obtener los datos guardados en el Local Storage
var datosGuardados = localStorage.getItem('clicksImagenes');

// Si no hay datos guardados, crear un array vacío
if (!datosGuardados) {
  datosGuardados = [];
} else {
  datosGuardados = JSON.parse(datosGuardados);
}

// Agregar un evento de click a cada imagen que este en la categoria todos 
imagenes.forEach(function(imagen) {
  imagen.addEventListener('click', function() {
    // Crear un objeto con la información del click
    var nuevoClick = {
      fecha: new Date(),
      imagenSeleccionada: this.src
    };

    // Agregar el objeto al array
    datosGuardados.push(nuevoClick); //arreglo.push

    // Guardar los datos actualizados en el Local Storage
    localStorage.setItem('clicksImagenes', JSON.stringify(datosGuardados));
  });
});