import workDateActionType from "./workDateActionType";

const initialState = {
  workDate: "",
  workDateData: null,
  refreshWorkDateDataId: Math.random(),
};

const workDateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case workDateActionType.SET_WORK_DATE:
      return { ...state, workDate: payload };
    case workDateActionType.SET_WORK_DATE_DATA:
      return { ...state, workDateData: payload };
    case workDateActionType.REFRESH_WORK_DATE_DATE_ID:
      return { ...state, refreshWorkDateDataId: payload };

    default:
      return state;
  }
};
export default workDateReducer;
