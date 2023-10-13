import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application, Prisma } from '@prisma/client';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post(':id')
  async createApplication(@Body() body: Prisma.ApplicationCreateInput,@Param('id') id: string): Promise<Application>{
    return await this.applicationService.createApplication(body,id);
  }

  @Get()
  async getAllApplication(): Promise<Application[]>{
    return await this.applicationService.getAllApplication();
  }

  @Get(':id')
  async getApplicationById(@Param('id') id: string): Promise<Application>{
    return await this.applicationService.getApplicationById(id);
  }

  @Put(':id')
  async updateApplication(@Param('id') id: string, @Body() body: Prisma.ApplicationUpdateInput): Promise<Application>{
    return await this.applicationService.updateApplication(id,body);
  }

  @Delete(':id')
  async deleteApplication(@Param('id') id: string): Promise<Application>{
    return await this.applicationService.deleteApplication(id);
  }

  @Get('student/:id')
  async getApplicationByStudentId(@Param('id') id: string): Promise<Application[]>{
    return await this.applicationService.getApplicationByStudentId(id);
  }


}
