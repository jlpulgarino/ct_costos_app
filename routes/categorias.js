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
    db.Categoria.findById(req.params.id).then(function(resp) {
        return res.send(resp);
    }).catch(next);
});

router.get('/', function(req, res, next) {
    db.Categoria.findAll().then(function(resp) {
        return res.send(resp);
    }).catch(next);
});



/**
 * Define el comportamiento de un Get enviado a la ruta 'proyecto/:id' para obtener Todos los proyectos
 */
router.delete('/:id', function(req, res, next) {
    db.Categoria.findById(req.params.id).then(function(categoriaEliminado) {
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
        nombre: data.get('nombre', 'Debe seleccionar un nombre para la categoria.'),
        descripcion: data.get('descripcion', 'Debe digiitar una descripcion para la categoria.'),
        tipo: data.get('tipo', 'Debe seleccionar un tipo de categoria.')
    };

    db.Categoria.save(categoriaEmulado).then(function(categoriaActualizado) {
        res.send(categoriaActualizado);
    }).catch(next);

});

router.get('/:id/elementos', function(req, res, next) {
    db.Categoria.findAll({
        include: [{
            model: db.Elemento
        }],
        where: {
            id: req.params.id
        }
    }).then(function(resp) {
        return res.send(resp);
    }).catch(next);
});

router.get('/:id/elementosAll', function(req, res, next) {
    db.Categoria.findAll({
        include: [{
            model: db.Elemento,
            include: [{
                model: db.Costo
            }]
        }]
    }).then(function(categorias) {
        return categorias;
    }).then(categorias => {
        const resObj = categorias.map(categoria => {
                return Object.assign({}, {
                    id: categoria.id,
                    nombre: categoria.nombre,
                    descripcion: categoria.descripcion,
                    tipo: categoria.tipo,
                    elementos: categoria.Elementos.map(elemento => {
                        return Object.assign({}, {
                            id: elemento.id,
                            nombre: elemento.nombre,
                            descripcion: elemento.descripcion,
                            tipo: elemento.tipo,
                            costos: elemento.Costos.map(costo => {
                                return Object.assign({}, {
                                    id: costo.id,
                                    effdt: costo.effdt,
                                    valor: costo.valor
                                })
                            })
                        })
                    })
                })
            })
            //res.send(tareas)
            //console.log(resObj);
        res.send(resObj);
    }).catch(next);

});



module.exports = router;
