import { ConflictException, Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './student.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class StudentService extends Repository<Student> {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {

    super(studentRepository.target, studentRepository.manager, studentRepository.queryRunner);
  }

  async createStudent(createStudentDto: CreateStudentDto) {
    if (createStudentDto.password != createStudentDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      createStudentDto.salt = await bcrypt.genSalt();  
      createStudentDto.confirmationToken = crypto.randomBytes(32).toString('hex');
      createStudentDto.password = await this.hashPassword(createStudentDto.password, createStudentDto.salt);
      const { email, name, cpf, password, salt, confirmationToken } = createStudentDto;

      console.log(createStudentDto);
      
      const student = this.studentRepository.create(createStudentDto);
      student.email = email;
      student.name = name;
      student.cpf = cpf;
      student.confirmationToken = confirmationToken;
      student.salt = salt;  
      student.password = password;
      try {
        await student.save();
        return student;
      } catch (error) {
        if (error.code.toString() === '23505') {
          throw new ConflictException('Endereço de email já está em uso');
        } else {
          throw new InternalServerErrorException(
            'Erro ao salvar o usuário no banco de dados',
          );
        }
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}