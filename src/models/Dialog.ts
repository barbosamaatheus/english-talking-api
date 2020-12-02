import { Schema, model, Document } from "mongoose";
import calculatesApprovalRate from "../utils/calculatesApprovalRate";

export type DialogType = Document & {
  _doc: any;
  speech: string;
  answer: string;
  user: Schema.Types.ObjectId;
  status: string;
  approvals: Schema.Types.ObjectId[];
  disapprovals: Schema.Types.ObjectId[];
  approval_rate: number;
};

const DialogSchema = new Schema(
  {
    speech: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      required: true,
      enum: ["approved", "analyzing"],
      default: "analyzing",
    },
    approvals: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    disapprovals: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

DialogSchema.virtual("approval_rate").get(function setApprovalRate(
  this: DialogType
) {
  const rate = calculatesApprovalRate({
    approvals: this.approvals,
    disapprovals: this.disapprovals,
  });

  return rate;
});

export default model<DialogType>("Dialog", DialogSchema);
