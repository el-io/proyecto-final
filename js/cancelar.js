function cancelar() {
    document.getElementById("selected-option").value = "";
    document.getElementById("input-field").value = "";
    document.getElementById("selected-option").readOnly = false;
    document.getElementById("input-field").readOnly = false;
    var botonBorrar = document.querySelector(".borrar-btn");
    botonBorrar.disabled = false;
    var botonModificar = document.querySelector(".modificar-btn");
    botonModificar.disabled = false;
    document.getElementById("formulario").style.display = "none";
   }