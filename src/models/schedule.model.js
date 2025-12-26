import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    day: {
      type: String,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    room: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["class", "exam"],
      default: "class",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Schedule", scheduleSchema);
