const router = require('express').Router();
const verifyToken = require('./verifyToken');
const express = require('express');

const User = require('../model/User');

router.get("/", verifyToken, (req, res) => {

    const user = User.findOne({_id : req.header('auth-token')});
    return res.send(user.name);
});

module.exports = router;