/*jslint node: true */
"use strict";
/**
 * Define el modelo de un Costeo
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    //Se definen los campos de un examen
    return sequelize.define("Costeo", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            field: 'nombre',
            allowNull: false
        },
        requerimiento: {
            type: DataTypes.STRING(50),
            field: 'requerimiento',
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING(50),
            field: 'estado',
            allowNull: false
        },
        unidad1: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'unidad1',
            allowNull: false
        },
        unidad2: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'unidad2',
            allowNull: false
        },
        unidad3: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'unidad3',
            allowNull: false
        },
        costoFinal1: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'costoFinal1',
            allowNull: false
        },
        costoFinal2: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'costoFinal2',
            allowNull: false
        },
        costoFinal3: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'costoFinal3',
            allowNull: false
        },
        precioVenta: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'precioVenta',
            allowNull: false
        },
        nota: {
            type: DataTypes.STRING(254),
            field: 'nota',
            allowNull: false
        }
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                db.Costeo.belongsTo(db.Cliente);
                db.Costeo.belongsTo(db.Proceso);
                db.Costeo.hasMany(db.Elementocosteo);
            },
            save: function(model) {
                return db.Costeo.findById(model.id).then(function(modelAnt) {
                    if (modelAnt)
                        return modelAnt.update(model);
                    else
                        return db.Costeo.create(model);
                });
            }
        }
    });
};
