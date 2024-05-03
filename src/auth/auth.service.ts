import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { NEW_USER_CREATED } from 'src/utils/messageConstants';
import { ConfigService } from '@nestjs/config';
import { UUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<{ result: string }> {
    const newUser = await this.usersService.createUser(createUserDto);

    if (!newUser) {
      return null;
    }

    return { result: NEW_USER_CREATED };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ jwtToken: string; refreshToken: string }> {
    const result = await this.validateUser(loginDto.email, loginDto.password);

    if (result) {
      const payload = {
        sub: result?.id,
        email: result?.email,
        role: result?.role?.role,
      };

      const tokens = await this.getTokens(
        payload.sub,
        payload.email,
        payload.role,
      );

      await this.updateRefreshToken(payload.sub, tokens.refreshToken);

      return tokens;
    }

    return null;
  }

  async logout(userId: string) {
    const user = await this.usersService.updateRefreshToken(userId, null);
    console.log(user);
    return user;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.usersService.updateRefreshToken(userId, hashedRefreshToken);
  }

  async getTokens(userId: string, email: string, role: string) {
    const [jwtToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_EXPIRES'),
        },
      ),

      this.jwtService.signAsync(
        { sub: userId, email, role },
        {
          secret: this.configService.get<string>('REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('REFRESH_EXPIRES'),
        },
      ),
    ]);

    return {
      jwtToken,
      refreshToken,
    };
  }

  async validateUser(email: string, inputPassword: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordMatched = await bcrypt.compare(
      inputPassword,
      user?.password,
    );

    if (!isPasswordMatched) {
      return null;
    }
    const { password, ...result } = user;

    return result;
  }
}
