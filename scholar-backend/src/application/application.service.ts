import { BadRequestException, Injectable } from '@nestjs/common';
import { Application, Prisma } from '@prisma/client';
import { ApplicationInterface } from 'src/interfaces/application.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApplicationService {

  constructor(private prisma: PrismaService){}
  async createApplication(data: Prisma.ApplicationCreateInput, student_id: string): Promise<Application> {
    try {
      // const _data: Prisma.ApplicationCreateInput = {
      //   university_name: '',
      //   university_course: '',
      //   student: {
      //     connect: {
      //       id: data.student_id;
      //     }
      //   }
      // }
      const application: Application = await this.prisma.application.create({
        data: {
          university_name: data.university_name,
          university_course: data.university_course,
          student: {
            connect: {
              id: student_id
            }
          }
        }
      })
      return application;
    } catch (e) {
      throw new BadRequestException(e,"Application not created")
    }
  }

  async getAllApplication(): Promise<Application[]> {
    return await this.prisma.application.findMany();
  }

  async getApplicationById(id: string): Promise<Application> {
    try {
      const application: Application = await this.prisma.application.findUnique({
        where: {
          id: id
        }
      })
      return application;
    } catch (error) {
      throw new BadRequestException(error,"Application not found")
    }
  }

  async updateApplication(id: string, data: Prisma.ApplicationUpdateInput): Promise<Application> {
    try {
      const application: Application = await this.prisma.application.update({
        where: {
          id: id
        },
        data: {
          university_name: data.university_name,
          university_course: data.university_course,
        }
      })
      return application;
    } catch (error) {
      throw new BadRequestException(error,"Application not updated")
    }
  }

  async deleteApplication(id: string): Promise<Application> {
    try {
      const application: Application = await this.prisma.application.delete({
        where: {
          id: id
        }
      })
      return application;
    } catch (error) {
      throw new BadRequestException(error,"Application not deleted")
    }
  }

  async getApplicationByStudentId(student_id: string): Promise<Application[]> {
    try {
      const application: Application[] = await this.prisma.application.findMany({
        where: {
          studentId: student_id
        }
      })
      return application;
    } catch (error) {
      throw new BadRequestException(error,"Application not found")
    }
  }

}
