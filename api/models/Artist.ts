import {Schema, model} from "mongoose";

const artistSchema = new Schema({
  name: {
    type: String, 
    required: true 
    },
  images: String,
  info: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Artist = model('Artist', artistSchema);
export default Artist;