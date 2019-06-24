const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {CommentSchema} = require('./Comment');
//Create schema

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true,
    },
    speechBody: {
        type: String

    },
    youtubeLink: {
        type: String

    },
    name : {
        type: String,
    },
    avatar: {
        type: String
    },
    likes:  [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }

    ],
    commendations: [CommentSchema],    
     recommendations: [CommentSchema]
    

});


module.exports = Post = mongoose.model('post', PostSchema);