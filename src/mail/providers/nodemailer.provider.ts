import { Injectable } from "@nestjs/common";
import { IMailService } from "@mail/service/mail.service.interface";
import { SendMailsDto } from "@models/mail/dto/send-mails.dto";
import { Subscriber, User } from "@models/mail/entities";
import { IMailProvider } from "@mail/providers/mail.provider.interface";
const nodemailer = require('nodemailer');

export class NodemailerProvider implements IMailProvider {
  async sendMails(subject: string, body: string, user: User, subscribers: Subscriber[]): Promise<string> {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // send mail with defined transport object
    try{
      await transporter.sendMail({
        from: `<${user.email}>`, // sender address
        to: subscribers.map(subs => subs.email).join(','), // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
      });
    }catch (e){
      console.log(e);
    }

    return "Mails Sent"
  }
}