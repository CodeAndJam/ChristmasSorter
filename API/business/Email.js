"use strict";
exports.__esModule = true;
var nodemailer_1 = require("nodemailer");
var pug_1 = require("pug");
var Emailer = /** @class */ (function () {
    function Emailer() {
    }
    Emailer.prototype.sendEmailer = function (pwd, event, recipient) {
        var transporter = nodemailer_1["default"].createTransport({
            service: 'gmail',
            auth: {
                user: 'christmassorter@gmail.com',
                pass: pwd
            }
        });
        var currency = event.currency ? event.currency : "�";
        var mailOptions = {
            from: "christmassorter@gmail.com",
            to: recipient.from.email,
            subject: event.name,
            html: pug_1["default"].renderFile('./business/mail.pug', {
                recipientFromName: recipient.from.name,
                date: event.date,
                price: event.giftPrice,
                name: event.name,
                currency: currency,
                recipientToName: recipient.to.name
            })
        };
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
