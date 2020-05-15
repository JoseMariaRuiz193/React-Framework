
// creamos objeto con distintas propiedades
//y dentro de las propiedades una funcion anonima

var validator = require('validator');
var fs = require('fs');//libreria eliminar archivos del fichero
var path = require('path');

var Article = require('../models/article');

var controller = {
    datosCurso: (req, res) => {

        return res.status(200).send({
            curso: 'Master en frameworks',
            realizado: 'Jose Maria Ruiz',
            fecha: 'Marzo-2020',
        });

    },
    test: (req, res) => {
        return res.status(200).send({
            message: 'soy la accion test de mi controlador articulos'
        });
    },

    save: (req, res) => {
        //recoger parametros por post
        var params = req.body;
        //validar datos(validator)
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (error) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar!!'
            });
        }
        if (validate_title && validate_content) {
            //crear objeto a guardar
            var article = new Article();
            //asignar valores
            article.title = params.title;
            article.content = params.content;
            if (params.image) {
                article.image = params.image;
            } else {
                article.image = null;
            }
            //guardar el articulo
            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado!!'
                    });
                }
                //devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });
            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos!!'
            });
        }
    },

    getArticles: (req, res) => {

        var query = Article.find({})

        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(3);

        }

        //find
        query.sort('-_id').exec((err, articles) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos!!'
                });
            }
            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar!!'
                });
            }
            return res.status(200).send({
                status: 'successs',
                articles
            });
        });

    },
    getArticle: (req, res) => {
        //recoger id de la url
        var articleId = req.params.id;

        //comprobar que existe
        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo!!'
            });

        }
        //buscar articulo
        Article.findById(articleId, (err, article) => {

            if (err || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo!!'
                });
            }
            //devolver json
            return res.status(200).send({
                status: 'success',
                article
            });
        });

    },
    update: (req, res) => {
        //recoger el id del articulo por la url
        var articleId = req.params.id;
        //recoger los datos que llegan por put
        var params = req.body;
        //validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar!!'
            });
        }
        //find and update
        if (validate_title && validate_content) {

            Article.findOneAndUpdate({ _id: articleId }, params, { new: true }, (err, articleUpdate) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar!!'
                    });
                }
                if (!articleId) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo!!'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdate
                });
            });
        } else {
            //respuesta
            return res.status(200).send({
                status: 'error',
                message: 'La validacion no es correcta!!'
            });
        }

    },
    delete: (req, res) => {
        //Recoger el id de la url
        var articleId = req.params.id;

        //Find and delete
        Article.findByIdAndDelete({ _id: articleId }, (err, articleRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar!!'
                });

            }
            if (!articleRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el articulo, posiblemente no existe!!'
                });
            }
            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        });
    },
    upload: (req, res) => {
        //configurar el modulo conect multiparty router/article.js

        //recoger el fichero de la peticion
        var file_name = 'Imagen no subida...';

        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        //conseguir el nombre y la extension del archivo
        var file_path = req.files.file0.path;//nombre y extension del archivo
        var file_split = file_path.split('\\');//separamos y nos quedamos solo con el trozo del nombre

        //Nombre del archivo
        var file_name = file_split[2];

        // Extension del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        //comprobar la extension de solo imagenes, si no es valida borrar fichero
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            //borrar archivo subido
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extension de la imagen no es valida!!'
                });
            });


        } else {
            //si todo es valido, saco la id de la url
            var articleId = req.params.id;

            if (articleId) {
                //buscar el articulo, asignar el nombre de la imagen y actualizarlo
                Article.findByIdAndUpdate({ _id: articleId }, { image: file_name }, { new: true }, (err, articleUpdated) => {

                    if (err || !articleUpdated) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al guardar la imagen del articulo!!'
                        });
                    }
                    return res.status(200).send({
                        status: 'success',
                        article: articleUpdated
                    });
                });
            } else {
                return res.status(200).send({
                    status: 'success',
                    image: file_name
                });
            }

        }
    }, //end upload file

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: ' La imagen no existe!!'
                });
            }
        });
    },

    search: (req, res) => {
        //sacar el string a buscar
        var searchString = req.params.search;

        //find or
        Article.find({
            "$or": [
                { "title": { "$regex": searchString, "$options": "i" } },
                { "content": { "$regex": searchString, "$options": "i" } },

            ]
        })
            .sort([['date', 'descending']])
            .exec((err, articles) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la peticion'
                    });

                }
                if (!articles || articles.length <= 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay articulos que coincidan con tu busqueda!!'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    articles
                });
            })
    }
};

module.exports = controller;