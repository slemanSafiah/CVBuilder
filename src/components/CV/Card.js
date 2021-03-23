import React from "react";
import {Link} from "react-router-dom";
import {Button, Paper, Grid, Container} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {CVTemplate1} from "./../../store/action/cv";
export default function Card({CardImage, template}) {
  const {t, i18n} = useTranslation();
  const history = useHistory();
  const cvID = useSelector((state) => state.cvID);
  const dispatch = useDispatch();
  const submit = (t) => {
    const sections = fun(t);

    dispatch(CVTemplate1({template: t, cvID, sections}));
    history.push("/buildcv/peronalinfo");
  };
  const fun = (t) => {
    if (t === "cv1")
      return {
        careerobjective: 1,
        certificates: 1,
        courses: 1,
        education: 1,
        experience: 1,
        language: 1,
        membership: 0,
        othertraining: 1,
        referenc: 0,
        technicalskill: 1,
        skills: 1,
        twolan: 0,
        achievement: 0,

        certificateslen: 2,
        courseslen: 6,
        educationlen: 2,
        experiencelen: 3,
        languagelen: 3,
        othertraininglen: 5,
        technicalskilllen: 2,
        color: 0,
      };
    else if (t === "cv2")
      return {
        careerobjective: 1,
        certificates: 0,
        courses: 1,
        education: 1,
        experience: 1,
        language: 1,
        membership: 1,
        othertraining: 0,
        referenc: 1,
        technicalskill: 0,
        skills: 1,
        twolan: 0,
        achievement: 0,

        courseslen: 10,
        educationlen: 3,
        experiencelen: 3,
        languagelen: 2,
        membershiplen: 3,
        referenclen: 1,
        color: 0,
      };
    else if (t === "cv3")
      return {
        careerobjective: 1,
        certificates: 0,
        courses: 1,
        education: 1,
        experience: 1,
        language: 1,
        membership: 0,
        othertraining: 0,
        referenc: 0,
        technicalskill: 0,
        skills: 1,
        twolan: 0,
        achievement: 0,

        courseslen: 6,
        educationlen: 1,
        experiencelen: 2,
        languagelen: 3,
        color: 0,
      };
    else if (t === "cv4")
      return {
        careerobjective: 1,
        certificates: 0,
        courses: 1,
        education: 1,
        experience: 1,
        language: 1,
        membership: 0,
        othertraining: 0,
        referenc: 0,
        technicalskill: 1,
        skills: 1,
        twolan: 0,

        courseslen: 8,
        educationlen: 1,
        experiencelen: 1,
        languagelen: 2,

        technicalskilllen: 4,
        color: 1,
      };
    else if (t === "cv5")
      return {
        careerobjective: 1,
        certificates: 0,
        courses: 1,
        education: 1,
        experience: 1,
        language: 0,
        membership: 0,
        othertraining: 0,
        referenc: 0,
        technicalskill: 0,
        skills: 1,
        twolan: 0,
        achievement: 0,

        courseslen: 7,
        educationlen: 1,
        experiencelen: 2,
        color: 0,
      };
    else if (t === "cv6")
      return {
        careerobjective: 1,
        certificates: 0,
        courses: 1,
        education: 1,
        experience: 1,
        language: 1,
        membership: 0,
        othertraining: 0,
        referenc: 0,
        technicalskill: 0,
        skills: 1,
        twolan: 0,
        achievement: 0,

        courseslen: 10,
        educationlen: 2,
        experiencelen: 5,
        languagelen: 2,
        color: 0,
      };
    else if (t === "cv7")
      return {
        careerobjective: 1,
        certificates: 0,
        courses: 1,
        education: 1,
        experience: 1,
        language: 1,
        membership: 1,
        othertraining: 0,
        referenc: 0,
        technicalskill: 0,
        skills: 1,
        twolan: 0,
        achievement: 0,

        courseslen: 6,
        educationlen: 3,
        experiencelen: 3,
        languagelen: 2,
        membershiplen: 5,
        color: 0,
      };
    else if (t === "cv8")
      return {
        careerobjective: 0,
        certificates: 0,
        courses: 1,
        education: 1,
        experience: 1,
        language: 1,
        membership: 0,
        othertraining: 0,
        referenc: 0,
        technicalskill: 0,
        skills: 1,
        twolan: 1,
        achievement: 0,

        courseslen: 5,
        educationlen: 1,
        experiencelen: 2,
        languagelen: 1,
        color: 1,
      };
    else if (t === "cv9")
      return {
        careerobjective: 1,
        certificates: 1,
        courses: 1,
        education: 1,
        experience: 1,
        language: 1,
        membership: 0,
        othertraining: 0,
        referenc: 0,
        technicalskill: 0,
        skills: 1,
        twolan: 1,
        achievement: 1,

        certificateslen: 1,
        courseslen: 9,
        educationlen: 1,
        experiencelen: 1,
        languagelen: 2,
        achievementlen: 1,
        color: 0,
      };
    else if (t === "cv10")
      return {
        careerobjective: 1,
        certificates: 1,
        courses: 1,
        education: 1,
        experience: 1,
        language: 1,
        membership: 0,
        othertraining: 0,
        referenc: 0,
        technicalskill: 0,
        skills: 1,
        twolan: 1,
        achievement: 0,

        certificateslen: 1,
        courseslen: 1,
        educationlen: 1,
        experiencelen: 2,
        languagelen: 2,
        color: 0,
      };
    else if (t === "cv11")
      return {
        careerobjective: 0,
        certificates: 0,
        courses: 1,
        education: 1,
        experience: 1,
        language: 1,
        membership: 0,
        othertraining: 0,
        referenc: 0,
        technicalskill: 0,
        skills: 1,
        twolan: 1,
        achievement: 0,

        courseslen: 6,
        educationlen: 1,
        experiencelen: 1,
        languagelen: 2,
        color: 0,
      };
  };
  return (
    <Paper elevation={3}>
      <Container>
        <Grid
          container
          justify="center"
          direction="column"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <img
              src={CardImage}
              style={{width: "300px", height: "400px", marginTop: "20px"}}
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              style={{marginBottom: "20px"}}
              className="save"
              onClick={() => submit(template)}
            >
              {t("Select")}
            </Button>
          </Grid>
        </Grid>
      </Container>{" "}
    </Paper>
  );
}
