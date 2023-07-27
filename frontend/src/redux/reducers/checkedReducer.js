import { CHECKED_USER } from "../actions/types";

const initialState = {
  checked: false,
  password: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECKED_USER:
      return {
        ...state,
        checked: action.payload.result,
        password: action.payload.pwd,
      };
    default:
      return state;
  }
};
