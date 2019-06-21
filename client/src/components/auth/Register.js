import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {registerUser} from '../../actions/authActions';
import {withRouter} from 'react-router-dom';
import TextFieldGroupInput from '../common/TextFieldGroupInput';

class Register extends Component {

    constructor(){

        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}

        }
        this.onChange = this.onChange.bind(this);
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    componentDidMount(){
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard');

      }
    }
    onSubmit(e){
        e.preventDefault(); 
        const newUser= {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
       
        this.props.registerUser(newUser, this.props.history);
      }
      componentWillReceiveProps(nextProps){
        if(nextProps.errors){
          this.setState({errors: nextProps.errors});
        }
      }

    render() {

      const { errors } = this.state;
      const {user} = this.props.auth;

        return (
            <div className="register">
              
          {user? user.name : null}
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your Evaluate My Speech account</p>
                  <form noValidate onSubmit = {this.onSubmit.bind(this)}>
                
                    <TextFieldGroupInput 
                      placeholder="Name" name="name"
                       value={this.state.name}
                       onChange={this.onChange}
                        error ={errors.name}
                      />

                      <TextFieldGroupInput 
                      placeholder="Email" name="email"
                       value={this.state.email}
                       onChange={this.onChange}
                        error ={errors.email}
                        info = "This site uses Gravatar so if you want a profile image, use a Gravatar email"
                      />
                      
                      <TextFieldGroupInput 
                      placeholder="Password" name="password"
                      type="password" value={this.state.password} 
                       onChange={this.onChange}
                        error ={errors.password}
                      />
                     <TextFieldGroupInput 
                     placeholder="Confirm Password" name="password2"
                      type="password" value={this.state.password2} 
                       onChange={this.onChange}
                        error ={errors.password2}
                      />
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

Register.propTypes = {
  registerUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({

auth: state.auth,
errors : state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));