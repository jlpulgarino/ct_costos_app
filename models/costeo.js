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
        costoFinal: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'costoFinal',
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
