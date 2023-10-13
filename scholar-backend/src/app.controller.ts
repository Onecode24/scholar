import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginInterface, StudentInterface } from './interfaces/student.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('signup')
  async register(@Body() body: StudentInterface){
    return this.appService.signupStudent(body);
  }

  @Post('login')
  async login(@Body() body: LoginInterface){
    return this.appService.loginStudent(body);
  }
}
