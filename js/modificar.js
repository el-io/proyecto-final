// var url = apiHost + "/productos/" + id;

var apiHost = "https://leito77.pythonanywhere.com";
function abrirFormulario() {
    // Verificar si hay una fila seleccionada
    var checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
    if (checkboxes.length === 0) {
        alert("Seleccione el articulo a modificar.");
        return;
    }

    // Desactivar el botón "Borrar"
    var botonBorrar = document.querySelector(".borrar-btn");
    botonBorrar.disabled = true;
    document.getElementById("btn-aceptar").addEventListener("click", actualizarDatos);
    // Obtener la fila seleccionada
    var selectedRow = checkboxes[0].parentNode.parentNode;

    // Obtener los nombres de los campos de la tabla
    var tableHeaders = Array.from(document.getElementById("table-headers").children).map(th => th.innerText);

    // Agregar los nombres de los campos al arreglo fieldNames
    var fieldNames = [];
    for (var i = 0; i < tableHeaders.length; i++) {
        fieldNames.push(tableHeaders[i]);
    }


    // Obtener los datos de la fila seleccionada
    rowData = Array.from(selectedRow.children).map(td => td.innerText);

    document.getElementById("selected-option").value = "id";
    document.getElementById("input-field").value = rowData[0];
    document.getElementById("selected-option").readOnly = true;
    document.getElementById("input-field").readOnly = true;

    // Construir los campos del formulario
    var formFields = document.getElementById("form-fields");
    formFields.innerHTML = ""; // Limpiar los campos existentes

    for (var i = 0; i < fieldNames.length; i++) {
        var fieldName = fieldNames[i];
        var fieldValue = rowData[i];


        // if (fieldName==="imagen") {
        //     var img = fieldValue;
        //     img.width = 150;
        //     cell.appendChild(img);
        //     fieldValue=img
        // }

        var row = document.createElement("tr");
        var labelCell = document.createElement("td");
        var inputCell = document.createElement("td");
        var label = document.createElement("label-owner");
        var input = document.createElement("input");

       

        label.textContent = fieldName + ":";
        input.type = "text";
        input.value = fieldValue;
        input.name = fieldName.toLowerCase(); // Asignar el nombre de campo como atributo name




        if (i === 0) {
            input.readOnly = true; // Bloquear el primer campo de entrada (id-input)
        }

        // Asignar un id único a cada campo de entrada
        input.id = fieldName.toLowerCase() + "-input";

        labelCell.appendChild(label);
        inputCell.appendChild(input);
        row.appendChild(labelCell);
        row.appendChild(inputCell);
        formFields.appendChild(row);
    }

    // Limpiar la tabla antes de mostrar el formulario
    var tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    var tableHeadersRow = document.getElementById("table-headers");
    tableHeadersRow.innerHTML = "";

    // Mostrar el formulario
    document.getElementById("formulario").style.display = "block";
    // Obtener el elemento <h2>
    var titleElement = document.getElementById("title");

    // Generar el contenido del título desde JavaScript
    var titleText = "Modificar Articulo ";

    // Asignar el contenido al elemento <h2>
    titleElement.textContent = titleText;


    var checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
    });

}

function actualizarDatos() {
    if (!rowData) {
        alert("No se ha seleccionado ningún artículo para actualizar.");
        return;
    }

    // Obtener los valores del formulario
    var form = document.getElementById("formulario");
    var inputs = form.getElementsByTagName("input");
    var formData = {};

    for (var i = 0; i < inputs.length; i++) {
        formData[inputs[i].name] = inputs[i].value;
    }

    // Obtener el ID del artículo a actualizar
    var id = rowData[0]; // Suponiendo que el ID está en la primera columna de la tabla

    //   // Construir la URL para la solicitud de actualización
    var url = apiHost + "/productos/" + id;

    //   alert("URL de solicitud: " + url);
    //   alert("Contenido de formData:\n" + JSON.stringify(formData));





    // Eliminar el campo ID del objeto de datos
    delete formData.id;

    // Realizar la solicitud al servidor para actualizar los datos
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(function (response) {
            if (response.ok) {
                
               
                // Cerrar el formulario después de la actualización
                document.getElementById("formulario").style.display = "none";

                buscar()

                document.getElementById("selected-option").readOnly = false;
                document.getElementById("input-field").readOnly = false;
                document.getElementById("selected-option").value = "";
                document.getElementById("input-field").value = "";

                alert("Los datos se han actualizado correctamente en la base de datos.");
            } else {
                alert("Se produjo un error al actualizar los datos en la base de datos.");
            }
        })
        .catch(function (error) {
            alert("Se produjo un error al realizar la solicitud.");
            console.error(error);
        });
}
