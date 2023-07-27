import { UPDATE_USER } from '../actions/types';

// const currentUser = await axios.get('http://localhost:5000/api/users/register');

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        user: action.payload
      };
    default:
      return state;
  }
};
