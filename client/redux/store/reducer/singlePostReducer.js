import { FETCH_SINGLE_POST } from "../actions/type";

const initialPosts = {
  loading: false,
  item: {},
};

const singlePostReducer = (state = initialPosts, action) => {
  switch (action.type) {
    case FETCH_SINGLE_POST:
      return { ...state, item: action.payload, loading: action.loading };

    default:
      return state;
  }
};

export default singlePostReducer;
