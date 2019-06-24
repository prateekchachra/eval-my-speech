const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {CommentSchema} = require('./Comment');


const EvaluationSchema = new Schema({
    profile : {
        type: Schema.Types.ObjectId,
        ref: 'profile'
    },
        titleOfSpeech: {
            type:String,
        required: true,
        },
        speechType: {
            type: String,
            required: true
        },
        
        club: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true

        },
        challenges: {
            type: String
        },
        evaluationBody: {
            type: String
        },
        youtubeLink: {
            type: String
        },
        commendations: [CommentSchema],
        recommendations: [CommentSchema],
});

Evaluation = mongoose.model('evaluation', EvaluationSchema);

module.exports = {EvaluationSchema, Evaluation};