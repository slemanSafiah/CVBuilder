import React, { useState } from "react";
import {
  Button,
  Box,
  Paper,
  Grid,
  TextField,
  Container,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { AddTechnicalSkillsAction } from "../../../store/action/technicalskill";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export default function AddTechnicalSkill(props) {
  const [skill, setSkill] = useState("");
  const [nameAr, setNameAr] = useState("");

  const [rate, setRate] = useState(2);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  let history = useHistory();
  const cvID = useSelector((state) => state.cvID);
  const lan = useSelector((state) => state.sections.twolan);

  const data = { rate, skill, cvID, nameAr, order: "1" };
  const handelCancel = () => {
    setSkill("");
    setRate(2);
    setNameAr("");
    history.push("/buildcv/technicalskill");
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
          <Grid item xs={12}>
            <h2>{t("AddTechnicalSkill")}</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField

              label={t("Skill")}
              variant="filled"
              placeholder="eg.Microsoft Word"
              style={{ width: "100%" }}
              onChange={(e) => setSkill(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating
                name="customized-10"
                defaultValue={2}
                max={5}
                onChange={(e) => setRate(e.target.value)}
              />
            </Box>
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
                if (rate === 0 || skill == '')
                  alert("please fill all fields")
                else {
                  dispatch(AddTechnicalSkillsAction(data));
                  history.push("/buildcv/technicalskills");
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
