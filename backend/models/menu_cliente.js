const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu_cliente', {
    id_menu_cliente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_cliente: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipo_menu_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_menu',
        key: 'tipo_menu_id'
      }
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    hora_salida: {
      type: DataTypes.DATE,
      allowNull: true
    },
    hora_entrega: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'menu_cliente',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_menu_cliente" },
        ]
      },
      {
        name: "IX_Relationship12",
        using: "BTREE",
        fields: [
          { name: "tipo_menu_id" },
        ]
      },
    ]
  });
};
