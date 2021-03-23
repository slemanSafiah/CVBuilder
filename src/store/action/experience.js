import {
  ADDEXPERIENCE,
  DELETEEXPERIENCE,
  EDITEXPERIENCE,
  COPYEXPERIENCE,
  HIDEEXPERIENCE,
  ORDEREXPERIENCE,
  ERROR, SUCCESS
} from "./types";
import axios from "axios";
export function AddExperienceAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/experience/addExperience`,
      data: {
        Start: payload.startDate.getFullYear(),
        End: payload.endDate.getFullYear(),
        Name: payload.experienceName,
        Project: payload.project,
        Description: payload.description,
        Order: 1,
        _id: payload.cvID,
        NameAr: payload.experienceNameAr,
        DescriptionAr: payload.descriptionAr,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status === 200 && res.data.status !== 0) {
        dispatch({
          type: ADDEXPERIENCE,
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
export function CopyExperienceAction(payload) {
  return async(dispatch) => {
      await axios({
        method: "post",
        url:`https://we4cv.com/api/experience/copyExperience`,
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
            type: COPYEXPERIENCE,
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
export function DeleteExperienceAction(payload) {
  return async(dispatch) => {
      await axios({
        method: "post",
        url:`https://we4cv.com/api/experience/deleteExperience`,
        data: {
          experience_id: payload.experience_id,
          _id: payload.cvID,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.status === 200 && res.data.status !== 0) {
          dispatch({
            type: DELETEEXPERIENCE,
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
export function EditExperienceAction(payload) {
  return async(dispatch) => {
      await axios({
        method: "post",
        url:`https://we4cv.com/api/experience/updateExperience`,
        data: {
          Start: payload.startDate.getFullYear(),
          End: payload.endDate.getFullYear(),
          Name: payload.experienceName,
          Project: payload.project,
          Description: payload.description,
          Order: 1,
          _id: payload.id,
          DescriptionAr: payload.descriptionAr,
          NameAr: payload.experienceNameAr,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.status === 200 && res.data.status !== 0) {
          dispatch({
            type: EDITEXPERIENCE,
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
export function HideExperienceAction(payload) {
  return async(dispatch) => {
      await axios({
        method: "post",
        url:`https://we4cv.com/api/experience/hideExperiences`,
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
            type: HIDEEXPERIENCE,
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
export function OrderExperienceAction(payload) {
  return async(dispatch) => {
      await axios({
        method: "post",
        url:`https://we4cv.com/api/experience/orderExperiences`,
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
            type: ORDEREXPERIENCE,
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
