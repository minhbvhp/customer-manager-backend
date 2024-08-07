import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';
import {
  EMAIL_MUST_NOT_EMPTY,
  EMAIL_MUST_VALID,
  NAME_MUST_NOT_EMPTY,
  PASSWORD_MUST_NOT_EMPTY,
  PASSWORD_NOT_STRONG,
} from 'src/utils/messageConstants';
import { stringCleaner } from 'src/utils/stringCleaner';

export class CreateUserDto {
  @IsNotEmpty({ message: NAME_MUST_NOT_EMPTY })
  @Transform(({ value }) => {
    return stringCleaner(value);
  })
  name: string;

  @IsEmail({}, { message: EMAIL_MUST_VALID })
  @IsNotEmpty({ message: EMAIL_MUST_NOT_EMPTY })
  email: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: PASSWORD_NOT_STRONG,
    },
  )
  @IsNotEmpty({ message: PASSWORD_MUST_NOT_EMPTY })
  password: string;
}
