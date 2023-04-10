import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @IsString()
  @ApiProperty()
  username: string;
  @IsString()
  @MinLength(4)
  @ApiProperty()
  password: string;
}
