import { Min } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Roles, Status } from '../schemas/user.schema';

export class PaginationDto {
  //number of records to skip
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  skip?: number;

  //maximum number of records to retrieve
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  query?: string;

  @IsOptional()
  @IsEnum(Roles, { message: 'Invalid role value' })
  role?: Roles;

  @IsOptional()
  @IsEnum(Status, { message: 'Invalid status value' })
  status?: Status;
}
