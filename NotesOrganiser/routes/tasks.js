const express = require('express');
const router = express.Router();

const { Task } = require('../models/task');

// Get All Tasks
router.get('/api/tasks', (req, res) => {
    Task.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

// Get One Task
router.get('/api/task/:id', (req, res) => {
    Task.findById(req.params.id, (err, data) => {
        if(!err) {
            res.send(data);
        } else{
            console.log(err);
        }
    })
});

// Save New Task
router.post('/api/task/add', (req, res) => {
    const task = new Task({
        account: req.body.account,
        name: req.body.name,
        content: req.body.content
    });
    task.save((err, data) => {
        if(!err) {
            res.status(200).json({ code: 200, message: 'Task Added', addTask: data })
        } else {
           console.log(err);
        }
    });
});

// Update Task
router.put('/api/task/update/:id', (req, res) => {
    const task = {
        name: req.body.name,
        content: req.body.content
    };
    Task.findByIdAndUpdate(req.params.id, { $set:task }, { new:true }, (err, data) => {
        if(!err) {
            res.status(200).json({ code: 200, message: 'Task Updated', updateTask: data })
        } else {
           console.log(err);
        }
    })
});

// Delete Task
router.delete('/api/task/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({ code: 200, message: 'Task Deleted', deleteTask: data })
        } else{
            console.log(err);
        }
    })
});

module.exports = router;
