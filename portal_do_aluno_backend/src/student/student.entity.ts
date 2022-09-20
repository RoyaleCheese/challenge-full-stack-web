
import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';


@Entity({ name: "students"})
@Unique(['cpf'])
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ nullable: true, type: 'int', generated: true})
  ra: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 11 })
  cpf: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  confirmationToken: string;
}