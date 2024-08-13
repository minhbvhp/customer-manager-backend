import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  PASSWORD_MUST_NOT_EMPTY,
  PASSWORD_NOT_STRONG,
} from 'src/utils/messageConstants';

export class ResetUserPasswordDto extends PartialType(CreateUserDto) {
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
