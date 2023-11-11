// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();

const messages = [
  {
    _id: 'XXX',
    user: 'spiderman',
    message: 'Hola mundo',
  },
];





// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json(messages);
});

router.post('/', (request, response) => {
  const message = {
    message: request.body.message,
    user: request.body.user,
  };

  messages.push(message);
  console.log(messages);

  response.json({
    ok: true,
    message
  });
});




module.exports = router;