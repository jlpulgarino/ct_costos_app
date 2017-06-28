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
    db.Costeo.findAll({
        include: [{
            model: db.Proceso,
        },{
            model: db.Cliente,
        }]
    }).then(function(resp) {
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
        unidad1: data.get('unidad1', 'Debe seleccionar un unidad1 para el costeo.'),
        unidad2: data.get('unidad2', 'Debe seleccionar un unidad2 para el costeo.'),
        unidad3: data.get('unidad3'),
        totalI1: data.get('totalI1'),
        totalI2: data.get('totalI2'),
        totalI3: data.get('totalI3'),
        totalC1: data.get('totalC1'),
        totalC2: data.get('totalC2'),
        totalC3: data.get('totalC3'),
        prcVenta1: data.get('prcVenta1'),
        prcVenta2: data.get('prcVenta2'),
        prcVenta3: data.get('prcVenta3'),
        totalCR: data.get('totalCR'),
        indirecto: data.get('indirecto', 'Debe digitar un indirecto para el proceso.'),
        impuesto: data.get('impuesto', 'Debe digitar un impuesto para el proceso.'),
        precioVenta: data.get('precioVenta'),
        nota: data.get('nota'),
        ClienteId: data.get('ClienteId', 'Debe seleccionar un ClienteId para el costeo.'),
        ProcesoId: data.get('ProcesoId', 'Debe seleccionar un ProcesoId para el costeo.')
    };

    db.Costeo.save(costeoEmulado).then(function(costeoActualizado) {
        res.send(costeoActualizado);
    }).catch(next);

});


router.get('/:id/elementoscosteos', function(req, res, next) {
    db.Costeo.findAll({
        include: [{
            model: db.Elementocosteo,
            include: [{
                model: db.Elemento,
                include: [{
                    model: db.Categoria
                }]
            }]
        }],
			where: {
				id: req.params.id
				}
    }).then(function(costeos) {
        return costeos;
    }).then(costeos => {
        /*const resObj = costeos.map(costeos => {
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
            })*/
            res.send(costeos)
            //console.log(resObj);
        //res.send(resObj);
    }).catch(next);

});


module.exports = router;
