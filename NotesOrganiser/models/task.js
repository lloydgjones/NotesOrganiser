const mongoose = require('mongoose');

// Task Schema
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
    weight: {
        type: Number,
        required: false
    }
});

module.exports = { Task }
