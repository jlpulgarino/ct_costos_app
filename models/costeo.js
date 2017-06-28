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
        unidad1: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'unidad1',
            allowNull: false
        },
        unidad2: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'unidad2',
            allowNull: false
        },
        unidad3: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'unidad3',
            allowNull: false
        },
        totalI1: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'totalI1',
            allowNull: false
        },
        totalI2: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'totalI2',
            allowNull: false
        },
        totalI3: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'totalI3',
            allowNull: false
        },
        totalC1: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'totalC1',
            allowNull: true
        },
        totalC2: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'totalC2',
            allowNull: true
        },
        totalC3: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'totalC3',
            allowNull: true
        },
        totalCR: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'totalCR',
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
        },
        prcVenta1: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'prcVenta1',
            allowNull: true
        },
        prcVenta2: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'prcVenta2',
            allowNull: true
        },
        prcVenta3: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'prcVenta3',
            allowNull: true
        },
        nota: {
            type: DataTypes.STRING(254),
            field: 'nota',
            allowNull: true
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
