import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export type UserType = Document & {
  name: string;
  picture: string;
  email: string;
  password: string | undefined;
};

const UserSchema = new Schema<UserType>(
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
      validate: {
        validator: (email: string) => {
          return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email
          );
        },
        message: (props) => `${props.path} adreess is not a valid!`,
      },
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
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

export default model<UserType>("User", UserSchema);
