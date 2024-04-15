import {Schema, model} from "mongoose";

const artistSchema = new Schema({
  name: {
    type: String, 
    required: true 
    },
  image: String,
  info: String
});

const Artist = model('Artist', artistSchema);
export default Artist;