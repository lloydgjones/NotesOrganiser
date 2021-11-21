const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load
dotenv.config({ path: './config/config.env' });
connectDB();

// Routes
app.use('/', require('./routes/index'))

app.listen(8080);
