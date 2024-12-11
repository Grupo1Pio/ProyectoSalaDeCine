// ./routes/auth.js
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../db')

const router = express.Router()

// Registro de usuario
router.post('/register', async (req, res) => {
  const { username, password } = req.body
  console.log('Datos recibidos:', username, password)
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    )
    console.log('Usuario registrado:', result.rows[0])
    res.status(201).json({ message: 'User registered', user: result.rows[0] })
  } catch (err) {
    console.error('Error en el servidor:', err)
    res.status(500).json({ error: err.message })
  }
})

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username])
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const user = userResult.rows[0]
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ message: 'Login successful', token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Ruta para recibir y guardar la fecha de la película
// ./routes/auth.js
// Ruta para guardar la fecha de la película y obtener el nombre del usuario
router.post('/save-movie-date', async (req, res) => {
  const { userId, movieDate, seatNumber } = req.body;

  try {
    // Verificar que los datos no estén vacíos
    if (!userId || !movieDate || !seatNumber) {
      return res.status(400).json({ message: 'User ID, movie date, and seat number are required' });
    }

    // Guardar la fecha, el usuario y el número de silla en la base de datos
    const insertResult = await pool.query(
      'INSERT INTO movie_dates (user_id, movie_date, seat_number) VALUES ($1, $2, $3) RETURNING *',
      [userId, movieDate, seatNumber]
    );

    const reservation = insertResult.rows[0];

    // Obtener el nombre del usuario relacionado
    const userResult = await pool.query(
      `SELECT u.username, m.movie_date, m.seat_number 
       FROM users u 
       INNER JOIN movie_dates m ON u.id = m.user_id 
       WHERE m.id = $1`,
      [reservation.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found after reservation' });
    }

    const userReservation = userResult.rows[0];

    res.status(201).json({
      message: `User ${userReservation.username} reserved for ${userReservation.movie_date} seat ${userReservation.seat_number}`,
      reservation: userReservation,
    });
  } catch (err) {
    console.error('Error en el servidor:', err);
    res.status(500).json({ error: err.message });
  }
});

// Ruta para obtener todas las reservas
router.get('/reservas', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT users.username, movie_dates.movie_date, movie_dates.seat_number
      FROM movie_dates
      JOIN users ON movie_dates.user_id = users.id
    `);

    res.json({ reservas: result.rows });
  } catch (err) {
    console.error('Error al obtener las reservas:', err);
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
});


module.exports = router
