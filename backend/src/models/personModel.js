import mongoose from 'mongoose';

const personSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    images: [String],
  },
  { timestamps: true }
);

// personSchema.virtual('turns', {
//   ref: 'Turn',
//   localField: '_id',
//   foreignField: 'person',
// });

personSchema.set('toObject', { virtuals: true });
personSchema.set('toJSON', { virtuals: true });

const Person = mongoose.model('Person', personSchema);

export default Person;
