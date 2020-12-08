import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
} from "typeorm";
import { MinLength } from "class-validator";

import User from "./User";

enum Status {
  APPROVED,
  ANALYZING,
}

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

  @ManyToOne(() => User, (user) => user.dialog)
  user: User;

  @ManyToMany(() => User)
  @JoinColumn({ name: "approvals" })
  approvals: User[];

  @ManyToMany(() => User)
  @JoinColumn({ name: "disapprovals" })
  disapprovals: User[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;
}
