/*jslint node: true */
"use strict";
/**
 * Define el modelo de un Proceso
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    //Se definen los campos de un examen
    return sequelize.define("Proceso", {
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
        descripcion: {
            type: DataTypes.STRING(100),
            field: 'descripcion',
            allowNull: true
        },
        indirecto: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'indirecto',
            allowNull: false
        },
        impuesto: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'impuesto',
            allowNull: false
        }
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                db.Proceso.hasMany(db.Categoriaproceso);
            },
            save: function(model) {
                return db.Proceso.findById(model.id).then(function(modelAnt) {
                    if (modelAnt)
                        return modelAnt.update(model);
                    else
                        return db.Proceso.create(model);
                });
            }
        }
    });
};
