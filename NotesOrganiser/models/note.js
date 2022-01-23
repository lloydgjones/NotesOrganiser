const mongoose = require('mongoose');

// Note Schema
const Note = mongoose.model('Note', {
    account: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: false
    }
});

module.exports = { Note }
