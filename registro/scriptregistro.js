document.getElementById('registro-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío predeterminado del formulario

    // Obtener los valores del formulario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    try {
        // Realizar la solicitud a la API para registrar un nuevo usuario
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }) // Solo se envían username y password a la API
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('mensaje').innerText = 'Registro exitoso. Redirigiendo al login...';
            document.getElementById('registro-form').reset();
            
            // Redirigir al login después de un pequeño retraso
            setTimeout(() => {
                window.location.href = '../login/login.html';
            }, 1500); // 1.5 segundos de retraso
        } else {
            // Mostrar mensaje de error si ocurre un problema
            document.getElementById('mensaje').innerText = data.message || 'Error en el registro. Inténtalo de nuevo.';
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        document.getElementById('mensaje').innerText = 'Error de conexión. Por favor, inténtalo más tarde.';
    }
});
