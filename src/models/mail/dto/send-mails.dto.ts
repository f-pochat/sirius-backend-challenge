import { IsNotEmpty } from "class-validator";

export class SendMailsDto {

  @IsNotEmpty()
  subject: string;
  @IsNotEmpty()
  body: string;
}