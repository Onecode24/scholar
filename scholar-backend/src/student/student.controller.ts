import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
import { StudentInterface } from 'src/interfaces/student.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentService } from './student.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('student')
export class StudentController {

    constructor(private prisma: PrismaService, private studentService : StudentService){}
    // @Post()
    // async register(@Body() body: StudentInterface): Promise<Student>{
    //     return await this.studentService.register(body)
    // }

    @UseGuards(AuthGuard)
    @Get()
    async allStudent(): Promise<Student[]>{
        return await this.studentService.findStudents();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getStudent(@Param('id') id){
        return this.studentService.getStudent(id);
    }

    @UseGuards(AuthGuard)
    @Put()
    async updateStudent(@Param('id') id: string,@Body() body: Prisma.StudentUpdateInput){
        return this.studentService.updateStudent(id,body);
    }

    @UseGuards(AuthGuard)
    @Delete()
    async deleteStudent(@Param('id') id: string){
        return this.deleteStudent(id);
    }

}
