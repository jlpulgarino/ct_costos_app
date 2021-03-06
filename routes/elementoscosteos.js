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
    db.Elementocosteo.findById(req.params.id).then(function(resp) {
        return res.send(resp);
    }).catch(next);
});

router.get('/', function(req, res, next) {
    db.Elementocosteo.findAll().then(function(resp) {
        return res.send(resp);
    }).catch(next);
});




/**
 * Define el comportamiento de un Get enviado a la ruta 'proyecto/:id' para obtener Todos los proyectos
 */
router.delete('/:id', function(req, res, next) {
    db.Elementocosteo.findById(req.params.id).then(function(elementoEliminado) {
        if (elementoEliminado) {
            return elementoEliminado.destroy().then(function() {
                return res.send('OK');
            });
        } else {
            return res.send('OK');
        }
    }).catch(next);
});


router.post('/', function(req, res, next) {

    var data = utils.getterFromPost(req);
    console.log('ElemntoId:'+data.get('ElementoId'))
    var elementoEmulado = {
        id: data.get('id'),
        valor: data.get('valor'),
        costoIni1: data.get('costoIni1', 'Debe ingresar una costoIni1 de costeo'),
        costoIni2: data.get('costoIni2', 'Debe ingresar una costoIni2 de costeo'),
        costoIni3: data.get('costoIni3', 'Debe ingresar una costoIni3 de costeo'),
        costoCmrc1: data.get('costoCmrc1'),
        costoCmrc2: data.get('costoCmrc2'),
        costoCmrc3: data.get('costoCmrc3'),
        costoReal1: data.get('costoReal1'),
        CosteoId: data.get('CosteoId', 'Debe ingresar una CosteoId de costeo'),
        ElementoId: data.get('ElementoId', 'Debe ingresar una ElementoId de costeo')
    };

    db.Elementocosteo.save(elementoEmulado).then(function(elementoActualizado) {
        res.send(elementoActualizado);
    }).catch(next);

});




module.exports = router;
