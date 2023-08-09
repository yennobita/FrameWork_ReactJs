import userActionType from "./userActionType";

export const setUser = (user) => ({
  type: userActionType.SET_USER,
  payload: user,
});
export const clearUser = (user) => ({ type: userActionType.CLEAR_USER });
