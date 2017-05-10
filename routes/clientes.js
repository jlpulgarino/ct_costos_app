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
    db.Cliente.findById(req.params.id).then(function(resp) {
        return res.send(resp);
    }).catch(next);
});

router.get('/', function(req, res, next) {
    db.Cliente.findAll().then(function(resp) {
        return res.send(resp);
    }).catch(next);
});


router.delete('/:id', function(req, res, next) {
    db.Cliente.findById(req.params.id).then(function(clienteEliminado) {
        if (clienteEliminado) {
            return clienteEliminado.destroy().then(function() {
                return res.send('OK');
            });
        } else {
            return res.send('OK');
        }
    }).catch(next);
});


router.post('/', function(req, res, next) {

    var data = utils.getterFromPost(req);
    var clienteEmulado = {
        id: data.get('id'),
        nit: data.get('nit', 'Debe seleccionar un nit para el cliente.'),
        nombre: data.get('nombre', 'Debe seleccionar un nombre para el cliente.'),
        email: data.get('email', 'Debe seleccionar un email el cliente.')
    };

    db.Cliente.save(clienteEmulado).then(function(clienteActualizado) {
        res.send(clienteActualizado);
    }).catch(next);

});


module.exports = router;
