import { VercelRequest, VercelResponse } from "@vercel/node";
import sgMail, { MailDataRequired } from "@sendgrid/mail";
import { SorterEvent } from "../Shared/Interfaces/SorterEventAPI.interface";
import { EmailList } from "../Shared/Interfaces/EmailList.interface";
import { sortEventMembers } from "../Shared/business/Sorter";

function sendEmail(event: SorterEvent, recipient: EmailList): MailDataRequired {
  const currency = event.currency ? event.currency : "€";

  const msg: MailDataRequired = {
    to: { email: recipient.from.email, name: recipient.from.name },
    from: "christmassorter@gmail.com",
    subject: event.name,
    text: `Hi there ${recipient.from.name}!

    You were invited to a Gift Exchange at ${event.date} named ${event.name}. The limit of the gift is ${event.giftPrice}${currency}, and you are to give a gift to ${recipient.to.name}.
    
    Best regards and happy gift Exchange!!!
          `,
  };

  return msg;
}

export default (_req: VercelRequest, res: VercelResponse) => {
  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const body = _req.body as SorterEvent;

  const members = sortEventMembers(body.members);

  try {
    members.forEach((member) => {
      sgMail.send(sendEmail(body, member));
    });
  } catch (error) {
    res.status(500).send(error);
  }

  res.status(200).send("Email sent");
};
