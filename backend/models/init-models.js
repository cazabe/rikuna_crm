var DataTypes = require("sequelize").DataTypes;
var _ingreso = require("./ingreso");
var _inventario = require("./inventario");
var _menu = require("./menu");
var _orden = require("./orden");
var _rol = require("./rol");
var _tipo_menu = require("./tipo_menu");
var _users = require("./users");

function initModels(sequelize) {
  var ingreso = _ingreso(sequelize, DataTypes);
  var inventario = _inventario(sequelize, DataTypes);
  var menu = _menu(sequelize, DataTypes);
  var orden = _orden(sequelize, DataTypes);
  var rol = _rol(sequelize, DataTypes);
  var tipo_menu = _tipo_menu(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  ingreso.belongsTo(orden, { as: "id_menu_cliente_orden", foreignKey: "id_menu_cliente"});
  orden.hasMany(ingreso, { as: "ingresos", foreignKey: "id_menu_cliente"});
  users.belongsTo(rol, { as: "rol", foreignKey: "rol_id"});
  rol.hasMany(users, { as: "users", foreignKey: "rol_id"});
  menu.belongsTo(tipo_menu, { as: "tipo_menu", foreignKey: "tipo_menu_id"});
  tipo_menu.hasMany(menu, { as: "menus", foreignKey: "tipo_menu_id"});
  orden.belongsTo(tipo_menu, { as: "tipo_menu", foreignKey: "tipo_menu_id"});
  tipo_menu.hasMany(orden, { as: "ordens", foreignKey: "tipo_menu_id"});
  menu.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(menu, { as: "menus", foreignKey: "user_id"});

  return {
    ingreso,
    inventario,
    menu,
    orden,
    rol,
    tipo_menu,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
