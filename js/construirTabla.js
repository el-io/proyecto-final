var apiHost = "http://localhost:5000"; // Aquí defines la dirección del host de tu API
var headersOrder = ["id", "nombre", "stock", "precio", "imagen"]; // Define el orden deseado de los encabezados

// Obtener los encabezados de la base de datos
fetch(apiHost + "/headers")
  .then(response => response.json())
  .then(data => {
    console.log("Encabezados de la API:", data);
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

    // Construir las filas en el mismo orden que los datos devueltos por la API
    for (var j = 0; j < data.length; j++) {
      var rowData = data[j];
      var row = document.createElement("tr");

      for (var k = 0; k < headersOrder.length; k++) {
        var header = headersOrder[k];
        var cell = document.createElement("td");

        if (header === "imagen") {
          var img = document.createElement("img");
          img.src = rowData[header];
          img.width = 150;
          cell.appendChild(img);
        } else {
          cell.innerText = rowData[header];
        }

        row.appendChild(cell);
      }

      tableBody.appendChild(row);
    }
  })
  .catch(error => {
    console.log("Error al obtener los encabezados de la API:", error);
  });
