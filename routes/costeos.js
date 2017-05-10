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
    db.Costeo.findById(req.params.id).then(function(resp) {
        return res.send(resp);
    }).catch(next);
});

router.get('/', function(req, res, next) {
    db.Costeo.findAll().then(function(resp) {
        return res.send(resp);
    }).catch(next);
});



/**
 * Define el comportamiento de un Get enviado a la ruta 'proyecto/:id' para obtener Todos los proyectos
 */
router.delete('/:id', function(req, res, next) {
    db.Costeo.findById(req.params.id).then(function(costeoEliminado) {
        if (costeoEliminado) {
            return costeoEliminado.destroy().then(function() {
                return res.send('OK');
            });
        } else {
            return res.send('OK');
        }
    }).catch(next);
});


router.post('/', function(req, res, next) {

    var data = utils.getterFromPost(req);
    var costeoEmulado = {
        id: data.get('id'),
        nombre: data.get('nombre', 'Debe seleccionar un nombre para el costeo.'),
        requerimiento: data.get('requerimiento', 'Debe seleccionar un requerimiento para el costeo.'),
        estado: data.get('estado', 'Debe seleccionar un estado para el costeo.'),
        costoFinal: data.get('costoFinal', 'Debe seleccionar un costoFinal para el costeo.'),
        precioVenta: data.get('precioVenta', 'Debe seleccionar un precioVenta para el costeo.'),
        nota: data.get('nota', 'Debe seleccionar un nota para el costeo.'),
        ClienteId: data.get('ClienteId', 'Debe seleccionar un ClienteId para el costeo.'),
        ProcesoId: data.get('ProcesoId', 'Debe seleccionar un ProcesoId para el costeo.')
    };

    db.Costeo.save(costeoEmulado).then(function(costeoActualizado) {
        res.send(costeoActualizado);
    }).catch(next);

});


router.get('/:id/categoriasAll', function(req, res, next) {
    db.Costeo.findAll({
        include: [{
            model: db.Categoriacosteo,
            include: [{
                model: db.Elementocosteo,
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
    }).then(function(costeos) {
        return costeos;
    }).then(costeos => {
        const resObj = costeos.map(costeos => {
                return Object.assign({}, {
                    id: costeos.id,
                    nombre: costeos.nombre,
                    descripcion: costeos.descripcion,
                    categorias: costeos.Categoriacosteos.map(categoria => {
                        return Object.assign({}, {
                            id: categoria.id,
                            CosteoId: categoria.CosteoId,
                            CategoriumId: categoria.CategoriumId,
                            categoriaNbr: categoria.Categorium.nombre,
                            elementos: categoria.Elementocosteos.map(elemento => {
                                return Object.assign({}, {
                                    id: elemento.id,
                                    CategoriacosteoId: elemento.CategoriacosteoId,
                                    ElementoId: elemento.ElementoId,
                                    elemmentoNbr: elemento.Elemento.nombre
                                })
                            })
                        })
                    })
                })
            })
            //res.send(costeos)
            //console.log(resObj);
        res.send(resObj);
    }).catch(next);

});


module.exports = router;
