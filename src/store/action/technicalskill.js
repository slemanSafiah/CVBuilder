import {
  ADDTECHNICALSKILL,
  EDITTECHNICALSKILL,
  DELETETECHNICALSKILL,
  COPYTECHNICALSKILL,
  HIDETECHNICALSKILL,
  ORDERTECHNICALSKILL,
  ERROR,SUCCESS
} from "./types";
import axios from "axios";
export function AddTechnicalSkillsAction(payload) {
  return async(dispatch) => {
      await axios({
        method: "post",
        url: `https://we4cv.com/api/technicalSkills/addTechnicalSkills`,
        data: {
          Name: payload.skill,
        Order: payload.order,
        _id: payload.cvID,
        RateFrom5: payload.rate,
        NameAr: payload.nameAr,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.status == 200 && res.data.status != 0)
          {dispatch({
            type: ADDTECHNICALSKILL,
            payload: res.data.data,
          });
          dispatch({
            type: SUCCESS,
          });}
        else
          dispatch({
            type: ERROR,
          });
      });
  };
}
export function CopyTechnicalSkillsAction(payload) {
  return async(dispatch) => {
      await axios({
        method: "post",
        url: `https://we4cv.com/api/technicalSkills/copyTechnicalSkill`,
        data: {
          _id: payload.id,
        cvID: payload.cvID,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.status == 200 && res.data.status != 0)
          {dispatch({
            type: COPYTECHNICALSKILL,
            payload: res.data.data,
          });
          dispatch({
            type: SUCCESS,
          });}
        else
          dispatch({
            type: ERROR,
          });
      });
  };
}
export function DeleteTechnicalSkillAction(payload) {
  return async(dispatch) => {
      await axios({
        method: "post",
        url: `https://we4cv.com/api/technicalSkills/deleteTechnicalSkills`,
        data: {
          technicalSkill_id: payload.technicalSkill_id,
          Order: 1,
          _id: payload.cvID,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.status == 200 && res.data.status != 0)
          {dispatch({
            type: DELETETECHNICALSKILL,
            payload,
          });
          dispatch({
            type: SUCCESS,
          });}
        else
          dispatch({
            type: ERROR,
          });
      });
  };
}
export function EditTechnicalSkillAction(payload) {
  return async (dispatch) => {
      await axios({
        method: "post",
        url: `https://we4cv.com/api/technicalSkills/updateTechnicalSkills`,
        data: {
          Name: payload.skill,
          Order: payload.order,
          _id: payload.id,
          RateFrom5: payload.rate,
          cvID: payload.cvID,
          NameAr: payload.nameAr,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.status == 200 && res.data.status != 0)
          {dispatch({
            type: EDITTECHNICALSKILL,
            payload: res.data.data,
          });
          dispatch({
            type: SUCCESS,
          });}
        else
          dispatch({
            type: ERROR,
          });
      });
  };
}
export function HideTechnicalSkillAction(payload) {
  return async(dispatch) => {
      await axios({
        method: "post",
        url: `https://we4cv.com/api/technicalSkills/hideTechnicalSkills`,
        data: {
          _id: payload.cvID,
          hide: payload.hide,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.status == 200 && res.data.status != 0)
         { dispatch({
            type: HIDETECHNICALSKILL,
            payload: res.data.data,
          });
          dispatch({
            type: SUCCESS,
          });}
        else
          dispatch({
            type: ERROR,
          });
      });
  };
}
export function OrderTechnicalSkillAction(payload) {
  return async(dispatch) => {
      await axios({
        method: "post",
        url: `https://we4cv.com/api/technicalSkills/orderTechnicalSkills`,
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
        if (res.status == 200 && res.data.status != 0)
          {dispatch({
            type: ORDERTECHNICALSKILL,
            payload,
          });
          dispatch({
            type: SUCCESS,
          });}
        else
          dispatch({
            type: ERROR,
          });
      });
  };
}
