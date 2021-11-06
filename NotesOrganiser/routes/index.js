const express = require('express');

const router = express.Router();

const { Note } = require('../models/note');

// Get All Notes
router.get('/api/notes', (req, res) => {
    Note.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

// Get One Note
router.get('/api/note/:id', (req, res) => {
    Note.findById(req.params.id, (err, data) => {
        if(!err) {
            res.send(data);
        } else{
            console.log(err);
        }
    })
})

// Save New Note
router.post('/api/note/add', (req, res) => {
    const note = new Note({
        name: req.body.name,
        content: req.body.content
    });
    note.save((err, data) => {
        if(!err) {
            res.status(200).json({ code: 200, message: 'Note Added', addNote: data })
        } else {
           console.log(err);
        }
    });
});

// Update Note
router.put('/api/note/update/:id', (req, res) => {
    const note = {
        name: req.body.name,
        content: req.body.content
    };
    Note.findByIdAndUpdate(req.params.id, { $set:note }, { new:true }, (err, data) => {
        if(!err) {
            res.status(200).json({ code: 200, message: 'Note Updated', updateNote: data })
        } else {
           console.log(err);
        }
    })
});

// Delete Note
router.delete('/api/note/:id', (req, res) => {
    Note.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({ code: 200, message: 'Note Deleted', deleteNote: data })
        } else{
            console.log(err);
        }
    })
})

module.exports = router;
