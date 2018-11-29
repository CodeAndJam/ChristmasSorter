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
            html: pug.render("body(style={background: 'red', 'padding': '10px'})\n            div.container(style={background: 'white', 'padding': '10px'})\n                h1(style={\"text-align\": 'center'}) Gift Exchange\n\n                p Hi there #{recipientFromName}!\n\n                p You were invited to a Gift Exchange at #{date} named #{name}. The limit of the gift is #{price}#{currency}, and you are to give a gift to #{recipientToName}.\n\n                p Best regards and happy gift Exchange!!!", {
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