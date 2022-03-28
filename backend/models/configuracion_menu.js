const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configuracion_menu', {
    configuracion_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    menu: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estado: {
      type: DataTypes.CHAR(1),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'configuracion_menu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "configuracion_id" },
        ]
      },
    ]
  });
};
