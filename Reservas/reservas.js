// URL del backend donde se obtienen las reservas
const API_URL = 'http://localhost:3000/api/auth/reservas';

// Función para obtener las reservas desde el backend
async function fetchReservas() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener las reservas');
    }

    const data = await response.json();
    populateTable(data.reservas);
  } catch (error) {
    console.error('Error al cargar las reservas:', error);
    alert('No se pudieron cargar las reservas. Inténtalo más tarde.');
  }
}

// Función para poblar la tabla con los datos de reservas
function populateTable(reservas) {
  const tbody = document.querySelector('#reservasTable tbody');
  tbody.innerHTML = ''; // Limpiar la tabla antes de insertar nuevos datos

  reservas.forEach(reserva => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${reserva.username}</td>
      <td>${formatDate(reserva.movie_date)}</td>
      <td>${reserva.seat_number}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Función para formatear fechas (ejemplo: 2024-12-05 -> 05/12/2024)
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Llamar a la función para cargar las reservas al cargar la página
document.addEventListener('DOMContentLoaded', fetchReservas);
