import express from 'express';
import TrackHistory from '../models/TrackHistory';
import mongoose from 'mongoose';
import User from '../models/User';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
    try {
      const headerValue = req.get('Authorization');
      if (!headerValue) {
        return res.status(401).send({error: 'No authorization'});
      }
  
      const [_bearer, token] = headerValue.split(' ');
      if (!token) {
        return res.status(401).send({error: 'No token present!'});
      }
  
      const user = await User.findOne({token});
      if (!user) {
        return res.status(401).send({error: 'Error token!'});
      }
  
      const trackHistory = new TrackHistory({
        user: user._id,
        track: req.body.track,
        datetime: new Date()
      });
  
      await trackHistory.save();
      return res.send(trackHistory);
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(err);
      }
      next(err);
    }
  });  

export default trackHistoryRouter;