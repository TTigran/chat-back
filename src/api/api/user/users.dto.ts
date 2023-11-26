import {IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  imageUrl: string;
}