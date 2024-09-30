function validateForm() {
    // Limpiar mensajes de error
    document.getElementById('nameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('messageError').innerText = '';

    let valid = true;

    // Validar nombre
    const name = document.getElementById('name').value;
    if (!name) {
        document.getElementById('nameError').innerText = 'Debes llenar este campo';
        valid = false;
    }

    // Validar email
    const email = document.getElementById('email').value;
    if (!email) {
        document.getElementById('emailError').innerText = 'Debes llenar este campo';
        valid = false;
    }

    // Validar mensaje
    const message = document.getElementById('message').value;
    if (!message) {
        document.getElementById('messageError').innerText = 'Debes llenar este campo';
        valid = false;
    }

    // Si todos los campos son válidos
    if (valid) {
        alert('Formulario enviado correctamente');
        // Aquí puedes agregar el código para enviar el formulario
    }
}
