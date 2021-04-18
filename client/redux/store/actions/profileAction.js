export const fetchProfile = () => async (dispatch, getState, { Api }) => {
  const api = new Api({ dispatch, getState });

  try {
    const response = await api.Get("api/profile");
  } catch (err) {
    // handle err
  }
};

export const fillProfile = (data) => async (dispatch, getState, { Api }) => {
  const api = new Api({ dispatch, getState });
  const {
    handle,
    status,
    website,
    countary,
    instagram,
    github,
    linkedin,
    twitter,
  } = data;
  try {
    await api.Post("api/profile", { ...data, skills: "test1,test2" });
  } catch (err) {
    // handel err
  }
};
