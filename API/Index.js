"use strict";
exports.__esModule = true;
var express = require('express');
// import sgMail = require('@sendgrid/mail');
var Sorter_1 = require("./business/Sorter");
var Email_1 = require("./business/Email");
var dotenv = require("dotenv");
var bodyParser = require("body-parser");
var sort = new Sorter_1["default"]();
var email = new Email_1["default"]();
dotenv.load();
var app = express();
var port = process.env.PORT;
var GMAIL_PWD = process.env.GMAIL_PWD;
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get('/', function (req, res) { return res.send('Hello World!'); });
app.post('/sendEmail', jsonParser, function (req, res) {
    var event = req.body;
    var emailList = sort.sortEventMembers(event.members);
    for (var _i = 0, emailList_1 = emailList; _i < emailList_1.length; _i++) {
        var e = emailList_1[_i];
        email.sendEmailer(GMAIL_PWD, event, e);
    }
    res.send('All participants were notified of their secret! ');
});
app.listen(port, function () { return console.log("App listening on  localhost:" + port + "!"); });
