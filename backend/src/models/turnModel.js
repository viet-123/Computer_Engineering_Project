import mongoose from 'mongoose';

const turnSchema = new mongoose.Schema(
  {
    person: {
      type: mongoose.Schema.ObjectId,
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
  },
  { timestamps: true }
);

const Turn = mongoose.model('Turn', turnSchema);

export default Turn;
