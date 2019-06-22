 import React from 'react'
 import {Link} from 'react-router-dom';
const ProfileActions = () => {
     return (
         <div>
             <div className="btn-group mb-4" role="group">
            <Link to="/edit-profile" className="btn btn-light" >
              <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</Link>
            <Link to="/add-speeches" className="btn btn-light">
              <i className="fab fa-black-tie text-info mr-1"></i>
              Add A Speech You Gave</Link>
            <Link to="/add-evaluations" className="btn btn-light">
              <i className="fas fa-graduation-cap text-info mr-1"></i>
              Add An Evaluation You Gave</Link>
          </div>   
         </div>
     )
 }
 
 export default ProfileActions;