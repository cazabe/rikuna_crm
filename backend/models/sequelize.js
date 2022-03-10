const Sequelize = require('sequelize');

module.exports = {
    sequelize: new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        timezone: '-05:00',
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: {
            dateStrings: true,
            typeCast: function (field, next) {
                if (field.type === 'DATETIME') {
                    return field.string()
                }
                return next()
            },
        },
    })
}