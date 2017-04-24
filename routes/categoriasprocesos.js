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
    db.Categoriaproceso.findById(req.params.id).then(function(resp) {
        return res.send(resp);
    }).catch(next);
});

router.get('/', function(req, res, next) {
    db.Categoriaproceso.findAll().then(function(resp) {
        return res.send(resp);
    }).catch(next);
});



/**
 * Define el comportamiento de un Get enviado a la ruta 'proyecto/:id' para obtener Todos los proyectos
 */
router.delete('/:id', function(req, res, next) {
    db.Categoriaproceso.findById(req.params.id).then(function(categoriaEliminado) {
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
        
    };

    db.Categoriaproceso.save(categoriaEmulado).then(function(categoriaActualizado) {
        res.send(categoriaActualizado);
    }).catch(next);

});




module.exports = router;
