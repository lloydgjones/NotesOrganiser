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
    }
});

module.exports = { Task }
