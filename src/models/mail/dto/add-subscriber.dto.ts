import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AddSubscriberDto {

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: String
}