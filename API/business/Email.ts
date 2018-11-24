import { EmailList } from "./EmailList.interface";
import { SorterEvent } from "../Shared/Interfaces/SorterEvent.Interface";
import nodemailer from 'nodemailer';
const pug = require('pug');

export default class Emailer {


   sendEmailer (pwd: String, event: SorterEvent, recipient: EmailList) {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'christmassorter@gmail.com',
                pass: pwd
            }
        });
        const currency = event.currency ? event.currency : "€"
        

        const mailOptions: any = {
            from: "christmassorter@gmail.com", // sender address
            to: recipient.from.email, // list of receivers
            subject: event.name, // Subject line
            html: pug.renderFile('./business/mail.pug', {
                recipientFromName: recipient.from. name,
                date: event.date,
                price: event.giftPrice,
                name: event.name,
                currency: currency,
                recipientToName: recipient.to.name
              })
        };
        
        // console.log(mailOptions.html);
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
            console.log(err)
            else
            console.log(info);
        });
    }
    

}