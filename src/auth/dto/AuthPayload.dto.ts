import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthPayload {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  pw: string;
}
