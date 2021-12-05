const express = require('express');
const router = express.Router();

const passport = require('passport');

const { Note } = require('../models/note');
const { Task } = require('../models/task');
var User = require('../models/user');

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

// Get One Note
router.get('/api/note/:id', (req, res) => {
    Note.findById(req.params.id, (err, data) => {
        if(!err) {
            res.send(data);
        } else{
            console.log(err);
        }
    })
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

// Save New Note
router.post('/api/note/add', (req, res) => {
    const note = new Note({
        account: req.body.account,
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

// Delete Note
router.delete('/api/note/:id', (req, res) => {
    Note.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({ code: 200, message: 'Note Deleted', deleteNote: data })
        } else{
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

// Save New User
router.post('/api/user/register', function (req, res, next) {
    addToDB(req, res);
});

async function addToDB(req, res) {
    var user = new User({
        email: req.body.email,
        username: req.body.username,
        password: User.hashPassword(req.body.password1),
        creation_dt: Date.now()
    });
  
    try {
        doc = await user.save();
        return res.status(201).json(doc);
    } 
    catch (err) {
        return res.status(501).json(err);
    }
}

// Login
router.post('/api/user/login', function (req, res, next) {
    passport.authenticate('strat', function(err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function(err) {
            if (err) { return res.status(501).json(err); }
            return res.status(200).json({message: 'Login Success'});
        });
    })(req, res, next);
});

// Get User
router.get('/api/user', isValidUser, function (req, res, next) {
    return res.status(200).json(req.user);
});

function isValidUser(req, res, next){
    if(req.isAuthenticated()) next();
    else return res.status(401).json({message: 'Unauthorised Request'});
}

// Logout
router.get('/api/user/logout', isValidUser, function (req, res, next) {
    req.logout();
    return res.status(200).json({message:'Logout Success'});
});

module.exports = router;
