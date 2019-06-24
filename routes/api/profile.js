const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');
 
// Load validation input 
const validateProfileInput = require('../../validation/profile');
const validateSpeechGivenInput = require('../../validation/speeches');
// Load profile model

const {Speech} = require('../../models/Speech');
const {Evaluation} = require('../../models/Evaluation');
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
        profileFields.speechInterests = req.body.speechInterests;   
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

      
    // @route GET Speech
// @desc Get speech details of user by id.
// @access Private

router.get('/speeches/:id', passport.authenticate('jwt', {session: false}), (req, res)=>{
    const errors = {};
Speech.findOne({ speech: req.params.id})
.then(speech => {
    if(!speech){
        errors.noprofile = 'There is no speech for this id';
        return res.status(404).json(errors);
    }
    res.json(speech);
}).catch(err => res.status(400).json(err));

});

     
    // @route GET Evaluation
// @desc Get evaluation details of user by id.
// @access Private

router.get('/evaluation/:id', passport.authenticate('jwt', {session: false}), (req, res)=>{
    const errors = {};
Evaluation.findOne({ evaluation: req.params.id})
.then(evaluation => {
    if(!evaluation){
        errors.noprofile = 'There is no evaluation for this id';
        return res.status(404).json(errors);
    }
    res.json(evaluation);
}).catch(err => res.status(400).json(err));

});

    // @route POST api/profile/speeches
    // @desc Add speech to profile
    // @access Public

    router.post('/speeches', passport.authenticate('jwt', {session: false}), (req, res) => {
        const { errors, isValid} = validateSpeechGivenInput(req.body);
        if(!isValid){
            return res.status(400).json(errors);

        }

        Profile.findOne({user : req.user.id})
        .then(profile => {
            const newSpeech = {
                titleOfSpeech: req.body.titleOfSpeech,
                speechType: req.body.speechType,
                club: req.body.club,
                date: req.body.date,
                description: req.body.description,
                challenges: req.body.challenges,
                speechBody: req.body.speechBody, 

            }

       
        profile.speechesGiven.unshift(newSpeech);
        profile.save().then(profile => {

            res.json(profile);
        });
    });
    });
      // @route POST api/profile/evaluations
    // @desc Add evaluations to profile
    // @access Public

    router.post('/evaluations', passport.authenticate('jwt', {session: false}), (req, res) => {
        const { errors, isValid} = validateSpeechGivenInput(req.body);
        if(!isValid){
            return res.status(400).json(errors);

        }

        Profile.findOne({user : req.user.id})
        .then(profile => {
            const newEval = {
                titleOfSpeech: req.body.titleOfSpeech,
                speechType: req.body.speechType,
                club: req.body.club,
                date: req.body.date,
                description: req.body.description,
                challenges: req.body.challenges,
                evaluationBody: req.body.evaluationBody, 

            }

       
        profile.speechesEvaluated.unshift(newEval);
        profile.save().then(profile => {

            res.json(profile);
        });
    });
    });
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

    // @route GET api/profile/user/:userId
    // @desc Get profile by handle
    // @access Public



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

 // @route DELETE api/profile/speeches/:userId
    // @desc Delete speech 
    // @access Private
    

    router.delete('/speeches/:speechId', passport.authenticate('jwt', {session: false}), (req, res) => {
   
            Profile.findOne({user : req.user.id})
            .then(profile => {
                const removeIndex  = profile.speechesGiven
                .map(item => item.id)
                .indexOf(req.params.speechId );

                profile.speechesGiven.splice(removeIndex, 1);
                console.log(profile);
                //Save
                profile.save().then(profile => res.json(profile));
        }).catch(err => res.status(404).json(err));
        });

        
 // @route DELETE api/profile/speeches/:userId
    // @desc Delete speech 
    // @access Private
    

    router.delete('/evaluations/:sevalId', passport.authenticate('jwt', {session: false}), (req, res) => {
   
        Profile.findOne({user : req.user.id})
        .then(profile => {
            const removeIndex  = profile.speechesEvaluated
            .map(item => item.id)
            .indexOf(req.params.speechId );

            profile.speechesEvaluated.splice(removeIndex, 1);
            console.log(profile);
            //Save
            profile.save().then(profile => res.json(profile));
    }).catch(err => res.status(404).json(err));
    });



    
 // @route DELETE api/profile/speeches/:userId
    // @desc Delete speech 
    // @access Private
    

    router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
   
        Profile.findOneAndRemove({user: req.user.id})
        .then(()=> {
            User.findOneAndRemove({_id: req.user.id}).then(
                () => {
                    res.json({success: true})
                }
            );

        });
    });


// @route GET api/profile/test
// @desc Tests profile route
// @access Public
router.get('/test', (req, res)=>{res.json({msg: "Profile works!"})});

module.exports = router;