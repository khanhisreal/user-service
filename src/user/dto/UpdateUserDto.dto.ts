import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { AccountType, Roles, Status } from '../schemas/user.schema';

export class UpdateUserDto {
  @IsString()
  @MaxLength(75)
  @IsOptional()
  fullname: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsEnum(Roles)
  @IsOptional()
  role: Roles;

  @IsEnum(AccountType)
  @IsOptional()
  accountType: AccountType;

  @IsString()
  @IsOptional()
  nationality: string;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsString()
  @IsOptional()
  language: string;
}
