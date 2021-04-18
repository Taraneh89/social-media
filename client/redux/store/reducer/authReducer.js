import { SIGN_IN } from '../actions/type';

const Initial_State = {
  token: null,
};

const authReducer = (state = Initial_State, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, token: action.payload.token };
    default:
      return state;
  }

};

export default authReducer;
