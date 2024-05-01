import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   *
   * @param payload{sub, email, iat, exp}
   *
   */

  async validate(payload: any) {
    console.log(payload);
    //check id existed
    const user = await this.usersService.getUserById(payload?.id);

    //check email match id
    if (user?.email === payload.email) {
      return 'OK';
    }

    //check jwt token expired
    //check refresh token expired
    return 'OK';
  }
}
