const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials: true
}));

const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load
dotenv.config({ path: './config/config.env' });
connectDB();

// Passport
const session = require('express-session');
const passport = require('passport');

const MongoStore = require('connect-mongo');
app.use(session({
    name: 'myname.sid',
    resave: false,
    saveUninitialized: false,
    secret:'arsene',
    cookie:{
        maxAge: 36000000,
        httpOnly: false,
        secure: false
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
    })
}));

require('./passport-settings');
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/notes'));
app.use('/', require('./routes/tasks'));
app.use('/', require('./routes/users'));

app.listen(8080);
