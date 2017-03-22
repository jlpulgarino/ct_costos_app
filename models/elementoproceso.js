/*jslint node: true */
"use strict";
/**
 * Define el modelo de un Elementoproceso
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    //Se definen los campos de un examen
    return sequelize.define("Elementoproceso", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                //db.Proyecto.hasMany(db.Subproyecto);
            },
            save: function(model) {
                return db.Elementoproceso.findById(model.id).then(function(modelAnt) {
                    if (modelAnt)
                        return modelAnt.update(model);
                    else
                        return db.Elementoproceso.create(model);
                });
            }
        }
    });
};
