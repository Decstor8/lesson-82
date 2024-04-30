import express from 'express';
import Track from '../models/Track';

const trackRouter = express.Router();

trackRouter.get('/', async (req, res, next) => {
  const albumId = req.query.album as string | undefined;
  try {
    const query = albumId ? { album: albumId } : {};
    const tracks = await Track.find(query).populate({
      path: 'album',
      populate: {
        path: 'artist'
      }
    });
    res.send(tracks);
  } catch (err) {
    next(err);
  }
});

trackRouter.post('/', async (req, res, next) => {
  const { name, album, duration, number } = req.body;
  if (!name || !album || !duration) {
    return res.status(400).json({ message: "Название трека, сам альбом и продолжительность обязательны" });
  }

  const track = new Track({
    name,
    album,
    duration,
    number,
  });

  try {
    const newTrack = await track.save();
    res.status(201).send(newTrack);
  } catch (err) {
    next(err);
  }
});

export default trackRouter;
