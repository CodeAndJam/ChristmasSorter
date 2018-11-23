"use strict";
exports.__esModule = true;
var express = require('express');
// import sgMail = require('@sendgrid/mail');
var Sorter_1 = require("./business/Sorter");
var Email_1 = require("./business/Email");
var bodyParser = require("body-parser");
var sort = new Sorter_1["default"]();
var email = new Email_1["default"]();
var app = express();
const port = process.env.PORT || '3000';
// const SENDGRID_API_KEY = functions.config().sendgrid.key
var GMAIL_PWD = process.env.GMAIL_PWD;
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.resolve(__dirname, '../React-Ui/build')));

app.post('/sendEmail', jsonParser, function (req, res) {
    var event = req.body;
    var emailList = sort.sortEventMembers(event.members);
    for (var _i = 0, emailList_1 = emailList; _i < emailList_1.length; _i++) {
        var e = emailList_1[_i];
        email.sendEmailer(GMAIL_PWD, event.name, event.date, event.templateBody, e);
    }
    res.send('All participants were notified of their secret! ');
});
 
// All remaining requests return the React app, so it can handle routing.
 app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../React-UI/build', 'index.html'));
  });

app.listen(port, function () { 
    return console.log("Example app listening on port " + port + "!"); 
});
