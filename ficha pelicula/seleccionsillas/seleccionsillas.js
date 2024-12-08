// Inicializar el datepicker
$(document).ready(function () {
    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true
    });
});

// Obtener el userId y nombre del token JWT
function getUserInfoFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log('Payload del token:', payload); // Verificar estructura del token en consola
            return {
                userId: payload.userId,
                name: payload.username || 'Usuario' // Ajustar según el campo disponible
            };
        } catch (error) {
            console.error('Error al decodificar el token:', error);
        }
    }
    return null;
}

// Manejar selección de silla
document.querySelectorAll('.seat').forEach(seat => {
    seat.addEventListener('click', (event) => {
        document.querySelectorAll('.seat').forEach(s => s.classList.remove('selected'));
        event.target.classList.add('selected');
    });
});

// Confirmar reserva
document.getElementById('confirmarBtn').addEventListener('click', function () {
    const selectedDate = $('#datepicker').val();
    const selectedSeat = document.querySelector('.seat.selected');
    const userInfo = getUserInfoFromToken();

    if (!userInfo || !userInfo.userId) {
        alert('No se encontró la información del usuario. Por favor, inicia sesión.');
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

    // Preparar datos para la solicitud
    const data = {
        userId: userInfo.userId,
        movieDate: selectedDate,
        seatNumber: selectedSeat.id // Enviar el identificador de la silla seleccionada
    };

    // Llamada a la API del backend para guardar la reserva
    fetch('http://localhost:3000/api/auth/save-movie-date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la reserva');
            }
            return response.json();
        })
        .then(data => {
            // Formatear la fecha recibida desde el backend
            const fechaReserva = new Date(data.reservation.movie_date);
            const fechaFormateada = `${fechaReserva.getDate().toString().padStart(2, '0')}-${(fechaReserva.getMonth() + 1).toString().padStart(2, '0')}-${fechaReserva.getFullYear()}`;

            // Mostrar mensaje con el nombre del usuario devuelto por el backend
            alert(`El usuario ${data.reservation.username} realizó con éxito la reserva de la silla ${data.reservation.seat_number} para la fecha ${fechaFormateada}.`);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al confirmar la reserva.');
        });
});
