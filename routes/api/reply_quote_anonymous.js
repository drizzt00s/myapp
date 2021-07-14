var express = require('express');
const nodemailer = require("nodemailer");
var router = express.Router();

router.post("/", function(req, res, next){

    const adminName = req.session.adminData.account;
    const adminMail = req.session.adminData.adminMail;
    const adminN = req.session.adminData.name;


    const replay = req.body.replay;
    const unregisted_mail = req.body.unregisted_mail;
    const username = req.body.username;
    const quoteContents = req.body.quoteContents;


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
            subject: "Yogel:About Your quote ✔", // Subject line
            // text: replay, // plain text body
            html: "<div style='width:70%;margin:0 auto;'>"+
                "Dear "+ "<b>"  + username  + "</b>" + "<br />" +
                "<p>" + "About your quote" + "</p>" +
                "<p>" + quoteContents  + "</p>" +
                "<p>" +  "here is the replay:"  + "</p>" +
                "<p>" +  replay  + "</p>" +
                "<p>" +  "And you may register for more assistance"  + "</p>" +
                "<p>" +  "If you have more questions about this product, feel free to contact us." + "</p>" +
                "<p>" + "by " + adminN+ " Yogel.com" + "</p>" +
                "</div>"

        },function(err){
            if(err){
                console.log(err);
            }
            res.send({
                code:1,
                data:'mail sent'
            });
        });

        console.log("Message sent");
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);













    // var question = req.body.question;
    // var mail = req.body.acc_email;
    // var img = req.body.img;
    // var pd_des = req.body.pd_des;
    // var url = req.body.url;
    // var pid = req.body.pid;

    // var sqlValue = [question,img,pd_des,"null",mail,"null",url,pid];
    // var sql = "INSERT INTO ques (ques,img,pd_des,answ,ques_user,ques_admin,url,pid) VALUES(?,?,?,?,?,?,?,?)";
    //
    // var pool = global.pool ? global.pool :utility.createConnectionPool(
    //     db_config.host,
    //     db_config.username,
    //     db_config.password,
    //     db_config.port,
    //     db_config.database,db_config.pool);
    //
    // pool.getConnection(function(err,connection){
    //     if(err){
    //         throw err;
    //     }
    //     connection.query(sql,sqlValue,function(err, result){
    //         if(err){
    //             throw err;
    //         }
    //         connection.release();
    //         res.send({
    //             code:1,
    //             data:"You problem has been submit."
    //         });
    //     })
    // });







});
module.exports = router;