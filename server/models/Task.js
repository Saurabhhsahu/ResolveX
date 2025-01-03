import mongoose from "mongoose";

// import User from "./UserModel";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Electricity", "Software", "Medical", "Maintenance"],
    },
    bounty: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Solved"],
      required: true,
      default: "Pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    location: {
      type: [Number],
      index: "2dsphere",
    },
  },
);

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
