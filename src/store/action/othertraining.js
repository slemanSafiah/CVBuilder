import {
  ADDOTHERTRAINING,
  DELETEOTHERTRAINING,
  EDITOTHERTRAINING,
  COPYOTHERTRAINING,
  HIDEOTHERTRAINING,
  ORDEROTHERTRAINING,
  ERROR, SUCCESS
} from "./types";
import axios from "axios";
export function AddOtherTrainingAction(payload) {
  return async(dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/othertraining/addOtherTraining`,
      data: {
        Name: payload.otherTraining,
        Order: payload.order,
        _id: payload.cvID,
        NameAr: payload.nameAr,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0) {
        dispatch({
          type: ADDOTHERTRAINING,
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
export function CopyOtherTrainingAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/otherTraining/copyOtherTraining`,
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
        dispatch({
          type: COPYOTHERTRAINING,
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
export function DeleteOtherTrainingAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/otherTraining/deleteOtherTraining`,
      data: {
        otherTraining_id: payload.otherTraining_id,
        _id: payload.cvID,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0) {
        dispatch({
          type: DELETEOTHERTRAINING,
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
export function EditOtherTrainingAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/otherTraining/updateOtherTraining`,
      data: {
        Name: payload.otherTraining,
        Order: payload.order,
        _id: payload.id,
        NameAr: payload.nameAr,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0) {
        dispatch({
          type: EDITOTHERTRAINING,
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
export function HideOtherTrainingAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/otherTraining/hideOtherTrainings`,
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
          type: HIDEOTHERTRAINING,
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
export function OrderOtherTrainingAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/OtherTraining/orderOtherTrainings`,
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
          type: ORDEROTHERTRAINING,
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
