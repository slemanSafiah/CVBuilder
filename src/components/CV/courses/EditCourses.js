import React, {useState} from "react";
import {Button, Paper, Grid, TextField, Container} from "@material-ui/core";
import {EditCoursesAction} from "../../../store/action/courses";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useHistory, useLocation} from "react-router-dom";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
export default function EditCourse(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const {t, i18n} = useTranslation();

  const cvID = useSelector((state) => state.cvID);
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
  const id = query.get("course_id");
  const courses = useSelector((state) => state.template.courses);
  const old = courses.find((e) => e._id === id);
  const [coursesName, setCoursesName] = useState(old ? old.Name : "");
  const [description, setDescription] = useState(old ? old.Description : "");
  const [coursesNameAr, setCoursesNameAr] = useState(old ? old.NameAr : "");
  const [descriptionAr, setDescriptionAr] = useState(
    old ? old.DescriptionAr : ""
  );
  const [year, setYear] = useState(old ? old.Year : 0);
  const lan = useSelector((state) => state.sections.twolan);

  const handelCancel = () => {
    setCoursesName("");
    setCoursesNameAr("");
    setDescriptionAr("");
    setDescription("");
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
            <h2>{"EditCourses"}</h2>
          </Grid>
          <Grid item xs={12}>
            {" "}
            <TextField
             
              label={t("CoursesName")}
              variant="filled"
              color="primary"
              style={{width: "100%"}}
              value={coursesName}
              onChange={(e) => setCoursesName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            {" "}
            <TextField
             
              label={t("Description")}
              variant="filled"
              color="primary"
              style={{width: "100%"}}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={lan === 0 ? "arhide" : ""}>
            {" "}
            <TextField
             
              label={t("CoursesNameAr")}
              variant="filled"
              color="primary"
              style={{width: "100%"}}
              value={coursesNameAr}
              onChange={(e) => setCoursesNameAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={lan === 0 ? "arhide" : ""}>
            {" "}
            <TextField
             
              label={t("DescriptionAr")}
              variant="filled"
              color="primary"
              style={{width: "100%"}}
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                views={["year"]}
                label="Year"
                value={year}
                onChange={(e) => setYear(e)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
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
                dispatch(
                  EditCoursesAction({
                    coursesName,
                    id,
                    order: "1",
                    year,
                    description,
                  })
                );
                history.push("/buildcv/courses");
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
