const db_config = {
    database: "rds_mysql_16099qvb",
    username: "lab_1644820068",
    password: "454ebe8be6ea_#@Aa",
    host: "rm-bp1oo27t8762xhlob0o.mysql.rds.aliyuncs.com",
    port: "3306",
    dialect: "mysql",
    pool: {   //连接池设置
        max: 5, //最大连接数
        min: 0, //最小连接数
        idle: 10000
    }
};
module.exports = db_config;

