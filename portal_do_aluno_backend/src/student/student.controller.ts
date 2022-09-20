import { Controller, Post, Body } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';
import { ReturnStudentDto } from './dto/return-student.dto';


@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post("/create")
  async createStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<ReturnStudentDto> {
    const user = await this.studentService.createStudent(createStudentDto);
    return {
      user,
      message: 'Cadastrado com sucesso',
    };
  }
}
