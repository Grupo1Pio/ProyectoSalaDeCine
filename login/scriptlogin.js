// Obtener los usuarios guardados en el localStorage
let usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || {};

// Función para manejar el evento de inicio de sesión
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de manera predeterminada

    // Obtener los valores del formulario
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Verificar si el usuario está registrado y la contraseña es correcta
    if (usuariosRegistrados[email] && usuariosRegistrados[email].password === password) {
        document.getElementById('login-mensaje').innerText = 'Inicio de sesión exitoso.';
        
        // Redirigir al home después de un pequeño retraso
        setTimeout(() => {
            window.location.href = '../homesesion/homesesion.html';
        }, 1500); // 1.5 segundos de retraso
    } else {
        document.getElementById('login-mensaje').innerText = 'Correo o contraseña incorrectos.';
    }
});
