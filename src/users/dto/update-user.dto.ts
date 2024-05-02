import { IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Exclude } from 'class-transformer';
import {
  NAME_MUST_NOT_EMPTY,
  PASSWORD_MUST_NOT_EMPTY,
  PASSWORD_NOT_STRONG,
  ROLE_MUST_NOT_EMPTY,
} from 'src/utils/messageConstants';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Exclude()
  email?: string;

  @IsNotEmpty({ message: NAME_MUST_NOT_EMPTY })
  name: string;

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

  @IsNotEmpty({ message: ROLE_MUST_NOT_EMPTY })
  roleId: number;
}
