import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    examType: {
      type: String,
      enum: ["midterm", "final", "internal"],
      required: true,
    },
    examDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    registrationDeadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Exam", examSchema);
