import { MailNotSentError } from "@shared/errors";
import { Subscriber, User } from "@models/mail/entities";
import { IMailProvider } from "@mail/providers/mail.provider.interface";
const mailgun = require("mailgun-js");

export class MailgunProvider implements IMailProvider {
  async sendMails(subject: string, body: string, user: User, subscribers: Subscriber[]): Promise<string> {
    const mg = mailgun(
      {apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_API_DOMAIN});
    const data =  {
      from: user.email,
      to: subscribers.map(subs => subs.email),
      subject: subject,
      text: body,
    }

    await mg.messages().send(data,(err,body) =>{
    if (err) throw new  MailNotSentError()
    console.log(body)})

  return "Mails sent!"
  }
}