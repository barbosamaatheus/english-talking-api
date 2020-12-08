import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { IsEmail, MaxLength, MinLength } from "class-validator";

import Dialog from "./Dialog";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @MaxLength(50)
  @MinLength(1)
  name: string;

  @Column()
  picture: string;

  @Column({ unique: true }) // unique nao funciona
  @IsEmail()
  email: string;

  @MinLength(8) // senha criptografada tem mais de 8 caracteres
  @Column()
  password: string;

  @OneToMany(() => Dialog, (dialog) => dialog.user)
  dialog: Dialog[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;
}
