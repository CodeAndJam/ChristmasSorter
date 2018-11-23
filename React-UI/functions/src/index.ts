import * as functions from 'firebase-functions';
import sgMail = require('@sendgrid/mail');
import SorterEvent from "../../Shared/Interfaces/SorterEvent.interface";
import { sortEventMembers } from './business/Sorter';
import { sendEmailer } from '../src/business/Email';

// import SorterEvent = require('../../Shared/Interfaces/SorterEvent.Interface');

const SENDGRID_API_KEY = functions.config().sendgrid.key
const GMAIL_PWD = functions.config().gmail.pwd

export const sendEmails = functions.https.onRequest((request, response) => {
    
                // using SendGrid's v3 Node.js Library
            // https://github.com/sendgrid/sendgrid-nodejs
            sgMail.setApiKey(SENDGRID_API_KEY);
            const msg = {
            to: 'jecabeda@gmail.com',
            from: 'christmassorter@gmail.com',
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            //templateid: '' // In case we have a sendgrid template
            };
            sgMail.send(msg)
                    .then(() => console.log('Email sent!!'))
                    .catch(err => console.log(err));
   });

   


   export const sendGmailEmails = functions.https.onRequest((request, response) => {

     const event: SorterEvent = request.body;

    const emailList = sortEventMembers(event.members);

    for (const e of emailList) {
      sendEmailer(GMAIL_PWD,event.name, event.date, event.templateBody, e);
    }
   });
   


