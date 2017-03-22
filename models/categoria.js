/*jslint node: true */
"use strict";
/**
 * Define el modelo de un Categoria
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    //Se definen los campos de un examen
    return sequelize.define("Categoria", {
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
            field: 'tipo',
            allowNull: false
        }
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
				//db.Categoria.belongsTo(db.Categoriaproceso);
                db.Categoria.hasMany(db.Elemento);
            },
            save: function(model) {
                return db.Categoria.findById(model.id).then(function(modelAnt) {
                    if (modelAnt)
                        return modelAnt.update(model);
                    else
                        return db.Categoria.create(model);
                });
            }
        }
    })

};
