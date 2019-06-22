import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroupInput from '../common/TextFieldGroupInput';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import {createProfile, getCurrentProfile} from '../../actions/profileActions'

import isEmpty from '../../validation/is-empty';


class EditProfile extends Component {

    constructor(props){
        super (props);

        this.state = {
            displaySocialInputs : false,
            handle: '',//d
            club: '', //d 
            location: '',//d 
            work: '',
             ecPosition: '',//d 
              ecPositionDetail: '',//d 
            alreadyCompleted: '',//d 
            numberOfSpeechesGiven: '',
            about: '',//d 
            youtube: '',
            linkedin: '',
            facebook: '',
            instagram: '',
            twitter: '',
            speechInterests: '',//d 
            competitionsParticipatedIn: '',//d 
            errors : {},
        }
        this.onChange = this.onChange.bind(this);
    }   
    componentDidMount(){
        this.props.getCurrentProfile();

    }
    onSubmit(e){
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,//d
            club:  this.state.club, //d 
            location: this.state.location,//d 
            work: this.state.work,
             ecPosition: this.state.ecPosition,//d 
              ecPositionDetail: this.state.ecPositionDetail,//d 
            alreadyCompleted:  this.state.alreadyCompleted,//d 
            numberOfSpeechesGiven: this.state.numberOfSpeechesGiven,
            about: this.state.about,//d 
            youtube:  this.state.youtube,
            linkedin: this.state.linkedin,
            facebook: this.state.facebook,
            instagram: this.state.instagram,
            twitter: this.state.twitter,
            speechInterests: this.state.speechInterests,//d 
            competitionsParticipatedIn: this.state.competitionsParticipatedIn,//d 
        }
        this.props.createProfile(profileData, this.props.history);

    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
 
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors)
            this.setState({errors: nextProps.errors});

            if(nextProps.profile){
                const profile = nextProps.profile.profile;

                profile.location = !isEmpty(profile.location) ? profile.location : '';
                profile.ecPosition = !isEmpty(profile.ecPosition) ? profile.ecPosition : '';
                profile.ecPositionDetail = !isEmpty(profile.ecPositionDetail) ? profile.ecPositionDetail : '';
                profile.alreadyCompleted = !isEmpty(profile.alreadyCompleted) ? profile.alreadyCompleted : '';

                
                profile.social = !isEmpty(profile.social) ? profile.social : {};
                profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
                profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
                profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
                profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
                profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
                

                 // Set component fields state
                 
        this.setState ({
            displaySocialInputs : !isEmpty(profile.social),
            handle: profile.handle, 
            club:  profile.club, 
            location: profile.location, 
            work: profile.work,
            ecPosition: profile.ecPosition, 
            ecPositionDetail: profile.ecPositionDetail, 
            alreadyCompleted: profile.alreadyCompleted, 
            numberOfSpeechesGiven: profile.numberOfSpeechesGiven,
            about: profile.about, 
            youtube: profile.youtube,
            linkedin: profile.linkedin,
            facebook: profile.facebook,
            instagram: profile.instagram,
            twitter: profile.twitter,
            speechInterests: profile.speechInterests, 
            competitionsParticipatedIn: profile.competitionsParticipatedIn, 
            errors : {},
        });

            }
    }
    render() {

        const {errors, displaySocialInputs} = this.state;

        let socialInputs;
        if(displaySocialInputs){
            socialInputs = (
                <div>
                <InputGroup
                    placeholder="Youtube Channel URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}
                >
                </InputGroup>  
                <InputGroup
                    placeholder="LinkedIn URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}
                >
                </InputGroup>  
                <InputGroup
                    placeholder="Twitter URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                >
                </InputGroup>  
                <InputGroup
                    placeholder="Facebook Page/Profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                >
                </InputGroup>  
                <InputGroup
                    placeholder="Instagram Page URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}
                >
                </InputGroup>  


                </div>


            );

        } 

        const options = [
            {
                label: '* Select Speech Interests', value: 0
            }, 
            {
                label: 'Comedy/Humorous', value: 'Comedy/Humorous'
            }, 
            {
                label: 'Informational', value: 'Informational'
            }, 
            {
                label: 'Inspirational', value: 'Inspirational'
            }, 
            {
                label: 'Entertaining', value: 'Entertaining'
            }, 
            {
                label: 'Storytelling', value: 'Storytelling'
            }, 
            {
                label: 'Poetry', value: 'Poetry'
            }, 
            {
                label: 'Other', value: 'Other'
            }
        ];
        return (
            <div className = "create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Edit Your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out!
                                </p>
                            <small className="d-block pb-3">* = required fields</small>
                         <form onSubmit={this.onSubmit.bind(this)}>
                            <TextFieldGroupInput
                            placeholder="* Profile Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info="A unique handle for your Speaker profile for people to access your speeches and work (This can't be changed later)"
                            ></TextFieldGroupInput>
                            <SelectListGroup
                            name="speechInterests"
                            value={this.state.speechInterests}
                            onChange={this.onChange}
                            error={errors.speechInterests}
                            options={options}
                            info="Give us an idea of what interests you"
                            ></SelectListGroup>

                            <TextFieldGroupInput
                            placeholder="Club"
                            name="club"
                            value={this.state.club}
                            onChange={this.onChange}
                            error={errors.club}
                            info="What Toastmasters club are you a part of/associated with?"
                            ></TextFieldGroupInput>
                                 <TextFieldGroupInput
                            placeholder="Any Position in EC (eg. President, VP-PR)"
                            name="ecPosition"
                            value={this.state.ecPosition}
                            onChange={this.onChange}
                            error={errors.ecPosition}
                            info="Do you hold any EC position in your Toastmasters club?"
                            ></TextFieldGroupInput>
                                 <TextFieldGroupInput
                            placeholder="CC/CL/ACB/DTM"
                            name="alreadyCompleted"
                            value={this.state.alreadyCompleted}
                            onChange={this.onChange}
                            error={errors.alreadyCompleted}
                            info="Any certifications (like CC/CL/Pathways) that you've already done?"
                            ></TextFieldGroupInput>

                            <TextFieldGroupInput
                            placeholder="What competitions have you taken part in (been a part of)?"
                            name="competitionsParticipatedIn"
                            value={this.state.competitionsParticipatedIn}
                            onChange={this.onChange}
                            error={errors.competitionsParticipatedIn}
                            info="Please use Comma seperated values (eg. Club level Humorous 2018, Division level TT 2016"
                            ></TextFieldGroupInput>


                              <TextAreaFieldGroup
                              placeholder="More Details about your EC Position"
                              name="ecPositionDetail"
                              value={this.state.ecPositionDetail}
                              onChange={this.onChange}
                              error={errors.ecPositionDetail}
                              info="If any, Can you describe your experience as an EC member in detail?"
                            ></TextAreaFieldGroup>

                            <TextFieldGroupInput
                            placeholder="Location"
                            name="location"
                            value={this.state.location}
                            onChange={this.onChange}
                            error={errors.location}
                            info="City OR City and State suggested (eg. New Delhi, Delhi)"
                            ></TextFieldGroupInput>
                            <TextFieldGroupInput
                            placeholder="Work"
                            name="work"
                            value={this.state.work}
                            onChange={this.onChange}
                            error={errors.work}
                            info="What do you do besides Public Speaking?"
                            ></TextFieldGroupInput>
                             <TextAreaFieldGroup
                              placeholder="Tell us about yourself"
                              name="about"
                              value={this.state.about}
                              onChange={this.onChange}
                              error={errors.about}
                              info="Tell us you're associated with TM, what are you looking forward to, etc."
                            ></TextAreaFieldGroup>
                        <div className="mb-3">
                            <button onClick={() => {this.setState(prevState => ({
                                displaySocialInputs: !prevState.displaySocialInputs
                            })
                            ) }} className="btn btn-light" type="button">Add Social Network Links</button> 
                            <span className="text-muted">Optional </span>

                        </div>
                        {socialInputs}
                        <input type="submit" value="Submit"className ="btn btn-info btn-block mt-4" /> 
                         </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EditProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired

}
const mapStateToProps =(state) =>  ({
    profile: state.profile,
    errors: state.errors

});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));
