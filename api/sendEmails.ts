import { ServerRequest } from "https://deno.land/std@0.72.0/http/server.ts";

import { SorterEvent } from "../Shared/Interfaces/SorterEventAPI.interface.ts";
import { sortEventMembers } from "../Shared/business/Sorter.ts";
// import * as  from "./business/SendGrid.ts";
import "https://deno.land/x/dotenv/load.ts";
import { sendMail, IRequestBody } from "https://deno.land/x/sendgrid/mod.ts";
import { EmailList } from "../Shared/Interfaces/EmailList.interface.ts";

function sendEmail(event: SorterEvent, recipient: EmailList) {
  const currency = event.currency ? event.currency : "€";

  const msg: IRequestBody = {
    personalizations: [
      {
        subject: event.name,
        to: [{ email: recipient.from.email }],
      },
    ],
    from: { email: "christmassorter@gmail.com" },
    content: [
      {
        type: "text/plain",
        value: `Hi there ${recipient.from.name}!

You were invited to a Gift Exchange at ${event.date} named ${event.name}. The limit of the gift is ${event.giftPrice}${currency}, and you are to give a gift to ${recipient.to.name}.

Best regards and happy gift Exchange!!!
      `,
      },
    ],
  };
  const apiKey: string = Deno.env.get("SENDGRID_API_KEY") || "";
  sendMail(msg, { apiKey })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

export default async (req: ServerRequest) => {
  const buf: Uint8Array = await Deno.readAll(req.body);
  const data: string = new TextDecoder("utf-8").decode(buf);
  const event: SorterEvent = JSON.parse(data) as SorterEvent;
  const emailList = sortEventMembers(event.members);

  for (const e of emailList) {
    sendEmail(event, e);
  }

  req.respond({
    status: 200,
    body: `All participants were notified of their secret!`,
  });
}
