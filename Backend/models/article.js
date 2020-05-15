

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = Schema({
    title: String,
    content: String,
    date: { type:Date, default:Date.now},
    image:String /*ruta de la imagen*/
});  /*definir la estructura de los objetos*/


module.exports = mongoose.model('Article', articleSchema);/*nombre y esquema a segui*/
//articles --> guarda documentos de este tipo y con esta estructura dentro de la coleccion






