

var express = require('express');
var articleController = require ('../controllers/article');

var router = express.Router();

var multipart = require('connect-multiparty');//carga el modulo connect-multiparty
//nos da una funcionalidad que se ejecuta antes de que llegue a ejecutarse el metodo del controller
var md_upload = multipart({uploadDir: './upload/articles'});

//rutas para probar
router.post('/datos-curso', articleController.datosCurso);
router.get('/test-de-controlador', articleController.test);


//rutas utiles
router.post('/save', articleController.save);
router.get('/articles/:last?', articleController.getArticles);
router.get('/article/:id', articleController.getArticle);
router.put('/article/:id', articleController.update);
router.delete('/article/:id', articleController.delete);
router.post('/upload-image/:id?', md_upload, articleController.upload);
router.get('/get-image/:image', articleController.getImage);
router.get('/search/:search', articleController.search);

//put=actualizar get=sacar datos post=guardar o enviar delete=borrar

module.exports = router;