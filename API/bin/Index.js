"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
// import sgMail = require('@sendgrid/mail');
const Sorter_1 = __importDefault(require("./business/Sorter"));
const Email_1 = __importDefault(require("./business/Email"));
const dotenv = require("dotenv");
const bodyParser = __importStar(require("body-parser"));
const sort = new Sorter_1.default();
const email = new Email_1.default();
dotenv.load();
const app = express();
const port = process.env.PORT;
const GMAIL_PWD = process.env.GMAIL_PWD;
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/sendEmail', jsonParser, function (req, res) {
    const event = req.body;
    const emailList = sort.sortEventMembers(event.members);
    for (const e of emailList) {
        email.sendEmailer(GMAIL_PWD, event, e);
    }
    res.send('All participants were notified of their secret! ');
});
app.listen(port, () => console.log(`App listening on  localhost:${port}!`));
//# sourceMappingURL=Index.js.map