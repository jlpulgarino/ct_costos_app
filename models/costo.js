/*jslint node: true */
"use strict";
/**
 * Define el modelo de una Costo
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    //Se definen los campos de un examen
    return sequelize.define("Costo", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        effdt: {
            type: DataTypes.DATE,
            field: 'effdt',
            allowNull: false
        },
        valor: {
            type: DataTypes.DECIMAL(10,2),
            field: 'valor',
            allowNull: false
        }
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                db.Costo.belongsTo(db.Elemento);
            },
            save: function(model) {
                return db.Costo.findById(model.id).then(function(modelAnt) {
                    if (modelAnt)
                        return modelAnt.update(model);
                    else
                        return db.Costo.create(model);
                });
            }
        }
    });
};
