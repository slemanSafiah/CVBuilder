import {
  ADDMEMBERSHIP,
  EDITMEMBERSHIP,
  DELETEMEMBERSHIP,
  COPYMEMBERSHIP,
  HIDEMEMBERSHIP,
  ORDERMEMBERSHIP,
  ERROR, SUCCESS
} from "./types";
import axios from "axios";
export function AddMembershipAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/membership/addMembership`,
      data: {
        Name: payload.membershipName,
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
          type: ADDMEMBERSHIP,
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
export function CopyMembershipAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/membership/copyMembership`,
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
          type: COPYMEMBERSHIP,
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
export function DeleteMembershipAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/membership/deleteMembership`,
      data: {
        membership_id: payload.membership_id,
        _id: payload.cvID,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.status != 0) {
        dispatch({
          type: DELETEMEMBERSHIP,
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
export function EditMembershipAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/membership/updateMembership`,
      data: {
        Name: payload.membershipName,
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
          type: EDITMEMBERSHIP,
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
export function HideMembershipAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/membership/hideMemberships`,
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
          type: HIDEMEMBERSHIP,
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
export function OrderMembershipAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/membership/orderMemberships`,
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
          type: ORDERMEMBERSHIP,
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
