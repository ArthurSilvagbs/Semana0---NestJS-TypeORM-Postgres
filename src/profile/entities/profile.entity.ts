import { User } from 'src/user/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  Entity,
} from 'typeorm';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToMany(() => User, (user) => user.profiles)
  owners: User[];

  @Column({ name: 'nick_name', nullable: false, length: 50, unique: true })
  nickname: string;

  @Column({ name: 'birthday', nullable: false })
  birthday: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
