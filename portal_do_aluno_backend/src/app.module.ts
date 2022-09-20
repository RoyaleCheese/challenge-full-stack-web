import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
    envFilePath: ".env",
    isGlobal: true
  }), StudentModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
