const { Schema, model } = require("mongoose");

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

DialogSchema.virtual("approval_rate").get(function CalculatesApprovalRate() {
  const total = this.approvals.length + this.disapprovals.length;

  if (!this.approvals.length) return 0;
  return parseInt((this.approvals.length / total) * 100, 10);
});

module.exports = model("Dialog", DialogSchema);
