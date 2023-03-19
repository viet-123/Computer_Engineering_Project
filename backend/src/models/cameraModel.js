import mongoose from 'mongoose';

const cameraSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    building: {
      type: mongoose.Schema.ObjectId,
      ref: 'Building',
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Camera = mongoose.model('Camera', cameraSchema);

export default Camera;
