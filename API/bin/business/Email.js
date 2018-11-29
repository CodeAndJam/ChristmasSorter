"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const pug_1 = __importDefault(require("pug"));
class Emailer {
    sendEmailer(pwd, event, recipient) {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'christmassorter@gmail.com',
                pass: pwd
            }
        });
        const currency = event.currency ? event.currency : "�";
        const mailOptions = {
            from: "christmassorter@gmail.com",
            to: recipient.from.email,
            subject: event.name,
            html: pug_1.default.renderFile('./business/mail.pug', {
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
    }
}
exports.default = Emailer;
//# sourceMappingURL=Email.js.map