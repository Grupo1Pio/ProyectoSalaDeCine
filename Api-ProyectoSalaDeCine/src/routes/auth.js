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
router.post('/save-movie-date', async (req, res) => {
  const { userId, movieDate, seatNumber } = req.body;
  try {
    // Verificar que los datos no estén vacíos
    if (!userId || !movieDate || !seatNumber) {
      return res.status(400).json({ message: 'User ID, movie date, and seat number are required' });
    }

    // Obtener el nombre del usuario
    const userResult = await pool.query('SELECT username FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const username = userResult.rows[0].username;

    // Guardar la fecha, el usuario y el número de silla en la base de datos
    const result = await pool.query(
      'INSERT INTO movie_dates (user_id, movie_date, seat_number) VALUES ($1, $2, $3) RETURNING *',
      [userId, movieDate, seatNumber]
    );

    res.status(201).json({
      message: `User ${username} reserved for ${movieDate} seat ${seatNumber}`,
      reservation: result.rows[0],
    });
  } catch (err) {
    console.error('Error en el servidor:', err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router
