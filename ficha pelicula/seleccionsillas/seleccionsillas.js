// Inicializar el datepicker
$(document).ready(function() {
    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true
    });
});

// Función para obtener el userId del token JWT
function getUserIdFromToken() {
    const token = localStorage.getItem('token'); // Suponiendo que guardas el token en el localStorage
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodificando el payload del JWT
        return payload.userId; // Asegúrate de que 'userId' es el nombre correcto en tu payload
    }
    return null; // Si no hay token, retorna null
}

// Enviar fecha seleccionada a la API
document.getElementById('confirmarBtn').addEventListener('click', function() {
    const selectedDate = $('#datepicker').val();
    const selectedSeat = document.querySelector('.selected');
    const userId = getUserIdFromToken(); // Obtener el userId del token

    if (!userId) {
        alert('No se encontró el ID de usuario. Asegúrate de estar autenticado.');
        return;
    }

    if (!selectedDate) {
        alert('Por favor selecciona una fecha.');
        return;
    }

    if (!selectedSeat) {
        alert('Por favor selecciona una silla.');
        return;
    }

    const data = {
        userId: userId,
        movieDate: selectedDate // Asegúrate de que la fecha esté en el formato correcto para tu base de datos
    };

    // Reemplaza 'http://localhost:3000/api/auth/save-movie-date' con la URL de tu API
    fetch('http://localhost:3000/api/auth/save-movie-date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        return response.json();
    })
    .then(data => {
        alert('Reserva confirmada: ' + JSON.stringify(data));
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error al confirmar la reserva.');
    });
});

document.querySelectorAll('.seat').forEach(div => {
    div.addEventListener('click', (event) => {
        // Elimina la clase 'selected' de cualquier div previamente seleccionado
        const previouslySelected = document.querySelector('.selected');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }
        
        // Agrega la clase 'selected' al div que se hizo clic
        event.target.classList.add('selected');
    });
});
