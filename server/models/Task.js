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
    requestedUsers:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    assignedTo:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      type: {
        type: String,
        enum: ['Point'], // This ensures that only a 'Point' type is used.
        required: true
      },
      coordinates: {
        type: [Number], // Array of [longitude, latitude]
        required: true
      },
      
    },
  },
);

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
