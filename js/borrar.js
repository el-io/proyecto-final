var apiHost = "leito77.mysql.pythonanywhere-services.com"; // Aquí defines la dirección del host de tu API
var botonBorrar = document.querySelector(".borrar-btn");
// botonBorrar.addEventListener("click", borrar);
var selectedRow = null; // Declarar la variable selectedRow
//Evento click en una fila de la tabla para seleccionarla
tableBody.addEventListener("click", function(event) {
  // Obtener la fila seleccionada
  var row = event.target.parentNode;
  
  // Si la fila ya está seleccionada, deseleccionarla
  if (row === selectedRow) {
    row.classList.remove("selected");
    selectedRow = null;
  } else {
    // Si la fila no está seleccionada, seleccionarla
    if (selectedRow !== null) {
      selectedRow.classList.remove("selected");
    }
    row.classList.add("selected");
    selectedRow = row;
  }
});


function borrar() {


    if (selectedRow === null) {
      alert("Seleccione el artículo a eliminar."); // Mensaje de alerta si no se selecciona ningún artículo
      } else {
      var confirmacion = confirm("¿Estás seguro de que deseas borrar la fila seleccionada?");
  
      if (confirmacion) {
        var id = selectedRow.cells[0].innerText; 
        var url = apiHost + "/productos/" + id;
  
        fetch(url, {
          method: "DELETE"
        })
          .then(response => {
            if (response.ok) {
              
              
  
              // Eliminar la fila de la tabla
              selectedRow.remove();
              selectedRow = null;
  
              // Mostrar mensaje de éxito
              alert("El artículo ha sido eliminado exitosamente.");
            } else {
              // Hubo un error al intentar borrar el artículo
              // Puedes mostrar un mensaje de error o realizar alguna otra acción de manejo de errores
              alert("Error al borrar el artículo.");
            }
          })
          .catch(error => {
            // Error en la solicitud
            // Puedes mostrar un mensaje de error o realizar alguna otra acción de manejo de errores
            alert("Error en la solicitud para borrar el artículo.");
          });
      }
    }
  }

  var botonModificar = document.querySelector(".modificar-btn");
  botonModificar.disabled = false;
