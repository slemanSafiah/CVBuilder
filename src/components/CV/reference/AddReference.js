import React, { useState } from "react";
import { Button, Paper, Grid, TextField, Container } from "@material-ui/core";
import { AddReferenceAction } from "./../../../store/action/reference";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export default function Reference(props) {
  const [reference, setReference] = useState("");
  const [nameAr, setNameAr] = useState("");

  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();
  const lan = useSelector((state) => state.sections.twolan);
  const handelCancel = () => {
    setReference("");
    setPhone("");
    setNameAr("");
    history.push("/buildcv/reference");
  };
  const { t, i18n } = useTranslation();
  const cvID = useSelector((state) => state.cvID);

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
            <h2>{t("Reference")}</h2>
          </Grid>
          <Grid item xs={12}>
            {" "}
            <TextField

              label={t("AddReference")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              onChange={(e) => setReference(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={lan == 0 ? "arhide" : ""}>
            {" "}
            <TextField

              label={t("AddReference")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              onChange={(e) => setNameAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            {" "}
            <TextField

              label={t("Phone")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              onChange={(e) => setPhone(e.target.value)}
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
                if (reference === '' )
                  alert("please fill all fields")
                else {
                  dispatch(
                    AddReferenceAction({
                      reference,
                      phone,
                      nameAr,
                      cvID,
                      order: "1",
                    })
                  );
                  history.push("/buildcv/reference");
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
