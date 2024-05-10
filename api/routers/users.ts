import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user.generateToken();

        await user.save();

        return res.send({message: 'Регистрация завершена успешно', user});
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(err);
        }

        next(err);
    }
});

 usersRouter.post('/sessions', async (req, res, _next) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).send({error: 'Имя пользователя или пароль не верны!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Имя пользователя или пароль не верны!'});
    }

    user.generateToken();
    user.save();

    return res.send({message: 'Имя пользователя и пароль корректны!', user});
 });

usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const headerValue = req.get('Authorization');
        const messageSuccess = {message: 'Success!'};

        if (!headerValue) {
            return res.send(messageSuccess);
        }

        const [_bearer, token] = headerValue.split(' ');

        if (!token) {
            return res.send(messageSuccess);
        }

        const user = await User.findOne({token});

        if (!user) {
            return res.send(messageSuccess);
        }

        user.generateToken();
        await user.save();
        return res.send(messageSuccess);
    } catch (err) {
        return next(err);
    }
});

 usersRouter.get('/secret', async (req, res, next) => {
    try {
        const tokenData = req.get('Authorization');

        if(!tokenData) {
            return res.status(401).send({error: 'Токен не был предоставлен!'});
        } 

        const [_, token] = tokenData.split(' ');
        const user = await User.findOne({token});

        if (!user) {
            return res.status(403).send({error: 'Не верный токен!'});
        }

        res.send({message: 'Секретное сообщение)', username: user.username});
    } catch (e) {
      next(e);
    }
 });

export default usersRouter;