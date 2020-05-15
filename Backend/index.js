

var mongoose = require('mongoose');
var app = require('./app'); //cargar fichero app
var port = 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
    .then(() => {
        console.log("la conexion a la base de datos se ha realizado!!");

        //crear servidor y escuchar peticiones HTTP
        app.listen(port, () => { //puerto y callback con funcion flecha
            console.log('servidor corriendo en http://localhost:' + port);
        });

    });


















