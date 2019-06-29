import React, { Component } from 'react'
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {getSpeech, deleteSpeech} from '../../actions/profileActions';
import YouTube from 'react-youtube';
import isEmpty from '../../validation/is-empty';
import Spinner from '../../components/common/Spinner';


class SpeechItem extends Component {

    
    onDeleteClick(id){

        this.props.deleteSpeech(id, this.props.history);

    }

    componentWillMount(){

        this.props.getSpeech(this.props.match.params.id);

    }
    render() {
        let speechContent;

        const {speech, loading} = this.props.profile; 
        if(speech === undefined)
        {

            speechContent = <p className="lead text-muted">Sorry, the Speech you're looking for doesn't exist</p>

        }
        else  if(speech === null || loading || Object.keys(speech).length === 0 ){
            speechContent = <Spinner />

        }
        else {
            console.log(speech.youtubeLink);

        speechContent = (    <div>
             <h4 className="mb-2">  Title: {speech.titleOfSpeech} </h4>
            
        <p style={{float: 'right'}}>  {speech.speechType} </p>
        <p className = "lead text-muted">  {speech.club} </p>
        <p  style={{float: 'right'}}> <Moment format="DD/MM/YYYY">{speech.date}</Moment> </p>
        {!isEmpty(speech.youtubeLink) ? (<YouTube videoId={speech.youtubeLink.split('=')[1]} />) : (<span></span>)}
        <pre style={{marginTop: 20}}> <p  className = "lead text-muted">{speech.description}</p></pre>
        <pre><p  className = "lead text-muted">{speech.speechBody}</p></pre>
        <pre><p className = "lead text-muted">  {speech.challenges} </p></pre>
        <p><button onClick={this.onDeleteClick.bind(this, speech._id)} className="btn btn-danger">Delete</button></p>
        </div>   );
        }
        return(
            <div className="post">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {speechContent}
                    </div>
                </div>
            </div>
        </div>
               
         );

    }
}
SpeechItem.propTypes = {


}

const mapStateToProps = state => ({
    profile: state.profile,
});

export default connect(mapStateToProps, {getSpeech, deleteSpeech})(SpeechItem);
