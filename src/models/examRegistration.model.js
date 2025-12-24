import mongoose from "mongoose";

const examRegistrationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

examRegistrationSchema.index({ student: 1, exam: 1 }, { unique: true });

export default mongoose.model("ExamRegistration", examRegistrationSchema);
