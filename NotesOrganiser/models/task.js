const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
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
    },
    importance: {
        type: Number,
        required: false
    }
});

module.exports = { Task }
