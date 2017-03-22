/*jslint node: true */
"use strict";
/**
 * Define el modelo de un Elemento
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    //Se definen los campos de un examen
    return sequelize.define("Elemento", {
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
        tipo: {
            type: DataTypes.STRING(1),
            field: 'estado',
            allowNull: true
        }
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                db.Elemento.belongsTo(db.Categoria);
                db.Elemento.hasMany(db.Costo);
            },
            save: function(model) {
                return db.Elemento.findById(model.id).then(function(modelAnt) {
                    if (modelAnt)
                        return modelAnt.update(model);
                    else
                        return db.Elemento.create(model);
                });
            }
        }
    });
};
