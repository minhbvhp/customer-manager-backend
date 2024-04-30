import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { Public } from 'src/auth/auth.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @Public()
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    const newUser = await this.authService.signUp(signUpDto);

    if (!newUser) {
      throw new ConflictException(`Người dùng này đã có rồi`);
    }

    return newUser;
  }

  @Post('/login')
  @Public()
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const loginUser = await this.authService.login(loginDto);

    if (!loginUser) {
      throw new NotFoundException(`Email hoặc mật khẩu không chính xác`);
    }
    return loginUser;
  }
}
