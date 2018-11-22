"use strict";
exports.__esModule = true;
var nodemailer = require('nodemailer');
var Emailer = /** @class */ (function () {
    function Emailer() {
    }
    Emailer.sendEmailer = function (pwd, subject, date, body, recipient) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'christmassorter@gmail.com',
                pass: pwd
            }
        });
        var mailOptions = {
            from: "christmassorter@gmail.com",
            to: recipient.from.email,
            subject: subject,
            html: "Hi there " + recipient.from.name + "! \n            You were invited to a Gift Exchange at " + date + " named " + subject + ". The limit is 5\u20AC and you are to give a gift to " + recipient.to.name + "\n            \n            Best regards and happy gift Exchange!!!\n            " // plain text body
        };
        console.log(mailOptions);
        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err);
            else
                console.log(info);
        });
    };
    return Emailer;
}());
exports["default"] = Emailer;
