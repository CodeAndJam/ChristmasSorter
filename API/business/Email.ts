import { EmailList } from "./EmailList.interface";
import { SorterEvent } from "../Shared/Interfaces/SorterEvent.Interface";
import * as nodemailer from 'nodemailer'
import * as pug from 'pug';

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
            html: pug.render(`body(style={background: 'red', 'padding': '10px'})
            div.container(style={background: 'white', 'padding': '10px'})
                h1(style={"text-align": 'center'}) Gift Exchange

                p Hi there #{recipientFromName}!

                p You were invited to a Gift Exchange at #{date} named #{name}. The limit of the gift is #{price}#{currency}, and you are to give a gift to #{recipientToName}.

                p Best regards and happy gift Exchange!!!`, {
                recipientFromName: recipient.from. name,
                date: event.date,
                price: event.giftPrice,
                name: event.name,
                currency: currency,
                recipientToName: recipient.to.name
              })
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
            console.log(err)
            else
            console.log(info);
        });
    }


}