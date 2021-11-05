import { VercelRequest, VercelResponse } from "@vercel/node";
import sgMail from "@sendgrid/mail";
export default (_req: VercelRequest, res: VercelResponse) => {
  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "jecabeda@gmail.com", // Change to your recipient
    from: "christmassorter@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.status(200).send("Email sent");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
