import express from 'express';
import Album from '../models/Album';
import { imageUpload } from '../multer';
import { Types } from 'mongoose';

const albumRouter = express.Router();

albumRouter.get('/', async (req, res, next) => {
  const artistId = req.query.artist as string;
  try {
    const query = artistId ? { artist: artistId } : {};
    const albums = await Album.find(query).populate('artist');
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
  };

  const album = new Album({
    artist: req.body.artist,
    name: req.body.name,
    release: req.body.release,
    images: req.file ? req.file.filename : null,
  });

  try {
    const newAlbum = await album.save();
    return res.send(newAlbum);
  } catch (err) {
    return res.status(422).send(err);
  }
});

export default albumRouter;
