

//cargar modulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');

//ejecutar express (http)
var app = express();

//cargar ficheros rutas
var article_routes = require('./routes/article');
//middlewares (se ejecuta antes de cargar la ruta)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS (permitir peticiones del frontend)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//añadir prefijos a rutas / cargar rutas
app.use('/api', article_routes);


//exportar modulo (fichero actual)
module.exports = app;























//añadir metodo o ruta de prueba. siempre recibe y devuelve algo
/*
app.get('/probando', (req, res) => {
   //puede devolver json o html
   //ejemplo json
   return res.status(200).send({
       curso: 'Master en frameworks',
       realizado: 'Jose Maria Ruiz',
       fecha: 'Marzo-2020',
   });
    // ejemplo de html
    return res.status(200).send(`
     <ul>
         <li>Node JS</li>
         <li>Angular</li>
         <li>React</li>
         <li>Vue</li>
    </ul>
    `);
});*/
