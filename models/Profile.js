const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    speechesGiven: [
        {
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
                type: String

            },
            challenges: {
                type: String
            },
            speechBody: {
                type: String
            },
    }
    ],
    speechesEvaluated: [
        {
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
                type: String

            },
            challenges: {
                type: String
            },
            evaluationBody: {
                type: String
            },
    }
    ],
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