import axios from 'axios';

import {GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER
, GET_PROFILES} from './types';

//Get current profile

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('http://localhost:5000/api/profile')
    .then(res => 
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    ).catch(err => 
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
        );
};

export const addSpeeches = (speechData, history) => dispatch => {

    axios.post('http://localhost:5000/api/profile/speeches', speechData)
    .then(res => history.push('/dashboard'))
    .catch(err => {
        if(err.response){
            dispatch(
        {
        type: GET_ERRORS,
        payload: err.response.data
    
        })}
        else{
            console.log('Server error \n',err);
        }});

};
//Delete Speech
export const deleteSpeech = (id) => dispatch => {

    axios.delete(`http://localhost:5000/api/profile/speeches/${id}`)
    .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
    }))
    .catch(err => {
        if(err.response){
            dispatch(
        {
        type: GET_ERRORS,
        payload: err.response.data
    
        })}
        else{
            console.log('Server error \n',err);
        }});

};


//Get all profiles
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('http://localhost:5000/api/profile/all')
    .then(res => dispatch({
        type: GET_PROFILES,
        payload: res.data
    }))
    .catch(err => {
        if(err.response){
            dispatch(
        {
        type: GET_PROFILES,
        payload: {}
    
        })}
        else{
            console.log('Server error \n',err);
        }});

};

//Delete Evaluation
export const deleteEvaluation = (id) => dispatch => {

    axios.delete(`http://localhost:5000/api/profile/evaluations/${id}`)
    .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
    }))
    .catch(err => {
        if(err.response){
            dispatch(
        {
        type: GET_ERRORS,
        payload: err.response.data
    
        })}
        else{
            console.log('Server error \n',err);
        }});

};

export const addEvaluations = (evalData, history) => dispatch => {

    axios.post('http://localhost:5000/api/profile/evaluations', evalData)
    .then(res => history.push('/dashboard'))
    .catch(err => {
        if(err.response){
            dispatch(
        {
        type: GET_ERRORS,
        payload: err.response.data
    
        })}
        else{
            console.log('Server error \n',err);
        }});

};






export const setProfileLoading = () => {
    return {

        type: PROFILE_LOADING
    }
}

//Delete account and profile

export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')){
        axios.delete('/api/profile')
        .then(res => dispatch({
            type: SET_CURRENT_USER,
            payload: {}
        }))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        }));


    }

}


//Create Profile

export const createProfile = (profileData, history) => dispatch => {
axios.post('http://localhost:5000/api/profile', profileData)
.then(res => history.push('/dashboard'))
.catch(err => {
    if(err.response){
        dispatch(
    {
    type: GET_ERRORS,
    payload: err.response.data

    })}
    else{
        console.log('Server error \n',err);
    }
    }
);
}

export const clearCurrentProfile = () => {
    return {

        type: CLEAR_CURRENT_PROFILE
    }
}