import express from 'express';
import Artist from '../models/Artist';
import { imageUpload } from '../multer';
const artistRouter = express.Router();

artistRouter.get('/', async (_req, res, next) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (err) {
    next(err);
    }
});

artistRouter.post('/', imageUpload.single('images'), async (req, res) => {
  if (!req.body.name) {
    return res.status(422).json({ message: "Имя артиста обязательно" });
  }

  const artist = new Artist({
    name: req.body.name,
    images: req.file ? req.file.filename : null,
    info: req.body.info
  });

  try {
    const newArtist = await artist.save();
    return res.send(newArtist);
  } catch (err) {
    res.status(422).json({ message: "Ошибка при добавлении артиста: " + err});
  }
});

export default artistRouter;
