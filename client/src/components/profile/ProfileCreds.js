import React, { Component } from 'react'
 
import Moment from 'react-moment';


class ProfileCreds extends Component {
     render() {

        const {speeches, evaluations} = this.props;

        const speechItems = speeches.map((speech) => (
            <li key={speech._id} className="list-group-item">
                <h4>{speech.titleOfSpeech}, given in {speech.club}</h4>
                <h5>Type: {speech.speechType}</h5>
                <p>
                    <Moment format="DD/MM/YYYY">{speech.date}</Moment>
                </p>
              Description : 
                <p>
                    {speech.description}
                </p>
                Speech material: 
                <p> 
                    {speech.speechBody}
                </p>
              

            </li>

        ));
        const evalItems = evaluations.map((evn) => (
            <li key={evn._id} className="list-group-item">
                <h4>{evn.titleOfSpeech}, given in {evn.club}</h4>
                <h5>Type: {evn.speechType}</h5>
                <p>
                    <Moment format="DD/MM/YYYY">{evn.date}</Moment>
                </p>
              Description : 
                <p>
                    {evn.description}
                </p>
                Evaluation body: 
                <p> 
                    {evn.evaluationBody}
                </p>
              

            </li>

        ));
         return (
             <div className="row">
                 <div className="col-md-6">
                    <h3 className="text-center text-info">Speeches Given</h3>
                    {speechItems.length >0 ? (
                        <ul className="list-group">
                            {speechItems}
                        </ul>

                    ) : (
                        <p className="text-center">
                            No speeches listed!
                        </p>
                    )}
                 </div>
                 <div className="col-md-6">
                    <h3 className="text-center text-info">Evaluations Given</h3>
                    {evalItems.length >0 ? (
                        <ul className="list-group">
                            {evalItems}
                        </ul>

                    ) : (
                        <p className="text-center">
                            No Evaluations listed!
                        </p>
                    )}
                 </div>
             </div>
         )
     }
 }
 
 export default ProfileCreds;