import mongoose from 'mongoose';

const buildingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

buildingSchema.virtual('cameras', {
  ref: 'Camera',
  localField: '_id',
  foreignField: 'building',
});

buildingSchema.set('toObject', { virtuals: true });
buildingSchema.set('toJSON', { virtuals: true });

const Building = mongoose.model('Building', buildingSchema);

export default Building;
