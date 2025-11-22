const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const userExiste = await User.findOne({ email });
    if (userExiste) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      nombre,
      email,
      password: passwordHash,
      rol: 'user'
    });

    res.status(201).json({ message: 'Usuario registrado correctamente', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const esValido = await bcrypt.compare(password, user.password);
    if (!esValido) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: user._id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Login correcto',
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error: error.message });
  }
});

module.exports = router;
