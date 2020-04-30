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

module.exports = model("Dialog", DialogSchema);
