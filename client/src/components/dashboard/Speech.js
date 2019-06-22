import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteSpeech} from '../../actions/profileActions';


class Speech extends Component {

    onDeleteClick(id){

        this.props.deleteSpeech(id, this.props.history);

    }

    render() {
        const speeches = this.props.speeches.map(sp => (
            <tr key = {sp._id}>
              <td>  {sp.titleOfSpeech} </td>
              <td>  {sp.speechType} </td>
              <td>  {sp.club} </td>
              <td> <Moment format="DD/MM/YYYY">{sp.date}</Moment> </td>
              <td>  {sp.description} </td>
              <td>  {sp.challenges} </td>
              <td>   {sp.speechBody} </td>
              <td><button onClick={this.onDeleteClick.bind(this, sp._id)} className="btn btn-danger">Delete</button></td>
            </tr>

        ));
        return (
            <div >
                <h4 className="mb-2">Speeches</h4>
                <table className="table" >
                <thead>
                <tr>
                   <th>Title</th>
                   <th>Type of Speech</th>
                   <th>Club</th>
                   <th>Date</th>
                   <th>Description of the speech</th>
                   <th>Challenges faced</th>
                   <th>Speech Body</th>
                </tr>

                </thead>
                    {speeches}
                </table>
            </div>
        )
    }
}
Speech.propTypes = {

    deleteSpeech: PropTypes.func.isRequired,

}

export default connect(null, {deleteSpeech})(Speech);
