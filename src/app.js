const express = require('express');

const path = require('path'); //concatena directoris
const morgan = require('morgan');  //mostra info en les peticions rebudes
const clientsRoutes = require('./routes/clients'); //Rutes dels clients
const versionsRoutes = require('./routes/versions'); 
const { urlencoded } = require('express');  //Per tractar dades formularis
process.env["NODE_CONFIG_DIR"] = __dirname + "/configuracions/";
const config = require('config');

const app = express(); //Iniciem express en l'objecte app.

//settings
app.set('port', parseInt(process.env.PROD_APP_PORT) || config.get('app.port'));
app.set('view engine','ejs'); //indiquem quin motor de plantilles utilitzarem
app.set('views', path.join(__dirname, 'views')); //indiquem on son les plantilles

//Arxius estàtics
app.use(express.static(path.join(__dirname,'public')));

//middlewares
app.use(morgan(config.get('morgan'))); //mostra en el log del server les peticions rebudes

//Antic body-parser actualment ja inclos en express
//Permet tractar des de req.body la informacó que envien els formularis
//extended: false configuració senzilla per tractar nom=valor (NO imatges o arxius) 
app.use(express.urlencoded({extended: false}));

//rutes
app.use('/', clientsRoutes);
app.use('/versions', versionsRoutes);
//Si hem arribat aquí es que han demanat una ruta no definida
app.use((req, res, next) => {
    res.status(404).send('Pàgina no trobada');
});

//Inici del servidor
app.listen(app.get('port'), () => {
    console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
    console.log('Servidor escoltant el port: ', app.get('port'));
});