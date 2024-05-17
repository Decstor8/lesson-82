import mongoose from 'mongoose';
import crypto from 'crypto';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import User from './models/User';

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    } catch (err) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    const collections = ['artists', 'albums', 'tracks', 'users', 'trackhistories'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    const [Miyagi, StasMikhailov, Macan] = await Artist.create(
        {
            name: 'MiyaGi',
            image: 'images/f0438551-c943-4874-9f82-36a54a2c01b9.jpg',
            info: 'MiyaGi – российский рэпер из города Владикавказ, ставший особенно знаменитым в 2015-2016 годах в составе дуэта «MiyaGi & Эндшпиль». Творческий тандем, состоящий из Азамата Кудзаева и Сослана Бурнацева сегодня известен не только на просторах нашей родины',
            isPublished: true,
        },
        {
            name: 'Стас михайлов',
            image: 'images/5981d988-9834-4cf5-aef7-0ef3c3d28b5d.jpeg',
            info: 'Станисла́в Влади́мирович Миха́йлов — российский эстрадный певец, автор песен, актёр и продюсер; народный артист Российской Федерации.',
            isPublished: true,
        },
        {
            name: 'Macan',
            image: 'images/5981d988-9834-4cf5-aef7-0ef3c3d28b5d.jpeg',
            info: 'Российски певец',
            isPublished: false,
        },
    );

    const [HATTORI, NARRATIVE, Bounty] = await Album.create(
        {
            artist: Miyagi,
            name: 'HATTORI',
            release: 2022,
            image: 'images/e9fa4f94-87ae-4e89-91d1-35cec7438111.jpeg'
        },
        {
            artist: Miyagi,
            name: 'NARRATIVE',
            release: 2019,
            image: 'images/e9fa4f94-87ae-4e89-91d1-35cec7438111.jpeg'
        },
        {
            artist: Miyagi,
            name: 'Bounty',
            release: 2016,
            image: 'images/e9fa4f94-87ae-4e89-91d1-35cec7438111.jpeg'
        },
        {
            artist: Macan,
            name: 'Fearless',
            release: 2008,
            image: 'images/32dcb6f7-02cd-49e8-8ada-36351f777874.jpeg',
            isPublished: true,
        },
    );

    await Track.create(
        {
            album: HATTORI,
            name: 'saloon',
            duration: '3:43',
            number: 2,
        },
        {
            album: HATTORI,
            name: 'Ночь',
            duration: '4:12',
            number: 4,
        },
        {
            album: HATTORI,
            name: 'Временно',
            duration: '4:55',
            number: 1,
        },
        {
            album: HATTORI,
            name: 'Не теряя',
            duration: '2:52',
            number: 7,
        },
        {
            album: HATTORI,
            name: 'Need me',
            duration: '3:20',
            number: 3,
        },
    );

    await Track.create(
        {
            album: NARRATIVE,
            name: 'Пронзай',
            duration: '3:33',
            number: 5,
        },
        {
            album: NARRATIVE,
            name: 'Круговорот',
            duration: '4:22',
            number: 2,
        },
        {
            album: NARRATIVE,
            name: 'Last Of Us',
            duration: '4:31',
            number: 1,
        },
        {
            album: NARRATIVE,
            name: 'Восход',
            duration: '1:39',
            number: 3,
        },
        {
            album: NARRATIVE,
            name: 'Река',
            duration: '2:31',
            number: 4,
        },
    );

    await Track.create(
        {
            album: Bounty,
            name: 'Умшакалака',
            duration: '2:02',
            number: 1,
        },
        {
            album: Bounty,
            name: 'Райзап',
            duration: '3:56',
            number: 9,
        },
        {
            album: Bounty,
            name: 'Отцу отсыпь',
            duration: '4:44',
            number: 3,
        },
        {
            album: Bounty,
            name: 'God Damn',
            duration: '4:14',
            number: 4,
        },
        {
            album: Bounty,
            name: 'Story',
            duration: '3:54',
            number: 2,
        },
        {
            album: Bounty,
            name: 'I love',
            duration: '3:51',
            number: 7,
        },
    );

    await Track.create(
        {
            album: Macan,
            name: 'Fearless',
            duration: '4:02',
            number: 1,
            isPublished: true,
        },
        {
            album: Macan,
            name: 'Love Story',
            duration: '3:56',
            number: 9,
            isPublished: true,
        },
        {
            album: Macan,
            name: 'Change',
            duration: '4:40',
            number: 3,
            isPublished: true,
        },
        {
            album: Macan,
            name: 'Fifteen',
            duration: '4:54',
            number: 4,
            isPublished: true,
        },
        {
            album: Macan,
            name: 'White Horse',
            duration: '3:54',
            number: 2,
            isPublished: true,
        },
        {
            album: Macan,
            name: 'You Belong with Me',
            duration: '3:51',
            number: 7,
            isPublished: true,
        },
    );

    const [You, GoodDay] = await Album.create(
        {
            artist: StasMikhailov,
            name: 'Лучший день',
            release: 2019,
            image: 'images/6bc0fba4-ab86-40e4-8217-ab40106cdf6c.jpg',
        },
        {
            artist: StasMikhailov,
            name: 'Только ты',
            release: 2011,
            image: 'images/6bc0fba4-ab86-40e4-8217-ab40106cdf6c.jpg',
        },
    );

    await Track.create(
        {
            album: You,
            name: 'Самый твой лучший день',
            duration: '3:34',
            number: 1,
        },
        {
            album: You,
            name: 'Комнаты',
            duration: '4:33',
            number: 6,
        },
        {
            album: You,
            name: 'Перепутаю даты ',
            duration: '5:10',
            number: 3,
        },
        {
            album: You,
            name: 'Дежри меня',
            duration: '6:27',
            number: 4,
        },
        {
            album: You,
            name: 'Вор ',
            duration: '5:25',
            number: 2,
        },
        {
            album: You,
            name: 'Метель',
            duration: '3:32',
            number: 5,
        },
    );

    await Track.create(
        {
            album: GoodDay,
            name: 'Веди меня, Бог мой',
            duration: '3:34',
            number: 2,
        },
        {
            album: GoodDay,
            name: 'Кате...',
            duration: '4:47',
            number: 1,
        },
        {
            album: GoodDay,
            name: 'Русь',
            duration: '4:31',
            number: 4,
        },
        {
            album: GoodDay,
            name: 'Если бы не ты',
            duration: '3:54',
            number: 3,
        },
        {
            album: GoodDay,
            name: 'Непрощенный',
            duration: '5:01',
            number: 5,
        },
        {
            album: GoodDay,
            name: 'Ты моя',
            duration: '3:39',
            number: 7,
        },
        {
            album: GoodDay,
            name: 'Солдат',
            duration: '4:28',
            number: 7,
        },
    );

    await User.create(
        {
            email: 'admin@example.com',
            password: 'adminpass',
            token: crypto.randomUUID(),
            role: 'admin',
            displayName: 'Admin',
        },
        {
            email: 'user@example.com',
            password: 'userpass',
            token: crypto.randomUUID(),
            role: 'user',
            displayName: 'User',
        },
    );

    await db.close();
};

void run();