
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};
    
    data.text = !isEmpty(data.text) ? data.text : '';
  

    if(!Validator.isLength(data.text, {min: 20, max: 300}));
    if(Validator.isEmpty(data.text)){
        errors.text = 'Text field is required.';

    }

    if(!isEmpty(data.youtubeLink)){
        if(!Validator.isURL(data.youtubeLink)){
            errors.youtubeLink = 'Not a valid URL';

        }
    }
    if(!isEmpty(data.speechBody)){
        if(!Validator.isLength(data.speechBody, {min: 100})){
            errors.speechBody = 'Speech body cannot be less than 100 characters';
        }
    }
    return{
        errors,
        isValid: isEmpty(errors)
    }
}