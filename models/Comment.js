const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    name : {
        type: String,
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
Comment = mongoose.model('comment', CommentSchema);

module.exports = {Comment, CommentSchema};



