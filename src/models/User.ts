import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import bcrypt from "bcrypt";

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

  @OneToMany(() => Dialog, (dialog) => dialog.owner)
  @JoinColumn({ name: "owner" })
  dialog: Dialog[];

  @ManyToMany(() => Dialog, (dialog) => dialog.approvals)
  approvals: Dialog[];

  @ManyToMany(() => Dialog, (dialog) => dialog.disapprovals)
  disapprovals: Dialog[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;

  @BeforeInsert()
  async generateHashPassword() {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
}
