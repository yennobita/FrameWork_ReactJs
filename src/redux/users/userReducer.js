import userActionType from "./userActionType";

const initialState = {
  user: null,
  loading: true,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userActionType.SET_USER:
      return { ...state, user: payload, loading: false };
    case userActionType.CLEAR_USER:
      return { ...state, user: null, loading: false };

    default:
      return state;
  }
};
export default userReducer;
