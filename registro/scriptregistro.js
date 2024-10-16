// Diccionario para almacenar los usuarios registrados
let usuariosRegistrados = {};

// Función para manejar el evento de registro
document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de manera predeterminada

    // Obtener los valores del formulario
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Verificar si el email ya está registrado
    if (usuariosRegistrados[email]) {
        document.getElementById('mensaje').innerText = 'Este correo ya está registrado.';
        return;
    }

    // Registrar el nuevo usuario en el diccionario
    usuariosRegistrados[email] = {
        nombre: nombre,
        password: password
    };

    // Mostrar mensaje de éxito y limpiar el formulario
    document.getElementById('mensaje').innerText = 'Registro exitoso.';
    document.getElementById('registro-form').reset();
    
    // Almacenar los usuarios en el localStorage para que persistan
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

    // Redirigir al login después de un pequeño retraso
    setTimeout(() => {
        window.location.href = '../login/login.html';
    }, 1500); // 1.5 segundos de retraso
});
