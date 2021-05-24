var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.post('/', function(req, res, next) {
    const data = req.body;
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('app', 'root', 'YES',  {
        host: 'localhost',    //数据库地址,默认本机
        port:'3306',
        dialect: 'mysql',
        pool: {   //连接池设置
            max: 5, //最大连接数
            min: 0, //最小连接数
            idle: 10000
        },
    });

    const emails = sequelize.define('email', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,       //主键
            autoIncrement: true,    //自增
        },

        firstname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull:true
        },
        email: {
            type: Sequelize.STRING,
            allowNull:true
        },
        region: {
            type: Sequelize.STRING,
            allowNull:true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull:true
        },
        subject: {
            type: Sequelize.STRING,
            allowNull:true
        },
        comments: {
            type: Sequelize.TEXT,
            allowNull:true
        }

    }, {
        timestamps: false
    });
    console.log(data);
    emails.create(data).then(function (p) {
        console.log('created.' + JSON.stringify(p));
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