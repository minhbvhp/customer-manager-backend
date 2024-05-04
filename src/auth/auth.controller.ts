import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  ConflictException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/auth/auth.decorators';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
  EMAIL_OR_PASSWORD_WRONG,
  USER_ALREADY_EXISTED,
} from 'src/utils/messageConstants';
import { RefreshTokenDto } from 'src/auth/dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
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

  @Post('login')
  @Public()
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ jwtToken: string; refreshToken: string }> {
    const loginUser = await this.authService.login(loginDto);

    if (!loginUser) {
      throw new NotFoundException(EMAIL_OR_PASSWORD_WRONG);
    }
    return loginUser;
  }

  @Get('logout')
  async logout(@Request() req) {
    return this.authService.logout(req?.user['userId']);
  }

  @Public()
  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    console.log(refreshTokenDto);
    return refreshTokenDto;
    // return 'ok';
    // return this.authService.refreshTokens(req?.user);
  }
}
