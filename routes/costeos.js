var allow = require('../services/allow');
var utils = require('../services/utils');
var db = require('../models');
var Promise = require('bluebird');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var moment = require('moment');
var multer = require('multer');
var FS = require('fs');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'views/img/costeos');
        //console.log(req.body);
        //callback(null, 'C:/Users/JoséLuis/Desktop/workspace/Img');
    },
    filename: function(req, file, callback) {
        //callback(null, file.fieldname + '-' + Date.now()+'.'+file.originalname.split('.')[file.originalname.split('.').length -1]);
        //callback(null, file.originalname);
        callback(null, req.body.id);
    }
});

var upload = multer({
    storage: storage
}).single('file');


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

router.post('/filtro', function(req, res, next) {

    var data = utils.getterFromPost(req);
    var nombre = data.get('nombre');
    var requerimiento = data.get('requerimiento');
    var ClienteId = data.get('ClienteId');
    var ProcesoId = data.get('ProcesoId');
    var fecha = data.get('fecha');
    var rangoCliente = [0,999999999];
    var rangoProceso = [0,999999999];

    if(!nombre){
        nombre ='%';
    }else{
        nombre = nombre+'%';
    }

    if(!requerimiento){
        requerimiento ='%';
    }else{
        requerimiento = requerimiento+'%';
    }

    if(ClienteId){
        rangoCliente[0] = ClienteId;
        rangoCliente[1] = ClienteId;
    }

    if(ProcesoId){
        rangoProceso[0] = ProcesoId;
        rangoProceso[1] = ProcesoId;
    }

    db.Costeo.findAll({
        include: [{
            model: db.Proceso,
        },{
            model: db.Cliente,
        }],
        where: {
            $and: [
            {nombre: {
                  $like: nombre
              }},
              {requerimiento: {
                    $like: requerimiento
                }},
            {ClienteId: {
                $between: rangoCliente
            }},
            {ProcesoId: {
                $between: rangoProceso
            }}
        ]}
    }).then(function(costeos) {
        return costeos;
    }).then(costeos => {
            res.send(costeos)
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


router.post('/file', function(req, res, next) {
 upload(req, res, function(err) {
     console.log(req.body);
     if (err) {
         res.json({
             error_code: 1,
             err_desc: err
         });
         return;
    }
     res.json({error_code:0,err_desc:null});
});
 console.log(upload);
});

module.exports = router;
