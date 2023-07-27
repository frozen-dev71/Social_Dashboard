import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, CHECKED_USER, GET_USER } from './types';
import setAuthToken from '../../utils/setAuthToken';

export const registerUser = (userData, navigate) => async (dispatch) => {
  try {
    const newUser = await axios.post('http://localhost:5000/api/users/register', userData);
    if (newUser) navigate('/login');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const user = await axios.get(`http://localhost:5000/api/users/${id}`);
    dispatch({
      type: GET_USER,
      payload: user.data,
    });
    return Promise.resolve();
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    return Promise.reject();
  }
}

export const updateUser = (userData) => async (dispatch) => {
  try {
    const user = await axios.put(`http://localhost:5000/api/users/${userData.id}`, userData);
    // Get the token
    const { token } = user.data;
    // Save the token in localStorage
    localStorage.setItem('jwtToken', token);
    // Set token to Authentication header
    setAuthToken(token);
    // Get the user by the token
    const userDecoded = jwt_decode(token);
    // Get the user by the token
    dispatch(setCurrentUser(userDecoded));
    return Promise.resolve();
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    return Promise.reject();
  }
}

export const loginUser = (userData) => async (dispatch) => {
  try {
    const user = await axios.post('http://localhost:5000/api/users/login', userData);
    // Get the token
    const { token } = user.data;
    // Save the token in localStorage
    localStorage.setItem('jwtToken', token);
    // Set token to Authentication header
    setAuthToken(token);
    // Get the user by the token
    const userDecoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(userDecoded));
    return Promise.resolve();
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    return Promise.reject();
  }
};

export const checkPassword = (userData) => async (dispatch) => {
  try {
    const user = await axios.post('http://localhost:5000/api/users/checkpassword', userData);
    // Get the token
    const { result, pwd } = user.data;
    dispatch({
      type: CHECKED_USER,
      payload: { result, pwd }
    });
    return Promise.resolve();
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    return Promise.reject();
  }
};

export const setCurrentUser = (userDecoded) => ({
  type: SET_CURRENT_USER,
  payload: userDecoded,
});

export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header
  setAuthToken(false);
  // Set user to {}
  dispatch(setCurrentUser({}));
};
