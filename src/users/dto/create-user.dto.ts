import {
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsString,
} from 'class-validator';
import {
  EMAIL_MUST_NOT_EMPTY,
  EMAIL_MUST_VALID,
  NAME_MUST_NOT_EMPTY,
  PASSWORD_MUST_NOT_EMPTY,
  PASSWORD_NOT_STRONG,
} from 'src/utils/messageConstants';

export class CreateUserDto {
  @IsNotEmpty({ message: NAME_MUST_NOT_EMPTY })
  @IsString()
  name: string;

  @IsNotEmpty({ message: EMAIL_MUST_NOT_EMPTY })
  @IsEmail({}, { message: EMAIL_MUST_VALID })
  email: string;

  @IsNotEmpty({ message: PASSWORD_MUST_NOT_EMPTY })
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
  password: string;
}
