var allow = require('../services/allow');
var utils = require('../services/utils');
var db = require('../models');
var Promise = require('bluebird');
var express = require('express');
var router = express.Router();
var bcrypt   = require('bcrypt-nodejs');
var passport = require('passport');
var moment = require('moment');

router.get('/:id', function(req, res, next) {
    db.Costo.findById(req.params.id).then(function(resp) {
        return res.send(resp);
    }).catch(next);
});

router.get('/', function(req, res, next) {
    db.Costo.findAll().then(function(resp) {
        return res.send(resp);
    }).catch(next);
});



/**
 * Define el comportamiento de un Get enviado a la ruta 'proyecto/:id' para obtener Todos los proyectos
 */
router.delete('/:id', function(req, res, next) {
    db.Costo.findById(req.params.id).then(function(costoEliminado) {
        if (costoEliminado) {
            return costoEliminado.destroy().then(function() {
                return res.send('OK');
            });
        } else {
            return res.send('OK');
        }
    }).catch(next);
});


router.post('/', function(req, res, next) {

    var data = utils.getterFromPost(req);
    var costoEmulado = {
        id: data.get('id'),
        effdt: data.get('effdt', 'Debe seleccionar una fecha para el costo.'),
        valor: data.get('valor', 'Debe digitar un valor para el costo.'),
        ElementoId: data.get('ElementoId', 'Debe seleccionar un elemento de costo.')
    };

    db.Costo.save(costoEmulado).then(function(costoActualizado) {
        res.send(costoActualizado);
    }).catch(next);

});


module.exports = router;
