const express = require('express');
const router = express.Router();

const passport = require('passport');

var User = require('../models/user');

// Get User
router.get('/api/user', isValidUser, function (req, res) {
    return res.status(200).json(req.user);
});

// Log Out
router.get('/api/user/logout', isValidUser, function (req, res) {
    req.logout();
    return res.status(200).json({message:'Logout Success'});
});

// Log In
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

// Register
router.post('/api/user/register', function (req, res) {
    addToDB(req, res);
});

function isValidUser(req, res, next){
    if(req.isAuthenticated()) next();
    else return res.status(401).json({message: 'Unauthorised Request'});
}

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

module.exports = router;
