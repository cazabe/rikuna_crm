const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu_cliente', {
    id_menu_cliente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'registro_clientes',
        key: 'cliente_id'
      }
    },
    id_menu: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'menu',
        key: 'id_menu'
      }
    },
    configuracion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuracion_menu',
        key: 'configuracion_id'
      }
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
        name: "IX_Relationship5",
        using: "BTREE",
        fields: [
          { name: "cliente_id" },
        ]
      },
      {
        name: "IX_Relationship6",
        using: "BTREE",
        fields: [
          { name: "id_menu" },
        ]
      },
      {
        name: "IX_Relationship7",
        using: "BTREE",
        fields: [
          { name: "configuracion_id" },
        ]
      },
    ]
  });
};
