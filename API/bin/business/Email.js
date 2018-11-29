"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = __importStar(require("nodemailer"));
var pug = __importStar(require("pug"));
var Emailer = /** @class */ (function () {
    function Emailer() {
    }
    Emailer.prototype.sendEmailer = function (pwd, event, recipient) {
        var transporter = nodemailer.createTransport({
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
            html: pug.renderFile('./API/business/mail.pug', {
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
exports.default = Emailer;
//# sourceMappingURL=Email.js.map