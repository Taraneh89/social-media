import { FETCH_POSTS, FETCH_SINGLE_POST } from "./type";
import Router from "next/router";

//api/post
export const PostAction = (data, resetForm) => async (
  dispatch,
  getState,
  { Api }
) => {
  const api = new Api({ dispatch, getState });
  const { title, description } = data;

  try {
    await api.Post("api/posts", {
      title,
      text: description,
    });
    alert("پست با موفقیت ارسال شد");
    resetForm();
  } catch (err) {
    // handle err
  }
};

export const postsListAction = () => async (dispatch, getState, { Api }) => {
  const api = new Api({ dispatch, getState });
  dispatch({
    type: FETCH_POSTS,
    payload: [],
    loading: true,
  });
  try {
    const response = await api.Get("api/posts");
    dispatch({
      type: FETCH_POSTS,
      payload: response.data,
      loading: false,
    });
  } catch (err) {
    dispatch({
      type: FETCH_POSTS,
      payload: [],
      loading: false,
    });
    // handle err
  }
};

export const postsListDelete = (id, handleClose) => async (
  dispatch,
  getState,
  { Api }
) => {
  const api = new Api({ dispatch, getState });
  try {
    await api.Delete(`api/posts/${id}`);
    dispatch(postsListAction());
  } catch (err) {
    // handle err
  }

  handleClose();
};

export const EditAction = ({ id, data, callback }) => async (
  dispatch,
  getState,
  { Api }
) => {
  const api = new Api({ dispatch, getState });
  const { title, description } = data;
  try {
    await api.Put(`api/posts/${id}`, {
      title: title,
      text: description,
    });
    // alert("پست با موفقیت ویرایش شد");
    Router.push("/post-list");
  } catch (err) {
    // handle err
  } finally {
    if (callback) callback();
  }
};

export const postShow = (id) => async (dispatch, getState, { Api }) => {
  const api = new Api({ dispatch, getState });
  dispatch({
    type: FETCH_SINGLE_POST,
    payload: {},
    loading: true,
  });
  try {
    const response = await api.Get(`api/posts/${id}`);
    dispatch({
      type: FETCH_SINGLE_POST,
      payload: response.data,
      loading: false,
    });
  } catch (err) {
    dispatch({
      type: FETCH_SINGLE_POST,
      payload: {},
      loading: false,
    });
    // handle err
  }
};

export const likeAction = (id) => async (dispatch, getState, { Api }) => {
  const api = new Api({ dispatch, getState });

  try {
    const response = await api.Post(`api/posts/like/${id}`);
    dispatch({
      type: FETCH_SINGLE_POST,
      payload: response.data,
      loading: false,
    });
  } catch (err) {
    // handle err
  }
};

export const unLikeAction = (id, data) => async (
  dispatch,
  getState,
  { Api }
) => {
  const api = new Api({ dispatch, getState });

  try {
    const response = await api.Post(`api/posts/unlike/${id}`);
    dispatch({
      type: FETCH_SINGLE_POST,
      payload: response.data,
      loading: false,
    });
  } catch (err) {
    // handle err
  }
};
export const commentAction = (id, data) => async (
  dispatch,
  getState,
  { Api }
) => {
  const api = new Api({ dispatch, getState });
  const comment = data;

  try {
    const response =await api.Post(`api/posts/comment/${id}`, {
      text: comment,
    });
    dispatch({
      type: FETCH_SINGLE_POST,
      payload: response.data,
      loading: false,
    });
  } catch (err) {
    // handle err
  }
};
