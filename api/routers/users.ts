import {Router} from "express";
import User from "../models/User";
import mongoose, {mongo} from "mongoose";
import {imageUpload} from "../multer";
import {OAuth2Client} from "google-auth-library";
import config from "../config";

const usersRouter = Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imageUpload.single('image'), async (req, res, next) => {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            image: req.file ? req.file.filename : null,
        });

        user.generateToken();
        await user.save();
        return res.send({message: 'ok!', user});
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(err);
        }

        if (err instanceof mongo.MongoServerError && err.code === 11000) {
            return res.status(422).send({message: 'электронная почта должна быть уникальной'});
        }

        return next(err);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user) {
            return res.status(422).send({error: 'адрес электронной почты и/или пароль не найдены!'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if(!isMatch) {
            return res.status(422).send({error: 'адрес электронной почты и/или пароль не найдены!'});
        }

        user.generateToken();
        await user.save();

        return res.send({message: 'почта и пароль верны!', user});
    } catch (err) {
        return next(err);
    }
});

usersRouter.post('/google', async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(400).send({error: 'Ошибка входа в Google!'});
        }

        const email = payload['email'];
        const id = payload['sub'];
        const displayName = payload['name'];

        if (!email) {
            return res.status(400).send({error: 'Электронная почта отсутствует'});
        }

        let user = await User.findOne({googleID: id});

        if (!user) {
            user = new User({
                email,
                password: crypto.randomUUID(),
                googleID: id,
                displayName,
            });
        }

        user.generateToken();
        await user.save();

        return res.send({message: 'Вход через Google успешен!', user});
    } catch (err) {
        return next(err);
    }
});

usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const headerValue = req.get('Authorization');
        const messageSuccess = {message: 'Успешно!'};

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


export default usersRouter;