import React, {useState} from "react";
import {Button, Paper, Grid, TextField, Container} from "@material-ui/core";
import {AddOtherTrainingAction} from "./../../../store/action/othertraining";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

export default function AddOtherTraining(props) {
  const [otherTraining, setOtherTraining] = useState("");

  const dispatch = useDispatch();
  let history = useHistory();
  const {t, i18n} = useTranslation();
  const cvID = useSelector((state) => state.cvID);
  const lan = useSelector((state) => state.sections.twolan);

  const handelCancel = () => {
    setOtherTraining("");
    history.push("/buildcv/othertraining");
  };

  return (
    <Paper
      className="buildcvbar"
      data-aos="fade-up-left"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1000"
    >
      <Container>
        <Grid
          container
          spacing={10}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <h2>{t("OtherTraining")}</h2>
          </Grid>
          <Grid item xs={12}>
            {" "}
            <TextField
            
              label={t("OtherTraining")}
              variant="filled"
              color="primary"
              style={{width: "100%"}}
              onChange={(e) => setOtherTraining(e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button
              variant="outlined"
              className="cancel"
              style={{marginLeft: "10px", float: "right"}}
              onClick={handelCancel}
            >
              {t("cancel")}
            </Button>
            <Button
              variant="contained"
              className="save"
              style={{float: "right"}}
              onClick={() => {
                if (otherTraining === '')
                alert("please fill all fields")
                else{
                dispatch(
                  AddOtherTrainingAction({
                    otherTraining,
                    cvID,
                    order: "1",
                  })
                );
                history.push("/buildcv/othertraining");
              }}}
            >
              {t("save")}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}
