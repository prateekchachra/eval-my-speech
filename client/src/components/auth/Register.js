import React, { Component } from 'react'
import classnames from 'classnames';


export default class Register extends Component {

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

    onSubmit(e){
        e.preventDefault(); 
        const newUser= {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        fetch('http://localhost:5000/api/users/register', {method: 'POST', body: JSON.stringify(newUser),
      })
        .then(res => res.json()
        ).then(json => this.setState({errors: json}))
        .catch(err => console.log(err));
      
      }

    render() {

      const { errors } = this.state;


        return (
            <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your Evaluate My Speech account</p>
                  <form noValidate onSubmit = {this.onSubmit.bind(this)}>
                    <div className="form-group">
                      <input type="text" 
                       value={this.state.name}
                       onChange={this.onChange}
                        className={classnames('form-control form-control-lg', {
                          'is-invalid' : errors.name
                        })} 
                        placeholder="Name" name="name" />

                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                      <input type="email" value={this.state.email} 
                      onChange={this.onChange}

                     className={classnames('form-control form-control-lg', {
                          'is-invalid' : errors.email
                        })}  
                      placeholder="Email Address" name="email" />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                      <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                    </div>


                    <div className="form-group">
                      <input type="password" value={this.state.password} 
                      onChange={this.onChange}
                      className={classnames('form-control form-control-lg', {
                        'is-invalid' : errors.password
                      })}   placeholder="Password" name="password" />
                      {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                      <input type="password" value={this.state.password2} 
                      onChange={this.onChange}
                      className={classnames('form-control form-control-lg', {
                        'is-invalid' : errors.password2
                      })} placeholder="Confirm Password" name="password2" />
                      {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
