const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ingreso', {
    id_ingreso: {
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
    valor_a_pagar: {
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
      allowNull: false,
      comment: "P: para pendiente y A: para acreditado o pagado"
    }
  }, {
    sequelize,
    tableName: 'ingreso',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_ingreso" },
        ]
      },
      {
        name: "IX_Relationship8",
        using: "BTREE",
        fields: [
          { name: "cliente_id" },
        ]
      },
    ]
  });
};
