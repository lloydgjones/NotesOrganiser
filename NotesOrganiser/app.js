const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/notes', (req, res) => {
    res.send('Notes');
});

app.listen(8080);

