var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
const nodemailer = require("nodemailer");
var router = express.Router();

router.post("/", function(req, res, next){


    var mail = req.body.mail;


    var sql = "SELECT email FROM user WHERE email=" + "'" + mail +"'";

    var pool = global.pool ? global.pool :utility.createConnectionPool(
        db_config.host,
        db_config.username,
        db_config.password,
        db_config.port,
        db_config.database,db_config.pool);


    pool.getConnection(function(err,connection) {
        if (err) {
            throw err;
        }
        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            }
            connection.release();
            if(result.length <= 0){
                res.send({
                    code:1,
                    data:"The mail you entered doesn't exist."
                });
            } else {



                const adminMail = "drizzt79s@163.com";
                // const adminN = "Yogel";

                const replay = "Please click the following link to rest your password:";
                const userResetPassLink =  utility.creatUserResetPassLink(mail);
                const unregisted_mail = mail;


                // const username = req.body.username;
                // const quoteContents = req.body.quoteContents;
                // const quoteNumber = req.body.quoteNumber;



                async function main() {
                    let transporter = nodemailer.createTransport({
                        service:"163",
                        port: 465,
                        secureConnection:true,
                        auth: {
                            user: adminMail,
                            pass: 'RZLPIYVKRRHNSEQR' // act code, not mail password
                        }
                    });

                    let info = await transporter.sendMail({
                        from:  adminMail,   // this value must be the same as auth.user above.
                        to: unregisted_mail, // list of receivers
                        subject: "Yogel:reset your password" + "✔", // Subject line
                        // text: replay, // plain text body
                        html: "<div style='width:70%;margin:0 auto;'>"+
                            "Dear "+ "<b>"  + mail  + "</b>" + "<br />" +
                            "<p>"+ replay +"</p>"+
                            "<a href=" + userResetPassLink + ">reset your password</a>"+
                            "</div>"

                    },function(err){
                        if(err){
                            // console.log(err);
                            // console.log("send mail again..")
                            res.send({
                                code:1,
                                data:'发送邮件失败，请重试。'
                            });

                        } else{
                            res.send({
                                code:1,
                                data:"We have sent a link to your email box. Please log into your mail and click the link to reset your password."
                            });
                        }
                    });


                    console.log("Message sent: %s", info.messageId);
                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                    // Preview only available when sending through an Ethereal account
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                }

                main().catch(console.error);

            }
        })

    })


});
module.exports = router;