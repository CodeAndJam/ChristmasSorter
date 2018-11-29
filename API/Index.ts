import express from 'express';
// import sgMail = require('@sendgrid/mail');
import Sorter from'./business/Sorter';
import Emailer from './business/Email';
import dotenv = require('dotenv');

import { SorterEvent } from './Shared/Interfaces/SorterEvent.Interface';
import * as bodyParser from "body-parser";
import path from 'path';

const sort = new Sorter();
const email = new Emailer();

dotenv.load();
const app = express()
const port = process.env.PORT || '3000';
const GMAIL_PWD = process.env.GMAIL_PWD



// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })



app.use(express.static(path.resolve(__dirname, '../../React-UI/build')));

app.post('/sendEmail', jsonParser, function (req, res) {

    const event: SorterEvent = req.body;

    const emailList = sort.sortEventMembers(event.members);

    for (const e of emailList) {
      email.sendEmailer(GMAIL_PWD,event, e);
    }

    res.send('All participants were notified of their secret! ')
  })

app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../../React-UI/build', 'index.html'));
  });

app.listen(port, () => console.log(`App listening on  localhost:${port}!`))