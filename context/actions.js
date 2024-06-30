import { getCurrentUser } from "../lib/appwrite";

export const SET_IS_LOGGED = 'SET_IS_LOGGED';
export const SET_USER = 'SET_USER';
export const SET_LOADING = 'SET_LOADING';
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';

//mock one
export const setName = name => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};


export const setIsLogged = isLogged => dispatch => {
  dispatch({
    type: SET_IS_LOGGED,
    payload: isLogged,
  });
};

// export const setIsLogged = (isLogged) => ({
//     type: SET_IS_LOGGED,
//     payload: isLogged,
//   });

export const setUser = user => dispatch => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

// export const setUser = (user) => ({
//   type: SET_USER,
//   payload: user,
// });

export const setLoading = loading => dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: loading,
  });
};

// export const setLoading = (loading) => ({
//   type: SET_LOADING,
//   payload: loading,
// });

export const fetchCurrentUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await getCurrentUser();
    if (res) {
      dispatch(setIsLogged(true));
      dispatch(setUser(res));
    } else {
      dispatch(setIsLogged(false));
      dispatch(setUser(null));
    }
  } catch (error) {
    console.error(error);
    dispatch(setIsLogged(false));
    dispatch(setUser(null));
  } finally {
    dispatch(setLoading(false));
  }
};