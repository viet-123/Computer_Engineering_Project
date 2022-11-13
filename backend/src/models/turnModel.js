import mongoose from 'mongoose';

const turnSchema = new mongoose.Schema(
  {
    person: {
      type: mongoose.Schema.ObjectId,
      default: null,
      ref: 'Person',
    },
    time: {
      type: Date,
      required: true,
    },
    isMasked: {
      type: Boolean,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Turn = mongoose.model('Turn', turnSchema);

export default Turn;
