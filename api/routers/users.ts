import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user.generateToken();

        await user.save();

        return res.send(user);
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(err);
        }

        next(err);
    };
});

 usersRouter.post('/sessions', async (req, res, next) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).send({error: 'Username or password are not correct!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Username or password are not correct!'});
    }

    user.generateToken();
    user.save();

    return res.send({message: 'Username and password correct!', user});
 });

 usersRouter.get('/secret', async (req, res, next) => {
    try {
        const tokenData = req.get('Authorization');

        if(!tokenData) {
            return res.status(401).send({error: 'No token provided!'});
        } 

        const [_, token] = tokenData.split(' ');
        const user = await User.findOne({token});

        if (!user) {
            return res.status(403).send({error: 'Wornd token!'});
        }

        res.send({message: 'Secret message', username: user.username});
    } catch (e) {
      next(e);
    }
 });

export default usersRouter;