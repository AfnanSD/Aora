import { SET_IS_LOGGED, SET_USER, SET_LOADING } from './actions';

const initialState = {
    isLogged: false,
    user: null,
    loading: true,
};

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_LOGGED:
            return { ...state, isLogged: action.payload };
        case SET_USER:
            return { ...state, user: action.payload };
        case SET_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};

export default globalReducer;
