import React, {useState} from "react";
import {Button, Paper, Grid, TextField, Container} from "@material-ui/core";
import {EditAchievementAction} from "../../../store/action/achievement";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useHistory, useLocation} from "react-router-dom";

export default function EditAchievement(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const {t, i18n} = useTranslation();

  const cvID = useSelector((state) => state.cvID);
  const lan = useSelector((state) => state.sections.twolan);

  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
  const id = query.get("achievementID");
  const achievements = useSelector((state) => state.template.achievements);
  const old = achievements.find((e) => e._id === id);
  const [achievementName, setAchievementName] = useState(old ? old.Name : "");
  const [nameAr, setNameAr] = useState(old ? old.NameAr : "");

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
            <h2>{"Edit Achievements"}</h2>
          </Grid>
          <Grid item xs={12}>
            {" "}
            <TextField
          
              label={t("Achievement Name")}
              variant="filled"
              color="primary"
              style={{width: "100%"}}
              value={achievementName}
              onChange={(e) => setAchievementName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={lan === 0 ? "arhide" : ""}>
            {" "}
            <TextField
          
              label={t("Achievement NameAR")}
              variant="filled"
              color="primary"
              style={{width: "100%"}}
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
            />
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
                  EditAchievementAction({
                    achievementName,
                    id,
                    nameAr,
                    order: "1",
                  })
                );
                history.push("/buildcv/achievement");
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
