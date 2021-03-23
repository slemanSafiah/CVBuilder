import React, { useState, useEffect } from "react";
import { Button, Paper, Grid, Container, TextField } from "@material-ui/core";

import { AddExperienceAction } from "./../../../store/action/experience";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

export default function Experience(props) {
  const [experienceName, setExperienceName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [project, setProject] = useState("");
  const [experienceNameAr, setExperienceNameAr] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const cvID = useSelector((state) => state.cvID);
  const lan = useSelector((state) => state.sections.twolan);

  const data = {
    description,
    experienceName,
    startDate,
    endDate,
    project,
    cvID,
    descriptionAr,
    experienceNameAr,
  };
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let history = useHistory();

  const handelCancel = () => {
    setExperienceName("");
    setStartDate(0);
    setDescription("");
    setEndDate(0);
    setProject("");
    setExperienceNameAr("");
    setDescriptionAr("");
    history.push("/buildcv/experience");
  };
  return (
    <Paper
      elevation={3}
      className="buildcvbar"
      data-aos="fade-up-left"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1000"
    >
      <Container>
        <Grid
          container
          alignItems="center"
          justify="center"
          spacing={8}
          style={{ textAlign: "center" }}
        >
          <Grid item xs={12}>
            <h3>{t("Experience")}</h3> <hr />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t("ExperienceName")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              onChange={(e) => setExperienceName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t("DescriptionExperince")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} className={lan === 0 ? "arhide" : ""}>
            <TextField
              label={t("ExperienceNameAr")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              onChange={(e) => setExperienceNameAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} className={lan === 0 ? "arhide" : ""}>
            <TextField
              label={t("DescriptionExperienceAr")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              onChange={(e) => setDescriptionAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                views={["year"]}
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(new Date(e))}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            {" "}
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                views={["year"]}
                label="End Date"
                value={endDate}
                onChange={(e) => setEndDate(new Date(e))}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t("Project")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              onChange={(e) => setProject(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              className="cancel"
              style={{ marginLeft: "10px", float: "right" }}
              onClick={handelCancel}
            >
              {t("cancel")}
            </Button>
            <Button
              variant="contained"
              className="save"
              style={{ float: "right" }}
              onClick={() => {
                if (description === '' || experienceName === '')
                  alert("please fill all fields")
                else {
                  dispatch(AddExperienceAction(data));
                  history.push("/buildcv/experience");
                }
              }}
            >
              {t("save")}
            </Button>
          </Grid>
        </Grid>{" "}
      </Container>{" "}
    </Paper>
  );
}
