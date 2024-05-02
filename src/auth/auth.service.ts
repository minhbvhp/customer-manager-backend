import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { NEW_USER_CREATED } from 'src/utils/messageConstants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<{ result: string }> {
    const newUser = await this.usersService.createUser(createUserDto);

    if (!newUser) {
      return null;
    }

    return { result: NEW_USER_CREATED };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const result = await this.validateUser(loginDto.email, loginDto.password);

    if (result) {
      const payload = {
        sub: result?.id,
        email: result?.email,
        role: result?.role?.role,
      };

      const token = await this.jwtService.signAsync(payload);

      return { token };
    }

    return null;
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
