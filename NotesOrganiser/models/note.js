const mongoose = require('mongoose');

// Note Schema
const Note = mongoose.model('Note', {
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = { Note }
