// actions/userActions.js
export const LOGIN_USER = "LOGIN_USER";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
});

export const updateUserProfile = (updatedProfile) => ({
  type: UPDATE_USER_PROFILE,
  payload: updatedProfile,
});
