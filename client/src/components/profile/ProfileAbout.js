 import React, { Component } from 'react'
 import PropTypes from 'prop-types';
 import isEmpty from '../../validation/is-empty';


class ProfileAbout extends Component {

     render() {
         
    const {profile} = this.props;

    //Get first name
    const firstName = profile.user.name.trim().split(' ')[0];

    const competitionsParticipatedIn = profile.competitionsParticipatedIn.map((comp, index) =>(
        <div key={index} className="p-3">
            <i className="fa fa-check" /> {comp}
        </div>


    ));
         return (

            <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light mb-3">
                <h3 className="text-center text-info">{firstName}'s Bio</h3>
                <p className="lead">{isEmpty(profile.about) ? null : (<span>{profile.about}</span>)}
                </p>
                <h3 className="text-center text-info">Speech Interests: </h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center"></div>
                <div className="p-3">  <i className="fa fa-check" />{profile.speechInterests}</div>
                </div>
                <hr />
                <h3 className="text-center text-info">Competitions {firstName} has taken part in : </h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                   {competitionsParticipatedIn}
                  </div>
                </div>
              </div>
            </div>
          </div>
         )
     }
 }
 
 ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired

 }
 export default ProfileAbout;