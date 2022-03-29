const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu', {
    id_menu: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    proteina: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    sopa: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    carbohidrato: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    ensalada: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    postre: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    jugo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    tipo_menu_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_menu',
        key: 'tipo_menu_id'
      }
    }
  }, {
    sequelize,
    tableName: 'menu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_menu" },
        ]
      },
      {
        name: "IX_Relationship4",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "IX_Relationship10",
        using: "BTREE",
        fields: [
          { name: "tipo_menu_id" },
        ]
      },
    ]
  });
};
