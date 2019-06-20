const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');
 
// Load validation input 
const validateProfileInput = require('../../validation/profile');
// Load profile model


const Profile = require('../../models/Profile');

// Load user model

const User = require('../../models/User');




// @route GET api/profile
// @desc Gets current user's profile.
// @access Private

router.get('/', passport.authenticate('jwt', {session: false}), (req, res)=>{
        const errors = {};
    Profile.findOne({ user: req.user.id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for the user';
            return res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => res.status(400).json(err));

});

// @route POST api/profile
// @desc Create or Edit user's profile.
// @access Private

router.post('/', passport.authenticate('jwt', {session: false}), (req, res)=>{
    //Get fields

    const profileFields = {};
    const {errors, isValid} = validateProfileInput(req.body);

    if(!isValid){
       return res.status(400).json(errors);
        
    }


    profileFields.user = req.user.id;

    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.club) profileFields.club = req.body.club;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.work) profileFields.work = req.body.work;
    if(req.body.about) profileFields.about = req.body.about;
    if(req.body.ecPosition) profileFields.ecPosition = req.body.ecPosition;
    if(req.body.ecPositionDetail) profileFields.ecPositionDetail = req.body.ecPositionDetail;
    if(req.body.alreadyCompleted) profileFields.alreadyCompleted = req.body.alreadyCompleted;
    if(req.body.numberOfSpeechesGiven) profileFields.numberOfSpeechesGiven = req.body.numberOfSpeechesGiven;
    if(typeof req.body.speechInterests !== 'undefined'){
        profileFields.speechInterests = req.body.speechInterests.split(',');
    }

    if(typeof req.body.competitionsParticipatedIn !== 'undefined'){
        profileFields.competitionsParticipatedIn = req.body.competitionsParticipatedIn;
    }
    //Social
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;

    Profile.findOne({user: req.user.id})
    .then(profile => {
        if(profile){
            Profile.findOneAndUpdate({user: req.user.id}, {$set : profileFields}, {new: true})
            .then(profile => res.json(profile));  
            //Update
        }
        else {
            //Create

            //Check if handle exists
            Profile.findOne({handle: profileFields.handle})
            .then(profile => {
                if(profile) {
                    errors.handle = 'That handle already exists!';
                   return res.status(400).json(errors);
                } else{
                    //Save Profile.
                    new Profile(profileFields).save().then(profile => res.json(profile));
                }
            });
        }
    })


});



    // @route GET api/profile/handle
    // @desc Get profile by handle
    // @access Public

    router.get('/handle/:handle', (req, res) => {
        const errors = {};
        Profile.findOne({handle: req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
               return res.status(404).json(errors);
            }

            res.json(profile);

        })
        .catch(err => res.status(404).json(err));


    });

    // @route GET api/profile/user/:userId
    // @desc Get profile by handle
    // @access Public


    
    // @route GET api/profile/all
    // @desc Get all profiles
    // @access Public

    router.get('/all', (req,res) => {
       
    
            Profile.find()
            .populate('user', ['name', 'avatar'])
            .then(profiles => {
                if(!profiles){
                    errors.noprofile = 'There are no profiles';
                    return res.status(404).json(errors);
                }
                res.json(profiles);
            })
            .catch(err => 
                res.status(404).json({noprofile : 'There is no profile for this user'}));
    
    }
        );


    router.get('/user/:userId', (req, res) => {

        const errors = {};
        Profile.findOne({user: req.params.userId})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
               return res.status(404).json(errors);
            }

            res.json(profile);

        })
        .catch(err => res.status(404).json({noprofile : 'There is no profile for this user'}));


    });



// @route GET api/profile/test
// @desc Tests profile route
// @access Public
router.get('/test', (req, res)=>{res.json({msg: "Profile works!"})});

module.exports = router;