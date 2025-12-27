import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
      uppercase: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
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

courseSchema.index({ semester: 1 });
courseSchema.index({ code: 1, semester: 1 }, { unique: true });
courseSchema.index({ teacher: 1 });
courseSchema.index({ semester: 1, teacher: 1 });

export default mongoose.model("Course", courseSchema);
