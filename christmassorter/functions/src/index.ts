import * as functions from 'firebase-functions';
import sgMail = require('@sendgrid/mail');
import nodemailer = require('nodemailer');

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

    const email = request.query.email;
    const emails = request.body.emails;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'christmassorter@gmail.com',
               pass: GMAIL_PWD
           }
       });

       const mailOptions = {
        from: 'christmassorter@gmail.com', // sender address
        to: emails, // list of receivers
        subject: 'Subject of your email', // Subject line
        html: '<p>Your html here</p>'// plain text body
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
   });




