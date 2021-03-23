import React, {useState} from "react";
import {Grid, TextField, Button, Container} from "@material-ui/core";
import {ArrowForward} from "@material-ui/icons";
import {useSelector, useDispatch} from "react-redux";
import {CVName1} from "./../../store/action/cv";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

export default function CVName() {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [name, setName] = useState("");
  const history = useHistory();
  const cvID = useSelector((state) => state.cvID);

  return (
    <div className="backgroundimg scrollnon" style={{minHeight: "100vh"}}>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        spacing={4}
        data-aos="fade-up-left"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <Grid item>
          <h2 className="mt-4">{t("Resume Name")}</h2>
        </Grid>
        <Grid item xs={12}>
          <h5>{t("cvnametext")}</h5>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="row"
            spacing={2}
          >
            <Grid item xs={6}>
              {" "}
              <TextField
                id="standard-basic"
                label={t("Resume Name")}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<ArrowForward />}
                className="save"
                onClick={() => {
                  dispatch(CVName1({name, cvID}));
                  history.push("/cvlanguage");
                }}
              >
                {t("Lets Start")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
