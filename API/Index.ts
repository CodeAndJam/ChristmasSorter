const express = require('express')
// import sgMail = require('@sendgrid/mail');
import Sorter = require('./business/Sorter');
import  Emailer =  require('./business/Email');
import { SorterEvent } from './Shared/Interfaces/SorterEvent.Interface';
import * as bodyParser from "body-parser";


const app = express()
const port = 3000

// const SENDGRID_API_KEY = functions.config().sendgrid.key
const GMAIL_PWD = process.env.GMAIL_PWD


// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })



app.get('/', (req, res) => res.send('Hello World!'))

app.post('/sendEmail', jsonParser, function (req, res) {
    
    const event: SorterEvent = req.body;
      
    const emailList = Sorter.sortEventMembers(event.members);

    for (const e of emailList) {
      Emailer.sendEmailer(GMAIL_PWD,event.name, event.date, event.templateBody, e);
    }

    res.send('All participants were notified of their secret! ')
  })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))