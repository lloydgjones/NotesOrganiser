const express = require('express');
const router = express.Router();

const { Task } = require('../models/task');

// Get Tasks By User
router.get('/api/tasks/:user', (req, res) => {
    Task.find({ account: req.params.user }, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

// Get Task By ID
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
        content: req.body.content,
        time: req.body.time,
        tags: req.body.tags,
        importance: req.body.importance
    });
    task.save((err, data) => {
        if(!err) {
            res.status(200).json({message: 'Task Added'})
        } else {
           console.log(err);
        }
    });
});

// Edit Task
router.put('/api/task/update/:id', (req, res) => {
    const task = {
        name: req.body.name,
        content: req.body.content,
        time: req.body.time,
        tags: req.body.tags,
        importance: req.body.importance
    };
    Task.findByIdAndUpdate(req.params.id, { $set:task }, { new:true }, (err, data) => {
        if(!err) {
            res.status(200).json({message: 'Task Updated'})
        } else {
           console.log(err);
        }
    })
});

// Delete Task
router.delete('/api/task/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({message: 'Task Deleted'})
        } else{
            console.log(err);
        }
    })
});

module.exports = router;
