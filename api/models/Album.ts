import { Schema, model } from "mongoose";

const AlbumSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  release: {
    type: Number,
    required: true,
  },
  images: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Album = model('Album', AlbumSchema);
export default Album;