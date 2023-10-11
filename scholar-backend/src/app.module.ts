import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { ApplicationModule } from './application/application.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [StudentModule, ApplicationModule,],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
