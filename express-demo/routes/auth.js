const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');

const {registrationValidation} = require('./validation'); //deconstructed reference
const {loginValidation} = require('./validation'); //deconstructed reference

router.post('/user/register', async(req, res) => {
   
    if(registrationValidation(req.body) != 'NO_ERROR') return res.status(400).send(registrationValidation(req.body));

    //check if email already exists in database
    if(await User.findOne({email : req.body.email})) return res.status(400).send('Email already registered');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({user : savedUser._id});
    } catch (error) {
        res.status(400).send(error);
    }
});


router.post('/user/login', async(req, res) => {
  
    if(loginValidation(req.body) != 'NO_ERROR') return res.status(400).send(loginValidation(req.body));

    //check if email is registered
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send('Email not registered');

    //match password
    const validPass = await bcrypt.compare(req.body.password, user.password);
 });


// route parameters
//query string parameters - for optional params
router.get('/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send(`The course with the given ID ${req.params.id} could not be located`);
    } else {
        res.send(course);
    }
    // res.send(req.query);
    res.end();
});

module.exports = router;