import { IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Exclude } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Exclude()
  email?: string;

  @IsNotEmpty({ message: 'Tên không được bỏ trống' })
  name: string;

  @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống' })
  @IsStrongPassword(
    {
      minLength: 6,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Mật khẩu không đủ mạnh: cần tối thiểu 6 ký tự, 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt',
    },
  )
  password: string;
}
