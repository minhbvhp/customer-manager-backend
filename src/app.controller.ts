import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
