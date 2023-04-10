import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  username: string;
  @IsString()
  @MinLength(4)
  password: string;
}
