import React, { useState } from "react";
import { Button, Paper, Grid, TextField, Container } from "@material-ui/core";
import { AddAchievementAction } from "../../../store/action/achievement";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export default function AddAchievement(props) {
  const dispatch = useDispatch();
  const cvID = useSelector((state) => state.cvID);
  const [achievementName, setAchievementName] = useState("");
  const [nameAr, setNameAr] = useState("");
  const lan = useSelector((state) => state.sections.twolan);

  let history = useHistory();
  const { t, i18n } = useTranslation();

  const handelCancel = () => {
    setAchievementName("");
    setNameAr("");
    history.push("/buildcv/achievement");
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
            <h2>{t("Achievements")}</h2>
          </Grid>
          <Grid item xs={12}>
            {" "}
            <TextField

              label={t("Achievement Name")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              onChange={(e) => setAchievementName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={lan == 0 ? "arhide" : ""}>
            {" "}
            <TextField

              label={t("Achievement NameAR")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              onChange={(e) => setNameAr(e.target.value)}
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
                if (achievementName === '')
                  alert("please fill all fields")
                else {
                  dispatch(
                    AddAchievementAction({
                      achievementName,
                      nameAr,
                      cvID,
                      order: "1",
                    })
                  );
                  history.push("/buildcv/achievement");
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
