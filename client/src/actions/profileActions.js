import axios from 'axios';

import {GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER
, GET_PROFILES,
GET_SPEECH} from './types';

//Get current profile
var ip = "http://localhost:5000";
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get(ip + '/api/profile')
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



//Get profile by handle

export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`${ip}/api/profile/handle/${handle}`)
    .then(res => 
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    ).catch(err => 
        dispatch({
            type: GET_PROFILE,
            payload: null
        })
        );
};




export const addSpeeches = (speechData, history) => dispatch => {

    axios.post(ip + '/api/profile/speeches', speechData)
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

    axios.delete(`${ip}/api/profile/speeches/${id}`)
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
    axios.get(ip + '/api/profile/all')
    .then(res => dispatch({
        type: GET_PROFILES,
        payload: res.data
    }))
    .catch(err => {
        if(err.response){
            dispatch(
        {
        type: GET_PROFILES,
        payload: null
    
        })}
        else{
            console.log('Server error \n',err);
        }});

};


//Get speech
export const getSpeech = (id) => dispatch => {

    axios.get(`${ip}/api/profile/speeches/${id}`)
    .then(res => dispatch({
        type: GET_SPEECH,
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
//Get evaluation
export const getEvaluation = (id) => dispatch => {

    axios.get(`${ip}/api/profile/evaluations/${id}`)
    .then(res => dispatch({
        type: GET_SPEECH,
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




//Delete Evaluation
export const deleteEvaluation = (id) => dispatch => {

    axios.delete(`${ip}/api/profile/evaluations/${id}`)
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

    axios.post(ip + '/api/profile/evaluations', evalData)
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
        axios.delete(ip + '/api/profile')
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
axios.post(ip + '/api/profile', profileData)
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