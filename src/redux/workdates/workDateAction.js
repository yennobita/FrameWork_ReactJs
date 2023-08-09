import workDateActionType from "./workDateActionType";

export const setWorkDate = (workDate) => ({
  type: workDateActionType.SET_WORK_DATE,
  payload: workDate,
});
export const setWorkDateData = (workDateData) => ({
  type: workDateActionType.SET_WORK_DATE_DATA,
  payload: workDateData,
});
export const refreshworkDateDataId = (id) => ({
  type: workDateActionType.REFRESH_WORK_DATE_DATE_ID,
  payload: id,
});
