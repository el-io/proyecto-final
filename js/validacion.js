// Obtener el formulario y los campos
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Función de validación
function validateForm(event) {
  event.preventDefault(); // Prevenir envío del formulario

  // Variable para almacenar los mensajes de error
  let errorMessages = '';

  // Limpiar mensajes de error
  const errorElements = document.getElementsByClassName('error');
  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = '';
  }

  // Validar nombre
  if (nameInput.value.trim() === '') {
    errorMessages += 'Ingrese su nombre\n';
    nameInput.focus();
  }

  // Validar email
  if (emailInput.value.trim() === '') {
    errorMessages += 'Ingrese su email\n';
    emailInput.focus();
  } else if (!isValidEmail(emailInput.value.trim())) {
    errorMessages += 'Ingrese un email válido\n';
    emailInput.focus();
  }

  // Validar mensaje
  if (messageInput.value.trim() === '') {
    errorMessages += 'Ingrese un mensaje\n';
    messageInput.focus();
  }

  // Mostrar mensajes de error en una alerta
  if (errorMessages !== '') {
    alert(errorMessages);
  } else {
    // Enviar formulario si todo es válido
    form.submit();
  }
}

// Función para validar el formato del email
function isValidEmail(email) {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
}

// Asociar la función de validación al evento submit del formulario
form.addEventListener('submit', validateForm);
