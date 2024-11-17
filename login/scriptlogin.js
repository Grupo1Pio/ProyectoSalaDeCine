document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de manera predeterminada

    // Obtener los valores del formulario
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    try {
        // Hacer la solicitud POST a la API de inicio de sesión
        let response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            let data = await response.json();
            
            // Guardar el token JWT en localStorage
            localStorage.setItem('token', data.token);
            
            document.getElementById('login-mensaje').innerText = 'Inicio de sesión exitoso.';

            // Redirigir al home después de un pequeño retraso
            setTimeout(() => {
                window.location.href = '../homesesion/homesesion.html';
            }, 1500); // 1.5 segundos de retraso
        } else {
            document.getElementById('login-mensaje').innerText = 'Nombre de usuario o contraseña incorrectos.';
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        document.getElementById('login-mensaje').innerText = 'Error al conectar con el servidor. Inténtalo de nuevo más tarde.';
    }
});
