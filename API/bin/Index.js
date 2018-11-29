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
var express_1 = __importDefault(require("express"));
// import sgMail = require('@sendgrid/mail');
var Sorter_1 = __importDefault(require("./business/Sorter"));
var Email_1 = __importDefault(require("./business/Email"));
var dotenv = require("dotenv");
var bodyParser = __importStar(require("body-parser"));
var path_1 = __importDefault(require("path"));
var sort = new Sorter_1.default();
var email = new Email_1.default();
dotenv.load();
var app = express_1.default();
var port = process.env.PORT || '3000';
var GMAIL_PWD = process.env.GMAIL_PWD;
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../React-UI/build')));
app.post('/sendEmail', jsonParser, function (req, res) {
    var event = req.body;
    var emailList = sort.sortEventMembers(event.members);
    for (var _i = 0, emailList_1 = emailList; _i < emailList_1.length; _i++) {
        var e = emailList_1[_i];
        email.sendEmailer(GMAIL_PWD, event, e);
    }
    res.send('All participants were notified of their secret! ');
});
app.get('*', function (request, response) {
    response.sendFile(path_1.default.resolve(__dirname, '../../React-UI/build', 'index.html'));
});
app.listen(port, function () { return console.log("App listening on  localhost:" + port + "!"); });
//# sourceMappingURL=Index.js.map