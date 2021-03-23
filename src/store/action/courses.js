import {
  ADDCOURSES,
  EDITCOURSES,
  DELETECOURSES,
  COPYCOURSES,
  HIDECOURSES,
  ORDERCOURSES, SUCCESS,
  ERROR,
} from "./types";
import axios from "axios";
export function AddCoursesAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/course/addCourse`,
      data: {
        Name: payload.courses,
        Order: payload.order,
        Description: payload.description,
        Year: payload.year.getFullYear(),
        _id: payload.cvID,
        DescriptionAr: payload.descriptionAr,
        NameAr: payload.coursesAr,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0) {
        dispatch({
          type: ADDCOURSES,
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
export function CopyCoursesAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/course/copyCourse`,
      data: {
        _id: payload.id,
        cvID: payload.cvID,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0) {
        {
          dispatch({
            type: COPYCOURSES,
            payload: res.data.data,
          });
          dispatch({
            type: SUCCESS,
          });
        }
      } else
        dispatch({
          type: ERROR,
        });
    });
  };
}
export function DeleteCoursesAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/course/deleteCourse`,
      data: {
        course_id: payload.courses_id,
        _id: payload.cvID,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0) {
        dispatch({
          type: DELETECOURSES,
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
export function EditCoursesAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/course/updateCourse`,
      data: {
        Name: payload.coursesName,
        Order: payload.order,
        Description: payload.description,
        Year: payload.year.getFullYear(),
        _id: payload.id,
        NameAr: payload.coursesNameAr,
        DescriptionAr: payload.descriptionAr,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0) {
        dispatch({
          type: EDITCOURSES,
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
export function HideCoursesAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/course/hideCourses`,
      data: {
        _id: payload.cvID,
        hide: payload.hide,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0) {
        dispatch({
          type: HIDECOURSES,
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
export function OrderCoursesAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/course/orderCourses`,
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
      if (res.status == 200 && res.data.status != 0) {
        dispatch({
          type: ORDERCOURSES,
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
