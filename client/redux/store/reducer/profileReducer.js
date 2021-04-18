import { FETCH_CURRENT } from "../actions/type";
import { FETCH_PROFILE } from "../actions/type";

const Initial_State = {
  baseInformation: {
    avatar: "",
    email: "",
    id: "",
    name: "",
  },
  profileInfo: {
    // initialize all profile properties
    handel: "",
    website: "",
    country: "",
    instagram: "",
    github: "",
    linkedin: "",
    twitter: "",
    skills: "",
    status: "",
  },

  postInfo: {
    title: "",
    description: "",
  },
};

const profileReducer = (state = Initial_State, action) => {
  switch (action.type) {
    case FETCH_CURRENT:
      return {
        ...state,
        baseInformation: {
          ...state.baseInformation,
          avatar: "http:" + action.payload.avatar,
          name: action.payload.name,
          email: action.payload.email,
          id: action.payload.id,
        },
      };
  }
  switch (action.type) {
    case FETCH_PROFILE:
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          id: action.payload.id,
        },
      };

    default:
      return state;
  }
};

export default profileReducer;
