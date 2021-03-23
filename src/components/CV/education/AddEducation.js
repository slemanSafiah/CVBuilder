import React, { useState } from "react";
import { Button, Paper, Grid, TextField, Container } from "@material-ui/core";
import { AddEducationAction } from "./../../../store/action/education";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
export default function AddEducation(props) {
  const dispatch = useDispatch();

  const [faculty, setFaculty] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [grade, setGrade] = useState(1);
  const [degree, setDegree] = useState(1);
  const [facultyAr, setFacultyAr] = useState("");
  const [universityNameAr, setUniversityNameAr] = useState("");
  const [degreeFrom100, setDegreeFrom100] = useState(0);
  const { t, i18n } = useTranslation();
  let history = useHistory();
  const cvID = useSelector((state) => state.cvID);
  const lan = useSelector((state) => state.sections.twolan);

  const data = {
    faculty,
    universityName,
    startDate,
    endDate,
    grade,
    cvID,
    degree,
    universityNameAr,
    facultyAr,
    degreeFrom100
  };

  const handelCancel = () => {
    setFaculty("");
    setStartDate(0);
    setEndDate(0);
    setGrade("");
    setUniversityName("");
    setUniversityNameAr("");
    setFacultyAr("");
    setDegreeFrom100(0);
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
          spacing={4}
          alignItems="center"
          justify="center"
          style={{ textAlign: "center" }}
        >
          <Grid item xs={12} sm={12}>
            {" "}
            <h2>{t("AddEducation")}</h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}
            <TextField

              label={t("faculty")}
              variant="filled"
              placeholder="eg.Engineering"
              style={{ width: "100%" }}
              onChange={(e) => setFaculty(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}
            <TextField

              label={t("SchoolNameorUniversity")}
              variant="filled"
              style={{ width: "100%" }}
              onChange={(e) => setUniversityName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={lan === 0 ? "arhide" : ""}>
            {" "}
            <TextField

              label={t("facultyAr")}
              variant="filled"
              placeholder={t("eg.Engineering")}
              style={{ width: "100%" }}
              onChange={(e) => setFacultyAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={lan === 0 ? "arhide" : ""}>
            {" "}
            <TextField

              label={t("SchoolNameorUniversityAr")}
              variant="filled"
              style={{ width: "100%" }}
              onChange={(e) => setUniversityNameAr(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                views={["year"]}
                label="Start Date"
                value={startDate}
                variant="filled"
                style={{ width: "100%" }}
                onChange={(e) => setStartDate(new Date(e))}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                views={["year"]}
                label="End Date"
                value={endDate}
                variant="filled"
                style={{ width: "100%" }}
                onChange={(e) => setEndDate(new Date(e))}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label">
                {t("grade")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={grade}
                variant="filled"
                onChange={(e) => setGrade(e.target.value)}
              >
                <MenuItem value={1}>{t("good")}</MenuItem>
                <MenuItem value={2}>{t("very good")}</MenuItem>
                <MenuItem value={3}>{t("excellent")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label">
                {t("Degree")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={degree}
                variant="filled"
                onChange={(e) => setDegree(e.target.value)}
              >
                <MenuItem value={1}>{t("Bachelor")}</MenuItem>
                <MenuItem value={2}>{t("Master")}</MenuItem>
                <MenuItem value={3}>{t("PhD")}</MenuItem>
                <MenuItem value={4}>{t("High school")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}
            <TextField
              label={t("degreeFrom100")}
              variant="filled"
              placeholder={t("ex:75%")}
              style={{ width: "100%" }}
              type="number"
              onChange={(e) => setDegreeFrom100(e.target.value)}
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
                if (universityName === '' || faculty === '')
                  alert("please fill all fields")
                else {
                  dispatch(AddEducationAction(data));
                  history.push("/buildcv/education");
                }
              }}
            >
              {t("save")}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}
