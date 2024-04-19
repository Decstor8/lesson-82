import User from "./User";
import Track from "./Track";
import mongoose, { Schema, model } from "mongoose";

const SchemaHistory = mongoose.Schema

const TrackHistorySchema = new SchemaHistory ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (userId: Schema.Types.ObjectId) => {
                const user = await User.findById(userId);
                return Boolean(user);
              },
        },
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
        validate: {
            validator: async (trackId: Schema.Types.ObjectId) => {
                const track = await Track.findById(trackId);
                return Boolean(track);
              },  
        },
    },
    datetime: {
        type: Date,
        required:true,
        default: new Date(),
    },
});

const TrackHistory = model('TrackHistory', TrackHistorySchema);
export default TrackHistory;