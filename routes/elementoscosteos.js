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
    console.log('CosteoId:'+data.get('CosteoId'))
    var elementoEmulado = {
        id: data.get('id'),
        costoIni1: data.get('costoIni1', 'Debe ingresar una costoIni1 de costeo'),
        costoIni2: data.get('costoIni2', 'Debe ingresar una costoIni2 de costeo'),
        costoCmrc1: data.get('costoCmrc1'),
        costoCmrc2: data.get('costoCmrc2'),
        costoReal1: data.get('costoReal1'),
        costoReal2: data.get('costoReal2'),
        CosteoId: data.get('CosteoId', 'Debe ingresar una CosteoId de costeo'),
        ElementoprocesoId: data.get('ElementoprocesoId', 'Debe ingresar una ElementoprocesoId de costeo')
    };

    db.Elementocosteo.save(elementoEmulado).then(function(elementoActualizado) {
        res.send(elementoActualizado);
    }).catch(next);

});




module.exports = router;
