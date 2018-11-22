"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
class Emailer {
    sendEmailer(pwd, subject, date, body, recipient) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'christmassorter@gmail.com',
                pass: pwd
            }
        });
        const mailOptions = {
            from: "christmassorter@gmail.com",
            to: recipient.from.email,
            subject: subject,
            html: `Hi there ${recipient.from.name}! 
            You were invited to a Gift Exchange at ${date} named ${subject}. The limit is 5€ and you are to give a gift to ${recipient.to.name}
            
            Best regards and happy gift Exchange!!!
            ` // plain text body
        };
        console.log(mailOptions);
        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err);
            else
                console.log(info);
        });
    }
}
exports.default = Emailer;
//# sourceMappingURL=Email.js.map