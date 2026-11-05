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

const {
    connectToDatabase,
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    updateUserRemoveAuth,
    addScore,
    getHighScores
} = require('./database');

const authCookieName = 'token';

const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);

    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

apiRouter.post('/auth/create', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }

    const existingUser = await findUser('username', username);

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

    const user = await findUser('username', username);

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
    await updateUser(user);

    setAuthCookie(res, user.token);

    res.json({
        username: user.username
    });
});

apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);

    if (user) {
        await updateUserRemoveAuth(user);
    }

    res.clearCookie(authCookieName, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict'
    });

    res.status(204).end();
});

apiRouter.get('/auth/me', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);

    if (!user) {
        return res.status(401).json({
            message: 'Not logged in'
        });
    }

    res.json({
        username: user.username
    });
});

apiRouter.get('/scores', async (_req, res) => {
    const scores = await getHighScores();
    res.json(scores);
});

apiRouter.post('/score', verifyAuth,  async (req, res) => {
    const { score, opponent } = req.body;

    if (
        typeof score !== 'number' ||
        !Number.isFinite(score) ||
        score < 0 ||
        typeof opponent !== 'string' ||
        !opponent.trim()
    ) {
        return res.status(400).json({
            message: 'Invalid score submission'
        });
    }

    const newScore = {
        id: uuidv4(),
        username: req.user.username,
        score,
        opponent,
        date: new Date().toLocaleDateString()
    };

    await addScore(newScore);
    const updatedScores = await getHighScores();

    res.status(201).json(updatedScores);
});


async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username,
        password: passwordHash,
        token: uuidv4()
    };

    await addUser(user);

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

async function findUser(field, value) {
    if (!value) return null;

    if (field == 'token') {
        return getUserByToken(value);
    }

    return getUser(value);
}


app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: 'Internal server error'
    });
});

async function startServer() {
    try {
        await connectToDatabase();

        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

startServer();