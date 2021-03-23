import {
  ADDCV,
  DELETECV,
  ERROR,
  CVNAME,
  CVLANGIAGE,
  CVTEMPLATE,
  EDITCV,
  CVCOLOR, SUCCESS, FETCHCVID
} from "./types";
import axios from "axios";

export function AddCVAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/CV/addCV`,
      data: {
        Email: payload.email,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0) {
        dispatch({
          type: ADDCV,
          payload: res.data.data,
        });
        localStorage.setItem("careerObjectives_id", res.data.data.careerObjectives_id);
        localStorage.setItem("cv_id", res.data.data.cv_id);
        localStorage.setItem("personalInformation_id", res.data.data.personalInformation_id)
      }
      else
        dispatch({
          type: ERROR,
        });
    });
  };
}
export function DeleteCVAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/CV/deleteCV`,
      data: {
        Email: payload.email,
        id: payload.cvID,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0)
        dispatch({
          type: DELETECV,
          payload,
        });
      else
        dispatch({
          type: ERROR,
        });
    });
  };
}
export function EditCVAction(payload) {
  return (dispatch) => {
    dispatch({
      type: EDITCV,
      payload,
    });
  };
}
export function fetchCVId() {
  return (dispatch) => {
    dispatch({
      type: FETCHCVID,
    });
  };
}
export function CVLanguage1(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/CV/updateLanguage`,
      data: {
        Language: payload.Language,
        _id: payload.cvID,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0) {
        dispatch({
          type: CVLANGIAGE,
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
export function CVName1(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/cv/updateName`,
      data: {
        Name: payload.name,
        _id: payload.cvID,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0) {
        dispatch({
          type: CVNAME,
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

export function CVTemplate1(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/cv/updateTemplate`,
      data: {
        Template: payload.template,
        _id: payload.cvID,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      console.log(res.data)
      if (res.status == 200 && res.data.status != 0) {
        localStorage.setItem("cvTemplate",payload.template)
        dispatch({
          type: CVTEMPLATE,
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

export function cvColor(payload) {
  return (dispatch) => {
    dispatch({
      type: CVCOLOR,
      payload,
    });
    dispatch({
      type: SUCCESS,
    });
  };
}
