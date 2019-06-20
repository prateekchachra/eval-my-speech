const express = require('express');

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport');
const router = express.Router();

//Load user model
const User = require('../../models/User');


//Load input validation

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get('/test', (req, res)=>{res.json({msg: "User works!"})});

router.post('/register', (req, res)=>{
    const { errors, isValid} = validateRegisterInput(req.body);
    
    //Check validation 


    if(!isValid){
        res.status(400).json(errors);

    }

    User.findOne({email: req.body.email})
    .then(user => {
        if(user){
            return res.status(400).json({email: 'Email already exists'});
            
        }
        else{
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password

            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(console.log(err));
                })
            })
        }

    });
});

// @route GET api/users/login
// @desc Login user / Returning JWT token.
// @access Public

router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid){
        res.status(400).json(errors);

    }


    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user => {
        //Check for user 

        if(!user){
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }

        //Check for password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                //User matched
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                }
                //Sign token

                jwt.sign(payload, keys.secretOrKey, {expiresIn: 7200}, (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token

                    })

                });
            }
            else {
                errors.password = 'Password Incorrect';
                res.status(400).json(errors);
            }

        });
    });

});

// @route GET api/users/current
// @desc Return current user.
// @access Private

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {

    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;