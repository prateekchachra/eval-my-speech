import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
 import TextFieldGroupInput from '../common/TextFieldGroupInput'
 import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
 import SelectListGroup from '../common/SelectListGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addEvaluations } from '../../actions/profileActions';




class AddEvaluations extends Component {

    constructor(props){

        super(props);
        this.state= {
            titleOfSpeech: '',
            speechType: '',
            club: '',
            date: '',
            description: '',
            challenges: '',
            evaluationBody: '',
            errors: {}    
        }

        this.onChange = this.onChange.bind(this);
        }



 onSubmit(e){
        e.preventDefault();
            console.log(this.state);
            const evalData = {
                titleOfSpeech: this.state.titleOfSpeech,
                speechType: this.state.speechType,
                club: this.state.club,
                date: this.state.date,
                description: this.state.description,
                challenges: this.state.challenges,
                evaluationBody: this.state.evaluationBody,
            };
            this.props.addEvaluations(evalData, this.props.history);

        }

        onChange(e){
            this.setState({[e.target.name]: e.target.value});
        }
        componentWillReceiveProps(nextProps){
            if(nextProps.errors){
                this.setState({errors : nextProps.errors});
            }


        }
    render() {

        const {errors} = this.state;
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
            <div className="add-evaluation">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">

                        <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                        <h1 className="display-4 text-center">Add Any Evaluations You Have Given</h1>
                        <p className="lead text-center">Add any evaluations you might have given in the past.
                        This will help the new joinees a lot for reference.</p>
                        <small className="d-block pb-3">* = required fields</small>
                        <form onSubmit={this.onSubmit.bind(this)}  >
                        <TextFieldGroupInput
                            placeholder="Speech Title"
                            name="titleOfSpeech"
                            value={this.state.titleOfSpeech}
                            onChange={this.onChange}
                            error={errors.titleOfSpeech}
                            info="Enter the title of the speech you evaluated"
                            ></TextFieldGroupInput>
                        <TextFieldGroupInput
                            placeholder="Club Name"
                            name="club"
                            value={this.state.club}
                            onChange={this.onChange}
                            error={errors.club}
                            info="Which club did you evaluate the speech in?"
                            ></TextFieldGroupInput>
                            <h6>Date</h6>
                        <TextFieldGroupInput
                            name="date"
                            type="date"
                            value={this.state.date}
                            onChange={this.onChange}
                            error={errors.date}
                            info="Please enter the approx date of the Evaluation"
                            ></TextFieldGroupInput>
                        <SelectListGroup
                            name="speechType"
                            value={this.state.speechType}
                            onChange={this.onChange}
                            error={errors.speechType}
                            options={options}
                            info="What type of speech was it?"
                            ></SelectListGroup>
                            <TextAreaFieldGroup
                              placeholder="Body of the speech"
                              name="evaluationBody"
                              value={this.state.evaluationBody}
                              onChange={this.onChange}
                              error={errors.evaluationBody}
                              info="The body/writeup for the evaluation"
                            ></TextAreaFieldGroup>
                              <TextAreaFieldGroup
                              placeholder="Description of the evaluation"
                              name="description"
                              value={this.state.description}
                              onChange={this.onChange}
                              error={errors.description}
                              info="Describe anything like the analysis behind the evaluation/the process behind creating it."
                            ></TextAreaFieldGroup>
                              
                              <TextAreaFieldGroup
                              placeholder="The body of your speech"
                              name="challenges"
                              value={this.state.challenges}
                              onChange={this.onChange}
                              error={errors.challenges}
                              info="Challenges you faced in your evaluation, if any"
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

AddEvaluations.propTypes = {
    addEvaluations: PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired


}

const mapStateToProps = (state) => ({
    profile : state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {addEvaluations})(withRouter(AddEvaluations));
