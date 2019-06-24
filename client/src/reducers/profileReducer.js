import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES, GET_SPEECH, GET_EVALUATION} from '../actions/types';



const initialState = {
    profile: null,
    profiles: null,
    speech: null,
    evaluation: null,
    loading : false
}


export default function(state = initialState, action){
    switch (action.type){
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
            case GET_PROFILE:
                return {
                    ...state,
                    profile: action.payload,
                    loading: false
                };

            case GET_SPEECH:
                return {
                    ...state,
                    speech: action.payload,
                    loading:false
                };
                
            case GET_EVALUATION:
                return {
                    ...state,
                    evaluation: action.payload,
                    loading:false
                };

            case GET_PROFILES:
                return {
                    ...state,
                    profiles: action.payload,
                    loading: false

                };
            case CLEAR_CURRENT_PROFILE:
                return {
                    ...state,
                    profile: null
                }

            
                default:
                    return state;
    }
}
