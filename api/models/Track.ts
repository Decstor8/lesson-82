import { Schema, model } from "mongoose";

const TrackSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },
  duration: {
    type: String,
    required: true 
  },
  number: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Track = model('Track', TrackSchema);

export default Track;
