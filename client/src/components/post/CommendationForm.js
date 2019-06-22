import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addCommendation} from '../../actions/postActions';


class CommendationForm extends Component {

    constructor(props){
        super(props);
        this.state = { 
            text: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        
    }

    onSubmit(e){

        e.preventDefault();
        const {user} = this.props.auth; 
        const {postId} = this.props;
        const newComm = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
       this.props.addCommendation(postId,  newComm);
        this.setState({text: ''});
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
               Commend the post!
              </div>
              <div className="card-body">
                <form onSubmit = {this.onSubmit.bind(this)}>
                  <div className="form-group">
                   
                   <TextAreaFieldGroup
                   placeholder="Add Commendation to post"
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
CommendationForm.propTypes = {
     addPost: PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    postId : PropTypes.string.isRequired,    
    errors : PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    errors : state.errors,
    auth: state.auth

});
export default connect(mapStateToProps, {addCommendation})(CommendationForm);