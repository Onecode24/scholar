import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma, Sexe, Student } from '@prisma/client';
import { StudentInterface } from 'src/interfaces/student.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {

    constructor(private prisma: PrismaService, private studentService : StudentService){}
    @Post()
    async register(@Body() body: StudentInterface): Promise<Student>{
        return await this.studentService.register(body)
    }
    @Get()
    async allStudent(): Promise<Student[]>{
        return await this.studentService.findStudents();
    }

    @Get(':id')
    async getStudent(@Param('id') id){
        return this.studentService.getStudent(id);
    }

    @Put()
    async updateStudent(@Param('id') id: string,@Body() body: Prisma.StudentUpdateInput){
        return this.studentService.updateStudent(id,body);
    }

    @Delete()
    async deleteStudent(@Param('id') id: string){
        return this.deleteStudent(id);
    }

}
