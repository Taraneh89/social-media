import { FETCH_POSTS } from "../actions/type";

const initialPosts = {
  loading: false,
  list: [],
};

const postsReducer = (state = initialPosts, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, list: action.payload, loading: action.loading };

    default:
      return state;
  }
};

export default postsReducer;
