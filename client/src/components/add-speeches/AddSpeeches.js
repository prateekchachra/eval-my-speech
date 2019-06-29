import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
import TagsInput from 'react-tagsinput';
import Autosuggest from 'react-autosuggest';
import './tagsInputStyling.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import * as _ from 'lodash';
 import TextFieldGroupInput from '../common/TextFieldGroupInput'
 import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
 
import {addSpeeches } from '../../actions/profileActions';



const options = [
    {
        name: 'Comedy/Humorous', value: 'Comedy/Humorous'
    }, 
    {
        name: 'Informational', value: 'Informational'
    }, 
    {
        name: 'Inspirational', value: 'Inspirational'
    }, 
    {
        name: 'Entertaining', value: 'Entertaining'
    }, 
    {
        name: 'Storytelling', value: 'Storytelling'
    }, 
    {
        name: 'Poetry', value: 'Poetry'
    }, 

];
class AddSpeeches extends Component {

    
    
    constructor(props){

        super(props);
        this.state= {
            titleOfSpeech: '',
            speechType: [],
            club: '',
            date: '',
            description: '',
            challenges: '',
            speechBody: '',
            youtubeLink: '',
            errors: {}, 
        }

        this.onChange = this.onChange.bind(this);
        }



 onSubmit(e){
        e.preventDefault();
            const speechData = {
                titleOfSpeech: this.state.titleOfSpeech,
                speechType: this.state.speechType,
                club: this.state.club,
                date: this.state.date,
                description: this.state.description,
                challenges: this.state.challenges,
                speechBody: this.state.speechBody,
                youtubeLink: this.state.youtubeLink
            };
            this.props.addSpeeches(speechData, this.props.history);

        }

        onChange(e){
            this.setState({[e.target.name]: e.target.value});
        }
        componentWillReceiveProps(nextProps){
            if(nextProps.errors){
                this.setState({errors : nextProps.errors});
            }


        }

        
  handleSTChange = (value) => {
    this.setState({
        speechType: value
    })
  };

  


    render() {
        function autocompleteRenderInput ({addTag, ...props}) {
            const handleOnChange = (e, {newValue, method}) => {
              if (method === 'enter') {
                e.preventDefault()
              } else {
                props.onChange(e)
              }
            }

            const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
            const inputLength = inputValue.length
      
            let suggestions = options.filter((type) => {
              return type.name.toLowerCase().slice(0, inputLength) === inputValue
            })
      
            return (

              <Autosuggest
                ref={props.ref}
                suggestions={suggestions}
                shouldRenderSuggestions={(value) => value && value.trim().length > 0}
                getSuggestionValue={(suggestion) => suggestion.name}
                renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
                inputProps={{...props, onChange: handleOnChange}}
                onSuggestionSelected={(e, {suggestion}) => {
                  addTag(suggestion.name)
                }}
                onSuggestionsClearRequested={() => {}}
                onSuggestionsFetchRequested={() => {}}
              />
            )
      }
        const {errors} = this.state;
        return (
            <div className="add-speeches">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">

                        <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                        <h1 className="display-3 text-center">Add Any Speeches You Have Given</h1>
                        <p className="lead text-center">Add any speeches you might have given in the past.
                        This will help the new joinees a lot for reference.</p>
                        <small className="d-block pb-3">* = required fields</small>
                        <form onSubmit={this.onSubmit.bind(this)}  >
                        <TextFieldGroupInput
                            placeholder="* Speech Title"
                            name="titleOfSpeech"
                            value={this.state.titleOfSpeech}
                            onChange={this.onChange}
                            error={errors.titleOfSpeech}
                            info="Enter the title of the speech you gave"
                            ></TextFieldGroupInput>
                        <TextFieldGroupInput
                            placeholder="* Club Name"
                            name="club"
                            value={this.state.club}
                            onChange={this.onChange}
                            error={errors.club}
                            info="Which club did you give the speech in?"
                            ></TextFieldGroupInput>
                            <TextFieldGroupInput
                            name="youtubeLink"
                            placeholder="www.youtube.com/[your-video]"
                            value={this.state.youtubeLink}
                            onChange={this.onChange}
                            error={errors.youtubeLink}
                            info="If you have added the link on YouTube, please link the URL here"
                            ></TextFieldGroupInput>
                            <h6>Date</h6>
                        <TextFieldGroupInput
                            name="date"
                            type="date"
                            value={this.state.date}
                            onChange={this.onChange}
                            error={errors.date}
                            info="Please enter the approx date of the Speech"
                            ></TextFieldGroupInput>
                            <div className="form-group"> 
                         <TagsInput
                            renderInput={autocompleteRenderInput} 
                            name="speechType"
                            inputProps={{
                                className: 'react-tagsinput-input',
                                placeholder: "* Select Speech Types"
                             } }
                          value={this.state.speechType}
                          onChange={this.handleSTChange}  />
                          <small className="form-text text-muted">Enter tags for your Speech</small>
                          </div>
                            <TextAreaFieldGroup
                              placeholder="Body of the speech"
                              name="speechBody"
                              value={this.state.speechBody}
                              onChange={this.onChange}
                              error={errors.speechBody}
                              info="The body/writeup for the speech"
                            ></TextAreaFieldGroup>
                              <TextAreaFieldGroup
                              placeholder="* Description of the Speech"
                              name="description"
                              value={this.state.description}
                              onChange={this.onChange}
                              error={errors.description}
                              info="Describe anything like the inspiration for the idea behind the speech/the process behind
                              creating it."
                            ></TextAreaFieldGroup>
                              
                              <TextAreaFieldGroup
                              placeholder="Challenges that you faced"
                              name="challenges"
                              value={this.state.challenges}
                              onChange={this.onChange}
                              error={errors.challenges}
                              info="Challenges you faced in your speech, if any"
                            ></TextAreaFieldGroup>
                        <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                        </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }


}

AddSpeeches.propTypes = {
    addSpeeches: PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired


}

const mapStateToProps = (state) => ({
    profile : state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {addSpeeches})(withRouter(AddSpeeches));
