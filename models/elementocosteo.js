/*jslint node: true */
"use strict";
/**
 * Define el modelo de un Elementocosteo
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    //Se definen los campos de un examen
    return sequelize.define("Elementocosteo", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        costoIni1: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'costoIni1',
            allowNull: false
        },
        costoIni2: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'costoIni2',
            allowNull: false
        },
        costoIni3: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'costoIni3',
            allowNull: false
        },
        costoCmrc1: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'costoCmrc1',
            allowNull: true
        },
        costoCmrc2: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'costoCmrc2',
            allowNull: true
        },
        costoCmrc3: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'costoCmrc3',
            allowNull: true
        },
        costoReal1: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'costoReal1',
            allowNull: true
        },
        unidades: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'unidades',
            allowNull: true
        }
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                db.Elementocosteo.belongsTo(db.Costeo);
                db.Elementocosteo.belongsTo(db.Elementoproceso);
            },
            save: function(model) {
                return db.Elementocosteo.findById(model.id).then(function(modelAnt) {
                    if (modelAnt)
                        return modelAnt.update(model);
                    else
                        return db.Elementocosteo.create(model);
                });
            }
        }
    });
};
