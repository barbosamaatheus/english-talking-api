import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
} from "typeorm";
import { MinLength } from "class-validator";

import User from "./User";
import { Status } from "../utils/enumStatus";

@Entity("dialogs")
export default class Dialog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @MinLength(1)
  speech: string;

  @Column()
  @MinLength(1)
  answer: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.ANALYZING,
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.dialog, {
    cascade: true,
  })
  @JoinColumn({ name: "user" })
  user: User;

  @ManyToMany(() => User, (user) => user.approvals, {
    cascade: true,
  })
  @JoinTable({ name: "approvals" })
  approvals: User[];

  @ManyToMany(() => User, (user) => user.disapprovals, {
    cascade: true,
  })
  @JoinTable({ name: "disapprovals" })
  disapprovals: User[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;
}
