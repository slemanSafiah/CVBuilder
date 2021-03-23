import { EDITCAREEROBJECTIVE, HIDECAREEROBJECTIVE, ERROR, SUCCESS } from "./types";
import axios from "axios";

export function EditCareerObjectiveAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/career/updateCareer`,
      data: {
        Text: payload.text,
        TextAr: payload.textAr,
        _id: payload.careerObjectives_id,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0) {
        dispatch({
          type: EDITCAREEROBJECTIVE,
          payload,
        });
        dispatch({
          type: SUCCESS,
        });
      }
      else
        dispatch({
          type: ERROR,
        });
    });
  };
}
export function HideCareerObjectiveAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/career/hideCareer`,
      data: {
        hide: payload.hide,
        _id: payload.cvID,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0)
        dispatch({
          type: HIDECAREEROBJECTIVE,
          payload: res.data.data,
        });
      else
        dispatch({
          type: ERROR,
        });
    });
  };
}
