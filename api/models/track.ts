import { Schema, model } from "mongoose";

const TrackSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },
  duration: String,
});

const Track = model('Track', TrackSchema);

export default Track;
