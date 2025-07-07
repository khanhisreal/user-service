/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from 'src/guards/local.guard';
import { RefreshTokenGuard } from 'src/guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalGuard)
  login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  //will implement rotatation refresh tokens to do log out mechanism
  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  refreshToken(@Req() req: any) {
    return this.authService.refreshToken(req.user);
  }
}
