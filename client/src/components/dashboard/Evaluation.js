import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import {deleteEvaluation} from '../../actions/profileActions';


class Evaluation extends Component {

    onDeleteClick(id){

        this.props.deleteEvaluation(id, this.props.history);

    }

    render() {
        const evaluations = this.props.evaluations.map(evn => (
            <tr key = {evn._id}>
              <td>  {evn.titleOfSpeech} </td>
              <td>  {evn.speechType} </td>
              <td>  {evn.club} </td>
              <td> <Moment format="DD/MM/YYYY">{evn.date}</Moment> </td>
              <td>  <Link to={`/evaluation/${evn._id}`} className="btn btn-info" >View</Link></td>
              <td><button onClick={this.onDeleteClick.bind(this, evn._id)} className="btn btn-danger">Delete</button></td>
            </tr>

        ));
        return (
            <div >
                <h4 className="mb-2">Evaluations</h4>
                <table className="table" >
                <thead>
                <tr>
                   <th>Title</th>
                   <th>Type of Speech</th>
                   <th>Club</th>
                   <th>Date</th>
                   <th/>
                   <th/>
                </tr>

                </thead>
                   
                    <tbody> {evaluations}</tbody>
                </table>
            </div>
        )
    }
}
Evaluation.propTypes = {

    deleteEvaluation: PropTypes.func.isRequired,

}

export default connect(null, {deleteEvaluation})(Evaluation);
