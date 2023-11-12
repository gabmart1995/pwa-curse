// Routes.js - Módulo de rutas
const express = require('express');
const router = express.Router();
const push = require('./push');

const mensajes = [

  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }

];


// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( mensajes );
});


// Post mensaje
router.post('/', function (req, res) {
  
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push( mensaje );

  console.log(mensajes);


  res.json({
    ok: true,
    mensaje
  });
});

// almacenar la suscripcion
router.post('/subscribe', (request, response) => {
  response.json({ message: 'suscribe' });
});

// manda la clave publica
router.get('/key', (_, response) => {
  const key = push.getKey();
  response.send(key);
});

// enviar una notificacion push a todas las personas conectadas
router.post('/push', (request, response) => {
  response.json({ message: 'push' });
});


module.exports = router;