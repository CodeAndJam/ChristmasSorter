"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
// import sgMail = require('@sendgrid/mail');
const Sorter_1 = require("./business/Sorter");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
// import SorterEvent = require('../../Shared/Interfaces/SorterEvent.Interface');
// const SENDGRID_API_KEY = functions.config().sendgrid.key
const GMAIL_PWD = process.env.gmail_pwd;
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/sendEmail', function (req, res) {
    const event = req.body;
    console.log(event);
    const emailList = Sorter_1.sortEventMembers(event.members);
    for (const e of emailList) {
        //sendEmailer(GMAIL_PWD,event.name, event.date, event.templateBody, e);
    }
});
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=Index.js.map