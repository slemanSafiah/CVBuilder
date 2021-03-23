import React, {useState} from "react";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import { ERROR} from "./../store/action/types";
 
export default function Toast() {
  //handel me
  const toast = useSelector((state) => state.toast);
  const toastMessageEN = useSelector((state) => state.toastMessageEN);
  const toastMessageAR = useSelector((state) => state.toastMessageAR);
  const dispatch = useDispatch();

  const toastType = useSelector((state) => state.toastType);
  const {t, i18n} = useTranslation();

  return (  
    <Snackbar
      open={toast}
      autoHideDuration={3000}
      onClose={() => dispatch({
        type: ERROR,
      })}
      anchorOrigin={{ 
        vertical: "top",
        horizontal: "right",
      }}
      TransitionComponent="SlideTransition"
    >
      <Alert onClose={() => dispatch({
            type: ERROR,
          })} severity={toastType}>
        {i18n.language === "en-US"? toastMessageEN : toastMessageAR}
      </Alert>
    </Snackbar>
  );
}
