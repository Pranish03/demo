import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },

    part: {
      type: String,
      required: true,
    },

    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

semesterSchema.index({ program: 1, year: 1, part: 1 }, { unique: true });

export default mongoose.model("Semester", semesterSchema);
