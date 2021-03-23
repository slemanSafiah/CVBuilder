import React, { useState } from "react";
import {
  Button,
  Paper,
  Grid,
  Container,
  TextField,
} from "@material-ui/core";

import {
  EditCareerObjectiveAction,
} from "./../../../store/action/careerobjective";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export default function CareerObjectives() {
  const lan = useSelector((state) => state.sections.twolan);
  const [text, setText] = useState("");
  const [textAr, setTextAr] = useState("");
  const [hide, setHide] = useState(0);

  const dispatch = useDispatch();
  /*const careerobjective = useSelector(
    (state) => state.template.careerobjective 
  );*/
  const careerObjectives_id = useSelector(
    (state) => state.template.careerObjectives_id
  );
  const { t } = useTranslation();
  let history = useHistory();

  return (
    <Paper
      elevation={3}
      className="buildcvbar background mt-3"
      style={{ width: "100%" }}
      data-aos="fade-up-left"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1000"
    >
      <Container>
        <Grid container alignItems="center" direction="column" spacing={5}>
          <Grid item style={{ width: "100%" }} xs={12}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              style={{ textAlign: "center" }}
            >
              <Grid item sm={6} xs={12}>
                <h2>{t("CareerObjectives")}</h2>
              </Grid>
              <Grid item sm={6} xs={12}>
              </Grid>
            </Grid>{" "}
          </Grid>
          <Grid item xs={12}>
            <h5>{text}</h5>
          </Grid>
          <Grid item xs={12} style={{ width: "100%" }}>
            {" "}
            <TextField

              label={t("Enter CareerObjective")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              onChange={(e) => setText(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ width: "100%" }}
            className={lan === 0 ? "arhide" : ""}
          >
            <TextField

              label={t("Enter CareerObjective in Arabic")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              onChange={(e) => setTextAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" direction="row" spacing={3}>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  className="save"
                  style={{ float: "right" }}
                  onClick={() => {
                    dispatch(
                      EditCareerObjectiveAction({
                        text,
                        textAr,
                        careerObjectives_id,
                      })
                    )
                    history.push("/buildcv/education");
                  }}
                >
                  {t("next")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>{" "}
    </Paper>
  );
}
