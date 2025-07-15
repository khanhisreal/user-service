/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthPayload } from './dto/AuthPayload.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/entity/schemas/user.schema';
import { Model } from 'mongoose';
import { comparePasswords } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, pw }: AuthPayload) {
    const findUser = await this.userModel
      .findOne({ email })
      .select('+password')
      .lean();
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    if (!comparePasswords(pw, findUser.password)) {
      throw new UnauthorizedException('Bad credentials');
    }
    //object desconstructuring
    const { password, __v, ...payload } = findUser;
    return payload;
  }

  async login(user: AuthPayload) {
    const accessToken = await this.jwtService.signAsync(user);
    const refreshToken = await this.jwtService.signAsync(user, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(user) {
    // Destructure and remove exp, iat
    const { exp, iat, ...payload } = user;
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
