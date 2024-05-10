import express from 'express';
import Track from '../models/Track';
import auth from "../middleware/auth";
import {Types} from "mongoose";
import permit from "../middleware/permit";

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

trackRouter.post('/', auth,  async (req, res, next) => {
  const { name, album, duration, number } = req.body;
  if (!name || !album || !duration! || number) {
    return res.status(400).json({ message: "Название трека, сам альбом и продолжительность обязательны" });
  }

  const track = new Track({
    album: req.body.album,
    name: req.body.name,
    duration: req.body.duration,
    number: req.body.number,
    isPublished: req.body.isPublished,
  });

  try {
    const newTrack = await track.save();
    res.status(201).send(newTrack);
  } catch (err) {
    next(err);
  }
});

trackRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    let _id: Types.ObjectId;

    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(422).send({error: 'Не верный идентификатор'});
    }

    const track = await Track.findByIdAndDelete(_id);

    if (!track) {
      return res.status(403).send({error: `Трек не найден`});
    }

    return res.send({message: 'Трек удален'});
  } catch (err) {
    return next(err);
  }
});

trackRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    let _id: Types.ObjectId;

    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(422).send({error: 'Не верный идентификатор'});
    }

    const track = await Track.findById(_id);

    if (!track) {
      return res.status(403).send({error: `Трек не найден`});
    }

    await track.updateOne({isPublished: !track.isPublished});
    await track.save();

    return res.send(track);

  } catch (err) {
    return next(err);
  }
});

export default trackRouter;
