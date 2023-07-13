var apiHost = "https://leito77.pythonanywhere.com";
var selectedRow = null;
var headersOrder = ["id", "nombre", "descripcion", "stock", "precio", "imagen"];



function buscar() {
  var selectedOption = document.getElementById("selected-option").value;
  var searchValue = document.getElementById("input-field").value;
  // var searchValue = parseInt(document.getElementById("input-field").value);
  var url = apiHost + "/productos";
  document.getElementById("formulario").style.display = "none";
  if (searchValue) {
    if (selectedOption === "nombre") {
      url += "/busqueda?option=nombre&value=" + encodeURIComponent("%" + searchValue + "%");
    } else if (selectedOption === "id") {
      url += "/" + searchValue;
      var convertir = "id"
    }
  }

  fetch(url, {
    method: "GET"
  })
    .then(response => response.json())
    .then(data => {
      console.log("Datos de la API:", data);
      if (convertir === "id") {
        // Convertir el objeto de respuesta en un arreglo de un solo elemento
        data = [data];
        console.log("Datos de la API:", data);
      }

      if (data.length === 0) {
        // Mostrar mensaje de alerta
        alert("No hay coincidencias con la búsqueda.");
        return;
      }

      var tableHeaders = document.getElementById("table-headers");
      var tableBody = document.getElementById("table-body");

      // Limpiar la tabla antes de construirla nuevamente
      tableHeaders.innerHTML = "";
      tableBody.innerHTML = "";

      // Construir los encabezados de la tabla en el orden deseado
      for (var i = 0; i < headersOrder.length; i++) {
        var th = document.createElement("th");
        th.innerText = headersOrder[i];
        tableHeaders.appendChild(th);
      }

      for (var j = 0; j < data.length; j++) {
        var rowData = data[j];
        var row = document.createElement("tr");

        for (var k = 0; k < headersOrder.length; k++) {
          var header = headersOrder[k];
          var cell = document.createElement("td");

          if (header === "imagen") {
            if (rowData[header]) {
              var img = document.createElement("img");
              img.src = rowData[header];
              img.width = 150;
              cell.appendChild(img);
            }
          } else {
            cell.innerText = rowData[header];
          }

          row.appendChild(cell);
        }
           // Agregar el checkbox a la celda final de la fila
           var checkboxCell = document.createElement("td");
           var checkbox = document.createElement("input");
           checkbox.type = "checkbox";
           checkbox.addEventListener("change", function () {
               if (this.checked) {
                   if (selectedRow !== null && selectedRow !== this.parentNode.parentNode) {
                       selectedRow.querySelector("input[type='checkbox']").checked = false;
                   }
                   selectedRow = this.parentNode.parentNode;
               } else {
                   selectedRow = null;
               }
           });
           checkboxCell.appendChild(checkbox);
           row.appendChild(checkboxCell);

        

        tableBody.appendChild(row);
      }

    })
    .catch(error => {
      console.log("Error al obtener los datos de la API:", error);
    });
}
document.getElementById("selected-option").readOnly = false;
document.getElementById("input-field").readOnly = false;
document.getElementById("selected-option").value = "";
document.getElementById("input-field").value = "";
var botonBorrar = document.querySelector(".borrar-btn");
botonBorrar.disabled = false;
var botonModificar = document.querySelector(".modificar-btn");
 botonModificar.disabled = false;