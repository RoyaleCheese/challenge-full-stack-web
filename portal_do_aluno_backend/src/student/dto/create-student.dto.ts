export class CreateStudentDto {
  email: string;
  name: string;
  cpf: string;
  password: string;
  passwordConfirmation: string;
  salt: string;
  confirmationToken: string;
}