import { EmailList } from "./EmailList.interface";
import nodemailer = require('nodemailer');



   export function sendEmailer(pwd: String, subject:String, date: Date, body: String, recipient: EmailList) {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'christmassorter@gmail.com',
                pass: pwd
            }
        });
        
        const mailOptions: any = {
            from: "christmassorter@gmail.com", // sender address
            to: recipient.from.email, // list of receivers
            subject: subject, // Subject line
            html: `Hi there ${recipient.from.name}! 
            You were invited to a Gift Exchange at ${date} named ${subject}. The limit is 5€ and you are to give a gift to ${recipient.to.name}
            
            Best regards and happy gift Exchange!!!
            `// plain text body
        };

        console.log(mailOptions);
        
        
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
            console.log(err)
            else
            console.log(info);
        });
    }
    

