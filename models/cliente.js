/*jslint node: true */
"use strict";
/**
 * Define el modelo de un proyecto
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    //Se definen los campos de un examen
    return sequelize.define("Cliente", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nit: {
            type: DataTypes.STRING(30),
            field: 'nit',
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(250),
            field: 'nombre',
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            field: 'email',
            allowNull: true
        }

    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                /*db.Cliente.belongsTo(db.Departamento);
                db.Cliente.hasMany(db.Tarea);*/
            },
            save: function(model) {
                return db.Cliente.findById(model.id).then(function(modelAnt) {
                    if (modelAnt)
                        return modelAnt.update(model);
                    else
                        return db.Cliente.create(model);
                });
            }
        }
    });
};
