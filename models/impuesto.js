/*jslint node: true */
"use strict";
/**
 * Define el modelo de una Impuesto
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    //Se definen los campos de un examen
    return sequelize.define("Impuesto", {
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
        indirecto: {
            type: DataTypes.DECIMAL(3,2),
            field: 'indirecto',
             allowNull: false
        },
		impuesto: {
		    type: DataTypes.DECIMAL(3,2),
			field:'impuesto',
			allowNull:false
		}
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                //db.Registro.belongsTo(db.Tarea);
            },
            save: function(model) {
                return db.Impuesto.findById(model.id).then(function(modelAnt) {
                    if (modelAnt)
                        return modelAnt.update(model);
                    else
                        return db.Impuesto.create(model);
                });
            }
        }
    });
};
