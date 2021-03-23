import {
  ADDEDUCATION,
  EDITEDUCATION,
  DELETEEDUCATION,
  COPYEDUCATION,
  HIDEEDUCATION,
  ORDEREDUCATION,
  ERROR, SUCCESS
} from "./types";
import axios from "axios";
export function AddEducationAction(payload) {
  console.log(payload)
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/education/addEducation`,
      data: { 
        UniversityName: payload.universityName,
        Faculty: payload.faculty,
        YearStart: payload.startDate.getFullYear(),
        YearEnd: payload.endDate.getFullYear(),
        DegreeFrom100: payload.degreeFrom100,
        Order: 1,
        Grade: payload.grade,
        Degree: payload.degree,
        _id: payload.cvID,
        UniversityNameAr: payload.universityNameAr,
        FacultyAr: payload.facultyAr,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      console.log(res.data)
      if (res.status === 200 && res.data.status !== 0) {
        dispatch({
          type: ADDEDUCATION,
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
export function CopyEducationAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/education/copyEducation`,
      data: {
        _id: payload.id,
        cvID: payload.cvID,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status === 200 && res.data.status !== 0) {
        dispatch({
          type: COPYEDUCATION,
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
export function DeleteEducationAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/education/deleteEducation`,
      data: {
        education_id: payload.education_id,
        _id: payload.cvID,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status === 200 && res.data.status !== 0) {
        dispatch({
          type: DELETEEDUCATION,
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
export function EditEducationAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/education/updateEducation`,
      data: {
        UniversityName: payload.universityName,
        Faculty: payload.faculty,
        YearStart: payload.startDate.getFullYear(),
        YearEnd: payload.endDate.getFullYear(),
        DegreeFrom100: payload.degreeFrom100,
        Order: 1,
        Grade: payload.grade,
        _id: payload.id,
        UniversityNameAr: payload.universityNameAr,
        FacultyAr: payload.facultyAr,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status === 200 && res.data.status !== 0) {
        dispatch({
          type: EDITEDUCATION,
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
export function HideEducationAction(payload) {
  return async(dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/education/hideEducations`,
      data: {
        _id: payload.cvID,
        hide: payload.hide,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status === 200 && res.data.status !== 0) {
        dispatch({
          type: HIDEEDUCATION,
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
export function OrderEducationAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/education/orderEducations`,
      data: {
        _id: payload.cvID,
        oldID: payload.source.index,
        newID: payload.destination.index,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status === 200 && res.data.status !== 0) {
        dispatch({
          type: ORDEREDUCATION,
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
