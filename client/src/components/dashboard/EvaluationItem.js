import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteSpeech} from '../../actions/profileActions';
import YouTube from 'react-youtube';
import isEmpty from '../../validation/is-empty';

class EvaluationItem extends Component {


    
    onDeleteClick(id){

        this.props.deleteSpeech(id, this.props.history);

    }
//TODO : EvaluationItem component through ID aega, otherwise the table stays the same.
    render() {
        const {evaluation} = this.props; 

            return(
            <div id = {evaluation._id} style={{padding: 20}}>
              <h4 className="mb-2">  Title: {evaluation.titleOfSpeech} </h4>
                
              <p style={{float: 'right'}}>  {evaluation.speechType} </p>
              <p className = "lead text-muted">  {evaluation.club} </p>
              <p  style={{float: 'right'}}> <Moment format="DD/MM/YYYY">{evaluation.date}</Moment> </p>
              {!isEmpty(evaluation.youtubeLink) ? (<YouTube videoId={evaluation.youtubeLink.split('=')[0]} />) : (<span></span>)}
              <pre style={{marginTop: 20}}> <p  className = "lead text-muted">{evaluation.description}</p></pre>
              <pre><p  className = "lead text-muted">{evaluation.speechBody}</p></pre>
              <pre><p className = "lead text-muted">  {evaluation.challenges} </p></pre>
              <p><button onClick={this.onDeleteClick.bind(this, evaluation._id)} className="btn btn-danger">Delete</button></p>
                </div>
         );
    }
}
EvaluationItem.propTypes = {

    getEvaluation: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
    profile: state.profile,
});

export default connect(mapStateToProps, {deleteSpeech})(EvaluationItem);
