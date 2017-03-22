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
    db.Usuario.findById(req.params.id).then(function(resp) {
        return res.send(resp);
    }).catch(next);
});

router.get('/', function(req, res, next) {
    db.Usuario.findAll().then(function(resp) {
        return res.send(resp);
    }).catch(next);
});


router.post('/login', function(req, res, next) {
    var data = utils.getterFromPost(req);
    var usuarioForm = data.get('username', 'Debe seleccionar un usuario para el usuario.');
    var passwordForm = data.get('password', 'Debe seleccionar un password para el usuario.');

    db.Usuario.findAll({
        where: {
            $and: [{
                usuario: {
                    $eq: usuarioForm
                }
            }, {
                password: {
                    $eq: passwordForm
                }
            }]
        }
    }).then(function(resp) {
        return res.send(resp);
    }).catch(next);
});

/**
 * Define el comportamiento de un Get enviado a la ruta 'proyecto/:id' para obtener Todos los proyectos
 */
router.delete('/:id', function(req, res, next) {
    db.Usuario.findById(req.params.id).then(function(usuarioEliminado) {
        if (usuarioEliminado) {
            return usuarioEliminado.destroy().then(function() {
                return res.send('OK');
            });
        } else {
            return res.send('OK');
        }
    }).catch(next);
});


router.post('/', function(req, res, next) {

    var data = utils.getterFromPost(req);
    var contrasena = data.get('password', 'Debe seleccionar un password para el usuario.');
    /*contrasena = bcrypt.hashSync(contrasena, bcrypt.genSaltSync(8), null);*/
    var usuarioEmulado = {
        id: data.get('id'),
        usuario: data.get('usuario', 'Debe seleccionar un usuario para el usuario.'),
        nombre: data.get('nombre', 'Debe seleccionar un nombre para el usuario.'),
        rol: data.get('rol', 'Debe seleccionar un rol para el usuario.'),
        email: data.get('email', 'Debe seleccionar un rol email el usuario.'),
        password: contrasena,
    };

    db.Usuario.save(usuarioEmulado).then(function(usuarioActualizado) {
        res.send(usuarioActualizado);
    }).catch(next);

});


module.exports = router;
