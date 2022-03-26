var DataTypes = require("sequelize").DataTypes;
var _configuracion_productos = require("./configuracion_productos");
var _inventario = require("./inventario");
var _menu = require("./menu");
var _menu_cliente = require("./menu_cliente");
var _registro_clientes = require("./registro_clientes");
var _rol = require("./rol");
var _users = require("./users");

function initModels(sequelize) {
  var configuracion_productos = _configuracion_productos(sequelize, DataTypes);
  var inventario = _inventario(sequelize, DataTypes);
  var menu = _menu(sequelize, DataTypes);
  var menu_cliente = _menu_cliente(sequelize, DataTypes);
  var registro_clientes = _registro_clientes(sequelize, DataTypes);
  var rol = _rol(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  menu_cliente.belongsTo(configuracion_productos, { as: "configuracion", foreignKey: "configuracion_id"});
  configuracion_productos.hasMany(menu_cliente, { as: "menu_clientes", foreignKey: "configuracion_id"});
  menu_cliente.belongsTo(menu, { as: "id_menu_menu", foreignKey: "id_menu"});
  menu.hasMany(menu_cliente, { as: "menu_clientes", foreignKey: "id_menu"});
  menu_cliente.belongsTo(registro_clientes, { as: "cliente", foreignKey: "cliente_id"});
  registro_clientes.hasMany(menu_cliente, { as: "menu_clientes", foreignKey: "cliente_id"});
  users.belongsTo(rol, { as: "rol", foreignKey: "rol_id"});
  rol.hasMany(users, { as: "users", foreignKey: "rol_id"});
  menu.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(menu, { as: "menus", foreignKey: "user_id"});
  registro_clientes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(registro_clientes, { as: "registro_clientes", foreignKey: "user_id"});

  return {
    configuracion_productos,
    inventario,
    menu,
    menu_cliente,
    registro_clientes,
    rol,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
