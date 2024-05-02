import {
  Controller,
  Get,
  Post,
  Body,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/auth/auth.decorators';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
  EMAIL_OR_PASSWORD_WRONG,
  USER_ALREADY_EXISTED,
} from 'src/utils/messageConstants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @Public()
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ result: string }> {
    const newUser = await this.authService.signUp(createUserDto);

    if (!newUser) {
      throw new ConflictException(USER_ALREADY_EXISTED);
    }

    return newUser;
  }

  @Post('/login')
  @Public()
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const loginUser = await this.authService.login(loginDto);

    if (!loginUser) {
      throw new NotFoundException(EMAIL_OR_PASSWORD_WRONG);
    }
    return loginUser;
  }
}
