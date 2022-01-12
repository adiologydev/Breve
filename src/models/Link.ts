import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    alias: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Link =
  mongoose.models.Link || mongoose.model('Link', linkSchema, 'links');

export default Link;
