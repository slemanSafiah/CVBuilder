import React, {useState} from "react";
import {Grid, Paper, Container} from "@material-ui/core";
import us from "./../../img/us.svg";
import ar from "./../../img/sa.svg";
import {useSelector, useDispatch} from "react-redux";
import {CVLanguage1} from "./../../store/action/cv";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

export default function CVLanguage() {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const history = useHistory();
  const cvID = useSelector((state) => state.cvID);

  return (
    <div className="backgroundimg" style={{minHeight: "100vh"}}>
      <Container>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          spacing={4}
          style={{paddingTop: "50px"}}
          data-aos="fade-up-left"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
        >
          <Grid item>
            <h2 className="fontlan">{t("Resume language")}</h2>
          </Grid>
          <Grid item style={{width: "600px"}} >
            <Grid container alignItems="Center" spacing={8}>
              <Grid item xs={6}>
                <Paper
                  elevation={3}
                  onClick={() => {
                    dispatch(CVLanguage1({Language: "En", cvID}));
                    history.push("/cvtemplates");
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    style={{padding: "20px"}}
                  >
                    <Grid item>
                      <h4>English</h4>
                    </Grid>
                    <Grid item>
                      {" "}
                      <img src={us} style={{width: "50px"}} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper
                  elevation={3}
                  onClick={() => {
                    dispatch(CVLanguage1({Language: "Ar", cvID}));
                    history.push("/cvtemplates");
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    style={{padding: "20px"}}
                  >
                    <Grid item>
                      <h4>العربية</h4>
                    </Grid>
                    <Grid item>
                      {" "}
                      <img src={ar} style={{width: "50px"}} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
