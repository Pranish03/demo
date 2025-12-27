import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      enum: ["Diploma", "Bachelor", "Master", "PhD"],
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Program", programSchema);
