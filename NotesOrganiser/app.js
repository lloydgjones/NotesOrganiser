const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const dotenv = require('dotenv');

/*
app.get('/', (req, res) => {
    res.send("Home");
});

app.get('/notes', (req, res) => {
    res.send('Notes');
});
*/

const connectDB = require('./config/database');

// Load Config
dotenv.config({ path: './config/config.env' });
connectDB();

// Routes
app.use('/', require('./routes/index'))

app.listen(8080);

