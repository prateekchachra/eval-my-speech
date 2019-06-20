const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
    let errors = {};
    
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.about = !isEmpty(data.about) ? data.about : '';
    data.club = !isEmpty(data.club) ? data.club : '';


    if(!Validator.isLength(data.handle, {min: 2, max: 40})){
        errors.handle = 'Handle needs to be between 2 and 40 characters';

    }
    if(Validator.isEmpty(data.handle)){
        errors.handle = 'Profile Handle is required.';

    }
    if(Validator.isEmpty(data.club)){
        errors.club = 'Club field is required.';

    }
    if(Validator.isEmpty(data.about)){
        errors.password = 'About field is required.';

    }
    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.youtube = 'Not a valid URL';

        }
    }
    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
            errors.facebook = 'Not a valid URL';

        }
    }
    if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.linkedin)){
            errors.linkedin = 'Not a valid URL';

        }
    }
    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)){
            errors.instagram = 'Not a valid URL';

        }
    }
    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.twitter = 'Not a valid URL';

        }
    }


    return{
        errors,
        isValid: isEmpty(errors)
    }
}