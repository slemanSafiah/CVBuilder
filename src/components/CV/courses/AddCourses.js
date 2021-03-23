import React, { useState } from "react";
import { Button, Paper, Grid, TextField, Container } from "@material-ui/core";
import { AddCoursesAction } from "../../../store/action/courses";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
export default function AddCourses(props) {
  const dispatch = useDispatch();
  const cvID = useSelector((state) => state.cvID);
  const [courses, setCourses] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [coursesAr, setCoursesAr] = useState("");
  const [year, setYear] = useState(new Date());

  let history = useHistory();
  const { t, i18n } = useTranslation();
  const lan = useSelector((state) => state.sections.twolan);

  const handelCancel = () => {
    setCourses("");
    setYear(0);
    history.push("/buildcv/courses");
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
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <h2>{t("AddCourse")}</h2>
          </Grid>
          <Grid item xs={12}>
            {" "}
            <TextField
              label={t("CourseName")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              required
              onChange={(e) => setCourses(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            {" "}
            <TextField
              label={t("Description")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={lan === 0 ? "arhide" : ""}>
            {" "}
            <TextField
              label={t("CoursesNameAr")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              required
              onChange={(e) => setCoursesAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={lan == 0 ? "arhide" : ""}>
            {" "}
            <TextField

              label={t("DescriptionAr")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              required
              onChange={(e) => setDescriptionAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            {" "}

            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                views={["year"]}
                label="Year"
                value={year}
                onChange={(e) => setYear(new Date(e))}
              />
            </MuiPickersUtilsProvider>
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
                if (courses === '' || description === '')
                  alert("please fill all fields")
                else {
                  dispatch(
                    AddCoursesAction({
                      courses,
                      cvID,
                      order: "1",
                      year,
                      description,
                      coursesAr,
                      descriptionAr,
                    })
                  );
                  history.push("/buildcv/courses");
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
