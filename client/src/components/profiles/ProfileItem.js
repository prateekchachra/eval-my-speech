import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
    render() {
        const {profile} = this.props;
        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                <div className="col-2">
                    <img src={profile.user.avatar} alt="" className="rounded-circle"></img>
                </div>
                <div className="col-lg-6 col-md-4 col-8">
                    <h3>{profile.user.name}</h3>
                    <p>
                        {isEmpty(profile.ecPosition) ? null : <span>{profile.ecPosition} at </span>} {profile.club}
                    </p>
                    <Link to={`/profile/${profile.handle}`} className="btn btn-info"> 
                        View Profile
                    </Link>
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                        <h4>Interests</h4>
                        <ul className="list-group">
                            {profile.speechInterests.slice(0,4).map((interest, index) => (
                                <li key={index} className="list-group-item">
                                    <i className="fa fa-check pr-1" />
                                    {interest}
                                </li>  
                            ))}

                        </ul>
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                        <h5>Competitions {profile.user.name} took part in</h5>
                        <ul className="list-group">
                            {profile.competitionsParticipatedIn.slice(0,4).map((comp, index) => (
                                <li key={index} className="list-group-item">
                                    <i className="fa fa-check pr-1" />
                                    {comp}
                                </li>  
                            ))}

                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}


ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired


}

export default ProfileItem;