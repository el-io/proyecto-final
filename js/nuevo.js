var apiHost = "https://leito77.pythonanywhere.com";

function abrirFormularioNuevo() {
    // Obtener el menú desplegable
    var dropdownContent = document.getElementById("dropdown-content");
    var dropdownOptions = dropdownContent.getElementsByTagName("a");
    var fieldNames = window.encabezado;
    console.log("Encabezados ", encabezado);
    console.log("Encabezados ", fieldNames);
    
    
    document.getElementById("selected-option").value = "";
    document.getElementById("input-field").value = "";
    document.getElementById("selected-option").readOnly = true;
    document.getElementById("input-field").readOnly = true;
    document.getElementById("btn-aceptar").addEventListener("click", nuevosDatos);

    // Desactivar el botón "Borrar" y "Modificar"
    var botonBorrar = document.querySelector(".borrar-btn");
    botonBorrar.disabled = true;
    var botonModificar = document.querySelector(".modificar-btn");
    botonModificar.disabled = true;

    
    // Construir los campos del formulario
    var formFields = document.getElementById("form-fields");
    formFields.innerHTML = ""; // Limpiar los campos existentes

    for (var i = 0; i < fieldNames.length; i++) {
        var fieldName = fieldNames[i];

        var row = document.createElement("tr");
        var labelCell = document.createElement("td");
        var inputCell = document.createElement("td");
        var label = document.createElement("label-owner");
        var input = document.createElement("input");

        label.textContent = fieldName + ":";
        input.type = "text";
        input.value = ""; // Campo de entrada vacío
        input.name = fieldName.toLowerCase(); // Asignar el nombre de campo como atributo name

        // Asignar un id único a cada campo de entrada
        input.id = fieldName.toLowerCase() + "-input";

        if (i === 0) {
            input.readOnly = true; // Bloquear el primer campo de entrada
        }

        labelCell.appendChild(label);
        inputCell.appendChild(input);
        row.appendChild(labelCell);
        row.appendChild(inputCell);
        formFields.appendChild(row);
    }

    // Agregar el campo de imagen adicional
    var row = document.createElement("tr");
    var labelCell = document.createElement("td");
    var inputCell = document.createElement("td");
    var label = document.createElement("label-owner");
    var input = document.createElement("input");
    labelCell.appendChild(label);
    inputCell.appendChild(input);
    row.appendChild(labelCell);
    row.appendChild(inputCell);
    formFields.appendChild(row);

    label.textContent = "Imagen:";
    input.type = "file";
    input.value = ""; // Campo de entrada vacío
    input.name = "imagen"; // Asignar el nombre de campo como atributo name
    input.id = "imagen-input"; // Asignar un id único al campo de entrada

    // Manejar el evento change del campo de imagen para cargar la ruta completa
    input.addEventListener("change", function(event) {
        var reader = new FileReader();
        reader.onload = function() {
            var imageUrl = reader.result;
            // Mostrar la ruta completa de la imagen
            var imageInput = document.getElementById("imagen-input");
            imageInput.value = imageUrl;
        }
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }
    });

    // Limpiar la tabla antes de mostrar el formulario
    var tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    var tableHeadersRow = document.getElementById("table-headers");
    tableHeadersRow.innerHTML = "";

    // Mostrar el formulario

    // Obtener el elemento <h2>
    var titleElement = document.getElementById("title");

    // Generar el contenido del título desde JavaScript
    var titleText = "Crear articulo";

    // Asignar el contenido al elemento <h2>
    titleElement.textContent = titleText;


    document.getElementById("formulario").style.display = "block";
}

function nuevosDatos() {
    // Obtener los valores del formulario
    var form = document.getElementById("formulario");
    var inputs = form.getElementsByTagName("input");
    var formData = {};

    for (var i = 0; i < inputs.length; i++) {
        formData[inputs[i].name] = inputs[i].value;
    }

    // Construir la URL para la solicitud de agregar nueva fila
    var url = apiHost + "/productos";

    // Enviar la solicitud POST al endpoint /productos con formData
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(function (response) {
            if (response.ok) {
                alert("La nuevo articulo se ha agregado correctamente a la base de datos.");
                // Realizar acciones adicionales después de agregar la fila

                // Cerrar el formulario después de agregar la fila
                document.getElementById("formulario").style.display = "none";
                document.getElementById("selected-option").value = "id";
                document.getElementById("input-field").value = "";
                document.getElementById("selected-option").readOnly = false;
                document.getElementById("input-field").readOnly = false;

                // Actualizar la tabla
                buscar();
            } else {
                alert("Se produjo un error al agregar el articulo a la base de datos.");
            }
        })
        .catch(function (error) {
            alert("Se produjo un error al realizar la solicitud.");
            console.error(error);
        });
}