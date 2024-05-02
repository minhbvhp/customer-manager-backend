import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { THIS_FEATURE_NEED_LOGIN } from 'src/utils/messageConstants';

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
    const user = await this.usersService.getUserById(payload?.sub);

    //check id existed
    if (!user) {
      throw new UnauthorizedException(THIS_FEATURE_NEED_LOGIN);
    }

    //check email match id
    if (user?.email !== payload.email) {
      throw new UnauthorizedException(THIS_FEATURE_NEED_LOGIN);
    }

    //check jwt token expired

    //check refresh token expired

    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
