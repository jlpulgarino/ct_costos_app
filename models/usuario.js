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
    return sequelize.define("Usuario", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        usuario: {
            type: DataTypes.STRING(30),
            field: 'usuario',
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(250),
            field: 'nombre',
            allowNull: false
        },
        rol: {
            type: DataTypes.STRING(1),
            field: 'rol',
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            field: 'email',
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(100),
            field: 'password',
            allowNull: true
        }

    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                /*db.Usuario.belongsTo(db.Departamento);
                db.Usuario.hasMany(db.Tarea);*/
            },
            save: function(model) {
                return db.Usuario.findById(model.id).then(function(modelAnt) {
                    if (modelAnt)
                        return modelAnt.update(model);
                    else
                        return db.Usuario.create(model);
                });
            }
        }
    });
};
