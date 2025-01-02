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
        enum: ['Point'], // This ensures that only a 'Point' type is used.
      },
      coordinates: {
        type: [Number], // Array of [longitude, latitude]
      },
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
