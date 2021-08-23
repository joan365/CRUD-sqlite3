const express = require('express');
const router = express.Router();
//Importem els controladors
const clients = require('../controllers/clients');

//Plana principal: presenta el formulari d'altes i una llista dels clients de la BD
router.get('/', clients.llista);

router.post('/add', clients.save); //Crea un nou client a la BD

router.get('/delete/:id', clients.delete) //Baixa un client

router.get('/update/:id', clients.edit)  //Presenta formulari amb dades a modificar

router.post('/update/:id', clients.update) //Envia dades per modificar un client

module.exports = router;
