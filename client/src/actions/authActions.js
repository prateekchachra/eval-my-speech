import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
// Register User

export const registerUser = (userData, history) => dispatch => {

    axios.post('/api/users/register'
    ,userData).then(response => {
        history.push('/login');
    }).catch(err =>{
            if(err.response){
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
        else{
            console.log('Server error\n',err);
        }
        }
    );
};

// Login - get user token


export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login',
        userData)
    .then(response => {
             
            //Save to local storage 
            const {token} = response.data;
            localStorage.setItem('jwtToken', token);

            //Set token to auth header
            setAuthToken(token);

            //Decode token to get user data
            const decoded = jwt_decode(token);
           
            // Set current user
            dispatch(setCurrentUser(decoded));
    }).catch(err =>{
            if(err.response){
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
    }
    else{
        console.log('Server error\n',err);
    }
}   
    );

};


// Set logged in user

export const setCurrentUser = (decoded) => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded

    }
};

export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');
    //Remove auth header from future requests.
    setAuthToken(false);

    //Set current user to {} which will set isAuthenticated to false

    dispatch(setCurrentUser({}));

}