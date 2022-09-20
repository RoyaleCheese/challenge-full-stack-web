import { Student } from '../student.entity';

export class ReturnStudentDto {
  user: Student;
  message: string;
}