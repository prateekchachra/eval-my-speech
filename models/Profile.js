const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {SpeechSchema} = require('./Speech');
const {EvaluationSchema} = require('./Evaluation');


const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    club: {
        type: String,
        required: true,
    },
     
    location: {
        type: String,
    },
    work: {
        type: String,
    },
    ecPosition: {

        type: String
    },
    ecPositionDetail: {
        type: String

    },
    alreadyCompleted: {
        type: String
    },
    numberOfSpeechesGiven: {
        type: String
    },
    speechInterests: {
        type: [String]
    },
    competitionsParticipatedIn: {
        type: [String]
    },
    about: {
        type: String,
        required: true

    },
    speechesGiven: [SpeechSchema],
    speechesEvaluated: [EvaluationSchema],
    social: {
        youtube: {
            type: String
        },
        linkedin: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        twitter: {
            type: String
        },



    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);