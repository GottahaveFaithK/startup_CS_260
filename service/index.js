const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

const users = [];
const scores = [];
const authCookieName = 'token';

function verifyAuth(req, res, next) {
    const user = findUser('token', req.cookies[authCookieName]);

    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

apiRouter.post('/auth/create', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }

    const existingUser = findUser('username', username);

    if (existingUser) {
        return res.status(409).json({
            message: 'Username already exists'
        });
    }

    const user = await createUser(username, password);

    setAuthCookie(res, user.token);

    res.status(201).json({
        username: user.username
    });
});


apiRouter.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }

    const user = findUser('username', username);

    if (!user) {
        return res.status(401).json({
            message: 'Invalid username or password'
        });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
        return res.status(401).json({
            message: 'Invalid username or password'
        });
    }

    user.token = uuidv4();

    setAuthCookie(res, user.token);

    res.json({
        username: user.username
    });
});

apiRouter.delete('/auth/logout', (req, res) => {
    const user = findUser('token', req.cookies[authCookieName]);

    if (user) {
        delete user.token;
    }

    res.clearCookie(authCookieName, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict'
    });

    res.status(204).end();
});


async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username,
        password: passwordHash,
        token: uuidv4()
    };

    users.push(user);

    return user;
}


function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        maxAge: 1000 * 60 * 60 * 24,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict'
    });
}

function findUser(field, value) {
    if (!value) return null;

    return users.find(user => user[field] === value);
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});