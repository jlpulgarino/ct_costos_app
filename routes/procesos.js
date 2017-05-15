var allow = require('../services/allow');
var utils = require('../services/utils');
var db = require('../models');
var Promise = require('bluebird');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var moment = require('moment');

router.get('/:id', function(req, res, next) {
    db.Proceso.findById(req.params.id).then(function(resp) {
        return res.send(resp);
    }).catch(next);
});

router.get('/', function(req, res, next) {
    db.Proceso.findAll().then(function(resp) {
        return res.send(resp);
    }).catch(next);
});



/**
 * Define el comportamiento de un Get enviado a la ruta 'proyecto/:id' para obtener Todos los proyectos
 */
router.delete('/:id', function(req, res, next) {
    db.Proceso.findById(req.params.id).then(function(categoriaEliminado) {
        if (categoriaEliminado) {
            return categoriaEliminado.destroy().then(function() {
                return res.send('OK');
            });
        } else {
            return res.send('OK');
        }
    }).catch(next);
});


router.post('/', function(req, res, next) {

    var data = utils.getterFromPost(req);
    var categoriaEmulado = {
        id: data.get('id'),
        nombre: data.get('nombre', 'Debe seleccionar un nombre para el proceso.'),
        descripcion: data.get('descripcion', 'Debe digiitar una descripcion para el proceso.'),
        indirecto: data.get('indirecto', 'Debe digiitar un indirecto para el proceso.'),
        impuesto: data.get('impuesto', 'Debe digiitar un impuesto para el proceso.')

    };

    db.Proceso.save(categoriaEmulado).then(function(categoriaActualizado) {
        res.send(categoriaActualizado);
    }).catch(next);

});


router.get('/:id/categoriasAll', function(req, res, next) {
    db.Proceso.findAll({
        include: [{
            model: db.Categoriaproceso,
            include: [{
                model: db.Elementoproceso,
                include: [{
                    model: db.Elemento
                }]
            },{
                model: db.Categoria
            }]
        }],
			where: {
				id: req.params.id
				}
    }).then(function(procesos) {
        return procesos;
    }).then(procesos => {
        const resObj = procesos.map(procesos => {
                return Object.assign({}, {
                    id: procesos.id,
                    nombre: procesos.nombre,
                    descripcion: procesos.descripcion,
                    categorias: procesos.Categoriaprocesos.map(categoria => {
                        return Object.assign({}, {
                            id: categoria.id,
                            ProcesoId: categoria.ProcesoId,
                            CategoriumId: categoria.CategoriumId,
                            categoriaNbr: categoria.Categorium.nombre,
                            tipo: categoria.Categorium.tipo,
                            elementos: categoria.Elementoprocesos.map(elemento => {
                                return Object.assign({}, {
                                    id: elemento.id,
                                    CategoriaprocesoId: elemento.CategoriaprocesoId,
                                    ElementoId: elemento.ElementoId,
                                    elemmentoNbr: elemento.Elemento.nombre
                                })
                            })
                        })
                    })
                })
            })
            //res.send(procesos)
            //console.log(resObj);
        res.send(resObj);
    }).catch(next);

});


module.exports = router;
