import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginInterface, StudentInterface } from './interfaces/student.interface';
import { StudentService } from './student/student.service';
import * as bcrypt from 'bcrypt'
import { Student } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';
import { RefreshTokenService } from './refreshToken/refresh-token.service';
@Injectable()
export class AppService extends StudentService{

  constructor(private jwtService : JwtService){
    super(new PrismaService());
  }
  getHello(): string {
    return 'Hello World!';
  }
  private refreshTokenService: RefreshTokenService = new RefreshTokenService(this.jwtService);

  async signupStudent(data: StudentInterface): Promise<Record<string,any>>{
    try {
      if(await this.checkEmailExist(data.email)) throw new ConflictException("Student already exist");
      const encryptPassword = await bcrypt.hash(data.password,Number(process.env.SALT_ROUNDS));
      const student : Student  = await this.register({
        ...data,
        password: encryptPassword
      });
      const {password, ...res} = student;
      const access_token = await this.generateToken(res);
      return Promise.resolve({
        ...res,
        access_token
      })
    } catch (error) {
      console.error(error,'<------- SignUp Error')
      throw new ForbiddenException()
    }

  }

  async loginStudent(data: LoginInterface){
    try {
      const student  = await this.prisma.student.findUnique({
        where: {
          email: data.email,
        }
      })
      const isPasswordValid = await bcrypt.compare(data.password,student.password)
      if(!isPasswordValid){
        throw new NotFoundException('Student not exist');
      }
      const {password, ...res} = student;
      const access_token = await this.generateToken(res.id);
      const refresh_token = await this.refreshTokenService.generateRefreshToken(res.id);
      return Promise.resolve({
        ...res,
        access_token,
        refresh_token
      })
      
    } catch (error) {
      console.error(error)
      throw new ForbiddenException('Something happen')
    }
  }

  async generateToken(data: any): Promise<String>{
    return await this.jwtService.signAsync(data);
  }
}
