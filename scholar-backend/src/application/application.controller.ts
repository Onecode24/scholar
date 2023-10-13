import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application, Prisma } from '@prisma/client';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async createApplication(@Body() body: Prisma.ApplicationCreateInput,@Param('id') id: string): Promise<Application>{
    return await this.applicationService.createApplication(body,id);
  }

}
