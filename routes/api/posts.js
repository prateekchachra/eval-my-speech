const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validatePostInput = require('../../validation/post');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route GET api/posts/test
// @desc Tests posts route
// @access Public


router.get('/test', (req, res)=>{res.json({msg: "Posts works!"})});


// @route GET api/posts
// @desc Get all posts
// @access Public


router.get('/', (req, res)=>{
    Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostfound: 'No post found with that ID'}));

});


// @route GET api/posts
// @desc Get single post
// @access Public


router.get('/:id', (req, res)=>{
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostfound: 'No post found with that ID'}));

});


// @route DELETE api/posts
// @desc Delete post
// @access Private


router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res)=>{
   Profile.findOne({user: req.user.id})
   .then(profile => {
    Post.findById(req.params.id).then(
        post => {
            if(post.user.toString() != req.user.id){
               return res.status(401).json({notAuthorized: 'User not authorized'}); 

            }
            post.remove().then(() => res.json({success: 'true'}));
        }
    ).catch(err => res.status(404).json({postnotfound: 'No post found with that ID' }));
   });

});

// @route POST api/posts/like/:id
// @desc Like post
// @access Private

router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res)=>{
    Profile.findOne({user: req.user.id})
    .then(profile => {
     Post.findById(req.params.id).then(
         post => {
             if(post.likes.filter(like=> like.user.toString() === req.user.id).length > 0 ){
                return res.status(400).json({alreadyLiked: 'User already liked this post'});     

             }
            post.likes.unshift({user: req.user.id});
            post.save().then(post => res.json(post));
         }
     ).catch(err =>{ res.status(404).json({postnotfound: 'No post found with that ID' });
    });
 
 });
});
// @route POST api/posts/unlike/:id
// @desc Unlike post
// @access Private

router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res)=>{
    Profile.findOne({user: req.user.id})
    .then(profile => {
     Post.findById(req.params.id).then(
         post => {
             if(post.likes.filter(like=> like.user.toString() === req.user.id).length === 0 ){
                return res.status(400).json({notLiked: 'User has not yet liked the post'});     

             }
             //Get remove index

             const removeIndex = post.likes
             .map(item => item.user.toString())
             .indexOf(req.user.id);
            post.likes.splice(removeIndex, 1);
            post.save().then(post => res.json(post));
         }
     ).catch(err =>{ res.status(404).json({postnotfound: 'No post found with that ID' });
    });
 
 });
});

// @route POST api/posts
// @desc Create post
// @access Private


router.post('/', passport.authenticate('jwt', {session: false}), (req, res)=>{

    const {errors, isValid} = validatePostInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);

    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        youtubeLink: req.body.youtubeLink,
        speechBody: req.body.speechBody,
        avatar: req.user.avatar,
        user: req.user.id,

    });
    newPost.save().then(post => res.json(post));
});



// @route POST api/posts/com/:id
// @desc Add commendation to post
// @access Private

router.post('/com/:id', passport.authenticate('jwt', {session: false}), (req, res)=>{

    const {errors, isValid} = validatePostInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);

    }
     Post.findById(req.params.id).then(
         post => {
             const newCommendation = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id

             }

             post.commendations.unshift(newCommendation);
             //Save post
             post.save().then(post => res.json(post));

         }
     ).catch(err =>{ res.status(404).json({postnotfound: 'No post found with that ID' });
    });
 
});


// @route POST api/posts/recom/:id
// @desc Add recommendation to post
// @access Private

router.post('/recom/:id', passport.authenticate('jwt', {session: false}), (req, res)=>{

    const {errors, isValid} = validatePostInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);

    }
     Post.findById(req.params.id).then(
                  post => {
             const newRecommendation = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id

             }

             post.recommendations.unshift(newRecommendation);
             //Save post
             post.save().then(post => res.json(post));
             
         }
     ).catch(err =>{ res.status(404).json({postnotfound: 'No post found with that ID' });
    });
});

// @route DELETE api/posts/recom/:id
// @desc Delete commendation from post
// @access Private

router.delete('/com/:id/:com_id', passport.authenticate('jwt', {session: false}), (req, res)=>{
     Post.findById(req.params.id).then(
                  post => {
                    if(post.commendations.filter(commendation => commendation._id.toString() === req.params.com_id).length === 0){
                            return res.status(404).json({comNotExists: 'Commendation doesn\'t exist'});
                         }

                         const removeIndex = post.commendations
                         .map(item => item._id.toString())
                         .indexOf(req.params.com_id);

                         post.commendations.splice(removeIndex, 1);
             post.save().then(post => res.json(post));
             
         }
     ).catch(err =>{ res.status(404).json({postnotfound: 'No post found with that ID' });
    });
});

// @route Delete api/posts/recom/:id
// @desc Delete recommendation from post
// @access Private

router.delete('/recom/:id/:recom_id', passport.authenticate('jwt', {session: false}), (req, res)=>{

     Post.findById(req.params.id).then(
        post => {
            if(post.recommendations.filter(recommendation => recommendation._id.toString() === req.params.recom_id).length === 0){
                    return res.status(404).json({recomNotExists: 'Recommendation doesn\'t exist'});
                 }

                 const removeIndex = post.recommendations
                 .map(item => item._id.toString())
                 .indexOf(req.params.recom_id);

                 post.recommendations.splice(removeIndex, 1);
     post.save().then(post => res.json(post));
     
             
         }
     ).catch(err =>{ res.status(404).json({postnotfound: 'No post found with that ID' });
    });
});

module.exports = router;