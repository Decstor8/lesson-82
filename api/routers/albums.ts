import express from 'express';
import Album from '../models/Album';
import { imageUpload } from '../multer';
import { Types } from 'mongoose';
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const albumRouter = express.Router();

albumRouter.get('/', async (req, res, next) => {
  try {
    const albums = await Album.find();
    const artistIdParam = req.query.artist as string;
    if (artistIdParam) {
      const results = await Album.find({artist: artistIdParam}).sort({release: -1});
      return res.send(results);
    }
    return res.send(albums);
  } catch (err) {
    next(err);
  }
});

albumRouter.get('/:id', async (req, res, next) => {
    try {
      let _id: Types.ObjectId;
        _id = new Types.ObjectId(req.params.id);

      const albums = await Album.findById(_id).populate('artist');

      if (!albums) {
        return res.status(422).send({error: 'Не найдено'});
      }

      res.send(albums);
    } catch (err) {
      next(err);
    }
  });

albumRouter.post('/', imageUpload.single('images'), async (req, res) => {
  if (!req.body.name || !req.body.artist || !req.body.release) {
    return res.status(400).json({ message: 'Пожалуйста заполните все поля.' });
  }

  const album = new Album({
    artist: req.body.artist,
    name: req.body.name,
    release: req.body.release,
    images: req.file ? req.file.filename : null,
    isPublished: req.body.isPublished,
  });

  try {
    const newAlbum = await album.save();
    return res.send(newAlbum);
  } catch (err) {
    return res.status(422).send(err);
  }
});

albumRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    let _id: Types.ObjectId;

    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(422).send({error: 'Не верный идентификатор'});
    }

    const album = await Album.findByIdAndDelete(_id);

    if (!album) {
      return res.status(403).send({error: 'Альбом не найден'});
    }

    return res.send({message: 'Альбом удален'});
  } catch (err) {
    return next(err);
  }
});

albumRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    let _id: Types.ObjectId;

    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(422).send({error: 'Не верный идентификатор'});
    }

    const album = await Album.findById(_id);

    if (!album) {
      return res.status(403).send({error: `Альбом не найден`});
    }

    await album.updateOne({isPublished: !album.isPublished});
    await album.save();

    return res.send(album);

  } catch (err) {
    return next(err);
  }
});

export default albumRouter;
