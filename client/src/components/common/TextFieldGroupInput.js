import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroupInput = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled

}) => {
    return(
        <div className="form-group"> 
        <input type={type}
           value={value}
           onChange={onChange}
         className={classnames('form-control form-control-lg', {
            'is-invalid' : error
          })}  placeholder={placeholder} name={name}   disabled={disabled}/>
                 {error && (<div className="invalid-feedback">{error}</div>)}
                 {info && <small className="form-text text-muted">{info}</small>}
        
      </div>
    );
};

TextFieldGroupInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
}

TextFieldGroupInput.defaultProps = {
    type: 'text'
}

export default TextFieldGroupInput;