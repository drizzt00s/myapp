var express = require('express');
var db_config = require("../db/db_config");
var router = express.Router();

router.post('/', function(req, res, next) {
    const data = req.body;
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize(db_config.database, db_config.username, db_config.password,  {
        host: db_config.host,    //数据库地址,默认本机
        port:db_config.port,
        dialect: db_config.dialect,
        pool: db_config.pool,
    });

    const chats = sequelize.define('chat', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,       //主键
            autoIncrement: true,    //自增
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mail: {
            type: Sequelize.STRING,
            allowNull:false
        },
        company: {
            type: Sequelize.STRING,
            allowNull:false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull:false
        },
        department: {
            type: Sequelize.STRING,
            allowNull:false
        }
    }, {
        timestamps: false
    });
    chats.create(data).then(function (p) {
        res.send({
            code:1
        });
    }).catch(function (err) {
        throw err;
    });


});

module.exports = router;