const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};
    
    data.titleOfSpeech = !isEmpty(data.titleOfSpeech) ? data.titleOfSpeech : '';
     data.speechType = !isEmpty(data.speechType) ? data.speechType : '';
     data.club = !isEmpty(data.club) ? data.club : '';
     data.description = !isEmpty(data.description) ? data.description : '';
     data.date = !isEmpty(data.date) ? data.date : '';
    data.youtubeLink = !isEmpty(data.youtubeLink) ? data.youtubeLink : '';

    
    if(Validator.isEmpty(data.titleOfSpeech)){
        errors.titleOfSpeech = 'Title of the speech is required.';

    }
    
    if(Validator.isEmpty(data.description)){
        errors.description = 'Description of the speech is required.';

    }
    if(Validator.isEmpty(data.club)){
        errors.club = 'Club field is required.';

    }
    if(!Validator.isEmpty(data.youtubeLink)){
       if(!Validator.isURL(data.youtubeLink)) {
           errors.youtubeLink = 'Not a valid Link';

           if(!Validator.contains(data.youtubeLink, 'youtube')){
            errors.youtubeLink = 'Not a valid Youtube link, please check';
           }
    }
    }
    if(Validator.isEmpty(data.date)){
        errors.date = 'Date of speech is required.';

    }
    
    return{
        errors,
        isValid: isEmpty(errors)
    }
}