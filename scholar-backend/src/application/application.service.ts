import { BadRequestException, Injectable } from '@nestjs/common';
import { Application, Prisma } from '@prisma/client';
import { ApplicationInterface } from 'src/interfaces/application.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApplicationService {

  constructor(private prisma: PrismaService){}
  async createApplication(data: Prisma.ApplicationCreateInput): Promise<Application> {
    try {
      const data: Prisma.ApplicationCreateInput = {
        university_name: '',
        university_course: ''
      }
      const application: Application = await this.prisma.application.create({
        data,
      })
      return application;
    } catch (e) {
      throw new BadRequestException(e,"Application not created")
    }
  }
}
