import {
  CONTACTUS,
  CHANGELANGUAGE,
  GETALLCV,
  AUTH,
  ERROR,
  PERSONALINFO, SUCCESS, RESETPASSWORD, RESETPASSWORDLINK
} from "./types";
import axios from "axios";

export function ContactusAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/contactUs`,
      data: {
        Email: payload.email,
        Number: payload.number,
        Message: payload.message,
        Name: payload.name,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0)
        dispatch({
          type: CONTACTUS,
          payload: res.data,
        });
      else
        dispatch({
          type: ERROR,
        });
    });
  };
}
export function ChangeLanguge(payload) {
  return (dispatch) => {
    dispatch({
      type: CHANGELANGUAGE,
      payload,
    });
  };
}
export function GetAllCVAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/CV/getAllCV`,
      data: { Email: payload.email },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0)
        dispatch({
          type: GETALLCV,
          payload: res.data.data,
        });
      else
        dispatch({
          type: ERROR,
        });
    });
  };
}
export function Auth() {
  return async (dispatch) => {
    dispatch({
      type: AUTH,
    });
  };
}
export function PeraonalInfoAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/personalInformation/updatePersonalInformation`,
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,

      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0) {
        dispatch({
          type: PERSONALINFO,
          payload: res.data.data,
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
export function ResetPasswordLink(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/auth/resetPasswordLink`,
      data: { Email: payload.email },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0)
        dispatch({
          type: RESETPASSWORDLINK,
          payload,
        });
      else
        dispatch({
          type: ERROR,
        });
    });
  };
}
export function ResetPassword(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/auth/resetPassword`,
      data: { Email: payload.email, Password: payload.password, _id: payload._id },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0)
        dispatch({
          type: RESETPASSWORD,
          payload,
        });
      else
        dispatch({
          type: ERROR,
        });
    });
  };
}