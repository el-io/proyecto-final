var apiHost = "https://leito77.pythonanywhere.com"; // Aquí defines la dirección del host de tu API
var encabezado = [];
fetch(apiHost + "/headers")
  .then(response => response.json())
  .then(data => {
    encabezado = data;
    console.log("api", encabezado)
    
    
    

    


    var dropdownContent = document.getElementById("dropdown-content");
    var excludedFields = ["imagen","descripcion", "stock", "precio"]; // Campos a excluir del menú desplegable

    for (var i = 0; i < data.length; i++) {
      var fieldName = data[i];

      // Verificar si el campo está excluido
      if (!excludedFields.includes(fieldName)) {
        var option = document.createElement("a");
        option.href = "#";
        option.innerText = fieldName;
        option.onclick = function () {
          document.getElementById("selected-option").value = this.innerText;
          document.getElementById("input-field").value = ""; // Borrar el contenido del campo de entrada
          // Desactivar el botón "Borrar"
          var botonBorrar = document.querySelector(".borrar-btn");
          botonBorrar.disabled = false;
          document.getElementById("formulario").style.display = "none";
          console.log("Encabezados:", encabezado);
        };
        dropdownContent.appendChild(option);
      }
    }
  })
  .catch(error => {
    console.log("Error al obtener los encabezados de la API:", error);
  });

