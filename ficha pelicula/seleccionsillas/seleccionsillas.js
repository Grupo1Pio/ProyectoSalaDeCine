// Inicializar el datepicker
$(document).ready(function () {
    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true
    });
});

// Obtener el userId del token JWT
function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.userId;
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
    const userId = getUserIdFromToken();

    if (!userId) {
        alert('No se encontró el ID de usuario. Por favor, inicia sesión.');
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
        movieDate: selectedDate,
        seatNumber: selectedSeat.id // Enviar el identificador de la silla seleccionada
    };

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
            alert('Reserva confirmada: ' + JSON.stringify(data));
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al confirmar la reserva.');
        });
});
