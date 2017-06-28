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
    db.Elemento.findById(req.params.id).then(function(resp) {
        return res.send(resp);
    }).catch(next);
});

router.get('/', function(req, res, next) {
    db.Elemento.findAll().then(function(resp) {
        return res.send(resp);
    }).catch(next);
});



/**
 * Define el comportamiento de un Get enviado a la ruta 'proyecto/:id' para obtener Todos los proyectos
 */
router.delete('/:id', function(req, res, next) {
    db.Elemento.findById(req.params.id).then(function(elementoEliminado) {
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
    var elementoEmulado = {
        id: data.get('id'),
        nombre: data.get('nombre', 'Debe seleccionar un nombre para la elemento.'),
        descripcion: data.get('descripcion', 'Debe digiitar una descripcion para la elemento.'),
        tipo: data.get('tipo', 'Debe seleccionar un tipo de elemento.'),
        CategoriumId: data.get('CategoriumId', 'Debe seleccionar una categoria de elemento.')
    };

    db.Elemento.save(elementoEmulado).then(function(elementoActualizado) {
        res.send(elementoActualizado);
    }).catch(next);

});

router.get('/:idElm/costos', function(req, res, next) {
    db.Elemento.findAll({
        include: [{
            model: db.Costo
        }],
        where: {
            id: req.params.idElm
        }
    }).then(function(resp) {
        return res.send(resp);
    }).catch(next);
});

router.get('/:idElm/costo', function(req, res, next) {
    db.sequelize.query('SELECT * FROM public.costoelmindvw where  id = :idelm ',
    { replacements: { idelm: req.params.idElm }}).then(function(resp) {
        return res.send(resp[0]);
    }).catch(next);
});

module.exports = router;
