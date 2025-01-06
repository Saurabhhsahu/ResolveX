import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true, // Ensures the 'type' is provided
      },
      coordinates: {
        type: [Number], // Array of numbers for longitude and latitude
        required: true, // Ensures 'coordinates' are provided
      }
    },
    
    address: {
      type: String,
    },
    mobile: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create a 2dsphere index on location to enable geospatial queries
UserSchema.index({ location: '2dsphere' });

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
