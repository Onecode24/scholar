import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Sexe, Student } from '@prisma/client';
import { StudentInterface } from 'src/interfaces/student.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {

    constructor(readonly prisma: PrismaService){}

    async register(data: StudentInterface): Promise<Student>{
        if(await this.checkEmailExist(data.email)) throw new BadRequestException('student already exist');
        const student = this.prisma.student.create({
            data: {
                ...data,
                sexe: data.sexe == "M" ? Sexe.M : Sexe.F
            }
        });
        return student;
    }

    async findStudents(): Promise<Student[]>{
        try{
            return await this.prisma.student.findMany();
        }catch(e){
            throw new NotFoundException(e,"something happen");
        }
    }

    async getStudent(id: string): Promise<Student>{
        try {
            const student: Student = await this.prisma.student.findUnique({
                where: {
                    id,
                }
            })
            if(!student) throw new BadRequestException("student not exist")
            return student
        } catch (e) {
            throw new BadRequestException(e,"student not found")
        }
    }

    async updateStudent(id: string, data: Prisma.StudentUpdateInput): Promise<Student>{
    
        try {
            if(!await this.getStudent(id)) throw new BadRequestException("student not exist") 
        return this.prisma.student.update({
            where: {
                id,
            },
            data,
        })
        } catch (e) {
            throw new BadRequestException(e,"student not update")
        }
    }

    async  deleteStudent(id: string): Promise<Student>{
        try {
            if(!await this.getStudent(id)) throw new BadRequestException("student not exist");
        return this.prisma.student.delete({
            where: {
                id,
            }
        })
        } catch (e) {
            throw new BadRequestException(e,"student not delete")
        }
    }


    async checkEmailExist(email: string): Promise<boolean>{
        try{
            const student = await this.prisma.student.findUnique({
                where: {
                    email
                }
            })
            if(student) return true;
            return false
        }catch(e){
            console.log("Email existe",e)
            return Promise.reject(e);
        }
    }

}
