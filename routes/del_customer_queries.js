var express = require('express');
var utility = require("../public/javascripts/utility");
var db_config = require("./db/db_config");
var db_table = require("./db/db_table");
var router = express.Router();

router.post('/', function(req, res, next) {
    const data = req.body;
    var listId = data.listId;
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize(db_config.database, db_config.username, db_config.password,  {
        host: db_config.host,    //数据库地址,默认本机
        port:db_config.port,
        dialect: db_config.dialect,
        pool: db_config.pool,
    });

    const emails = sequelize.define('email', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,       //主键
            autoIncrement: true,    //自增
        },

        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull:false
        },
        email: {
            type: Sequelize.STRING,
            allowNull:false
        },
        // region: {
        //     type: Sequelize.STRING,
        //     allowNull:false
        // },
        phone: {
            type: Sequelize.STRING,
            allowNull:false
        },
        subject: {
            type: Sequelize.STRING,
            allowNull:false
        },
        comments: {
            type: Sequelize.TEXT,
            allowNull:false
        },
        adminupdates: {
            type: Sequelize.TEXT,
            allowNull:true
        }

    }, {
        timestamps: false
    });
    emails.destroy({
        where: {
            id:listId
        }
    }).then(function (p) {
        console.log(p);
        res.send({
            code:1
        });
    }).catch(function (err) {
        throw err;
    });


    // sequelize
    //     .authenticate()
    //     .then(() => {
    //         console.log('Connection has been established successfully.');
    //     })
    //     .catch(err => {
    //         console.error('Unable to connect to the database:', err);
    //     });
    //测试是否连接成功
});

module.exports = router;