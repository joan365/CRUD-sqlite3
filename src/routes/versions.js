const express = require('express');
const router = express.Router();
//Importem els controladors
const versions = require('../controllers/versions');

//Mostra la plana versions. la ruta de veritat la definim a l'arsiu principal
router.get('/', versions.llista);

module.exports = router;
