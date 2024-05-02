import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import {
  EMAIL_MUST_NOT_EMPTY,
  PASSWORD_MUST_NOT_EMPTY,
  EMAIL_MUST_VALID,
} from 'src/utils/messageConstants';

export class LoginDto {
  @IsNotEmpty({ message: EMAIL_MUST_NOT_EMPTY })
  @IsEmail({}, { message: EMAIL_MUST_VALID })
  email: string;

  @IsNotEmpty({ message: PASSWORD_MUST_NOT_EMPTY })
  @IsString()
  password: string;
}
