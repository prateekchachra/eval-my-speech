import axios from 'axios';

import {
    POST_LOADING,
GET_POSTS,
GET_POST,
ADD_POST,
 DELETE_POST,
 GET_ERRORS,
 CLEAR_ERRORS

} from './types';



export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    axios.post('/api/posts',postData)
    .then(res => 
        dispatch({
            type: ADD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data

        }));

}


export const addCommendation = (postId, comData) => dispatch => {
    dispatch(clearErrors());
    axios.post(`/api/posts/com/${postId}`,comData)
    .then(res => 
        dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data

        }));

}
export const deleteCommendation = (postId, comId) => dispatch => {
    axios.delete(`/api/posts/com/${postId}/${comId}` )
    .then(res => 
        dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data

        }));

}

// Delete Post
export const deletePost = id => dispatch => {
    axios.delete(`/api/posts/${id}`,id)
    .then(res => 
        dispatch({  
            type: DELETE_POST,
            payload: id
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data

        }));

}
// Add like
export const addLike = id => dispatch => {
    axios.post(`/api/posts/like/${id}`,id)
    .then(res => 
        dispatch(getPosts()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data

        }));

}
// Remove like
export const removeLike = id => dispatch => {
    axios.post(`/api/posts/unlike/${id}`,id)
    .then(res => 
        dispatch(getPosts()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data

        }));

}

// Get Posts
export const getPosts = () => dispatch => {
    axios.get('/api/posts')
    .then(res => 
        dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POSTS,
            payload: null

        }));

}
// Get Post
export const getPost = (id) => dispatch => {
    axios.get(`/api/posts/${id}`)
    .then(res => 
        dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POST,
            payload: null

        }));

}
// Set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING        
    }

}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};