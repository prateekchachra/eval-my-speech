import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteCommendation} from '../../actions/postActions';


class CommendationItem extends Component {

    onDeleteClick(postId, commId){
        this.props.deleteCommendation(postId, commId);  

    }

    render() {

        const {commendation, postId, auth} = this.props;



        return (
           <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src={commendation.avatar} alt="" />
                  </a>
                  <br />
                  <p className="text-center">{commendation.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{commendation.text}</p> 
                  {commendation.user ===auth.user.id ? (
                        <button onClick={this.onDeleteClick.bind(this, postId, commendation._id)} 
                        className="btn btn-danger mr-1" type="button">
                            <i className = "fa fa-trash" />
                        </button> 

                    ): null} 

                </div>
              </div>
            </div>

        )
    }
}

CommendationItem.propTypes = {
    deleteCommendation: PropTypes.func.isRequired,
    commendation : PropTypes.object.isRequired,
    postId : PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    auth: state.auth

});
export default connect(mapStateToProps, {deleteCommendation})(CommendationItem);