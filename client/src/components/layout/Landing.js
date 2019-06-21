import React, { Component } from 'react'
import {Link} from 'react-router-dom';


export default class Landing extends Component {
    render() {
        return (
            <div className="landing">
        <div className="dark-overlay landing-inner text-light">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="display-3 mb-4">Speakers Unite!
            </h1>
            <p className="lead"> Create a Speaker profile/portfolio, share your speeches and get help from other speakers</p>
            <hr />
            <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
            <Link to="/login" className="btn btn-lg btn-light">Login</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
        )
    }
}
