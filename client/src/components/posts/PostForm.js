import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroupInput from '../common/TextFieldGroupInput';
import {addPost} from '../../actions/postActions';


class PostForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: '',
            youtubeLink: '',
            speechBody: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        
    }

    onSubmit(e){

        e.preventDefault();
        const {user} = this.props.auth; 
        const newPost = {
            text: this.state.text,
            youtubeLink : this.state.youtubeLink,
            name: user.name,
            avatar: user.avatar,
            speechBody: this.state.speechBody
            
        }
       this.props.addPost(newPost);
        this.setState({text: '', youtubeLink: '', speechBody: ''});
    }

    onChange(e){
         
        this.setState({[e.target.name]:e.target.value});
    }
    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({errors: newProps.errors}); 
        }

    }
    

    render() {
        const {errors} = this.state;
        return ( 
            <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Say Something...
              </div>
              <div className="card-body">
                <form onSubmit = {this.onSubmit.bind(this)}>
                  <div className="form-group">
                  <TextFieldGroupInput 
                       placeholder="Youtube Video Link(Optional)" name="youtubeLink"
                       value={this.state.youtubeLink}
                        onChange={this.onChange}
                        error ={errors.youtubeLink}
                      />
                      <TextAreaFieldGroup
                   placeholder="Body of your speech"
                   name="speechBody"
                   value={this.state.speechBody}
                   onChange={this.onChange}
                   error={errors.speechBody}
                   ></TextAreaFieldGroup>

                   <TextAreaFieldGroup
                   placeholder="Ask anything!"
                   name="text"
                   value={this.state.text}
                   onChange={this.onChange}
                   error={errors.text}
                   ></TextAreaFieldGroup>
                  </div>
                  <button type="submit" className="btn btn-dark">Submit</button>
                </form>
              </div>
            </div>
          </div>

        )
    }
}
PostForm.propTypes = {
     addPost: PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    errors : state.errors,
    auth: state.auth

});
export default connect(mapStateToProps, {addPost})(PostForm);