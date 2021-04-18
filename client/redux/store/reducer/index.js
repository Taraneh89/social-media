import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import postsReducer from "./PostsReducer";
import singlePostReducer from "./singlePostReducer";
const combine = combineReducers({
	auth: authReducer,
	profile: profileReducer,
	posts: postsReducer,
	singlePost: singlePostReducer,
});

const rootReducer = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = { ...state, ...action.payload };
		return nextState;
	}
	return combine(state, action);
};

export default rootReducer;
