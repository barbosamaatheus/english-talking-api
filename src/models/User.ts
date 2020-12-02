import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export type UserType = Document & {
  name: string;
  picture: string;
  email: string;
  password: string | undefined;
};

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<UserType>("save", async function generateHashPassword(next) {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  } catch (err) {
    next(err);
  }
});

export default model<UserType>("User", UserSchema);
