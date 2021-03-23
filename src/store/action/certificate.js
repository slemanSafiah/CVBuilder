import {
  ADDCERTIFICATE,
  EDITCERTIFICATE,
  DELETECERTIFICATE,
  COPYCERTIFICATE,
  HIDECERTIFICATE,
  ORDERCERTIFICATE,
  ERROR, SUCCESS
} from "./types";
import axios from "axios";
export function AddCertificateAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/certificate/addCertificate`,
      data: {
        Name: payload.name,
        Year: payload.date.getFullYear(),
        Description: payload.description,
        Order: 1,
        _id: payload.cvID,
        NameAr: payload.nameAr,
        DescriptionAr: payload.descriptionAr,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status === 200 && res.data.status !== 0) {
        dispatch({
          type: ADDCERTIFICATE,
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
export function CopyCertificateAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/certificate/copyCertificate`,
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
          type: COPYCERTIFICATE,
          payload: res.data.data,
        });
        dispatch({
          type: SUCCESS,
        });
      }
      else
        dispatch({
          type: ERROR,
          payload,
        });
    });
  };
}
export function DeleteCertificateAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/certificate/deleteCertificate`,
      data: {
        certificate_id: payload.certificate_id,
        _id: payload.cvID,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status === 200 && res.data.status !== 0) {
        dispatch({
          type: DELETECERTIFICATE,
          payload: {
            certificate_id: payload.certificate_id,
            cvID: payload.cvID,
          },
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
export function EditCertificateAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/certificate/updateCertificate`,
      data: {
        Name: payload.name,
        Year: payload.date.getFullYear(),
        Description: payload.description,
        Order: 1,
        _id: payload.id,
        cvID: payload.cvID,
        NameAr: payload.nameAr,
        DescriptionAr: payload.descriptionAr,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status === 200 && res.data.status !== 0) {
        dispatch({
          type: EDITCERTIFICATE,
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

export function HideCertificateAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/certificate/hideCertificates`,
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
          type: HIDECERTIFICATE,
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
export function OrderCertificateAction(payload) {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: `https://we4cv.com/api/certificate/orderCertifcates`,
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
          type: ORDERCERTIFICATE,
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
