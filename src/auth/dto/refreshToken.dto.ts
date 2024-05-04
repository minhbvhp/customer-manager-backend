import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import {} from 'src/utils/messageConstants';

export class RefreshTokenDto {
  @IsNotEmpty({ message: 'Token is not empty' })
  refreshToken: string;
}
