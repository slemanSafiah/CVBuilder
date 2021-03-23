import React, { useState } from "react";
import { Button, Paper, Grid, TextField, Container } from "@material-ui/core";
import { AddMembershipAction } from "./../../../store/action/membership";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export default function AddMembership(props) {
  const dispatch = useDispatch();
  const cvID = useSelector((state) => state.cvID);
  const [membershipName, setMembershipName] = useState("");
  const [nameAr, setNameAr] = useState("");

  let history = useHistory();
  const { t, i18n } = useTranslation();
  const lan = useSelector((state) => state.sections.twolan);

  const handelCancel = () => {
    setMembershipName("");
    setNameAr("");
    history.push("/buildcv/membership");
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
            <h2>{t("Memberships")}</h2>
          </Grid>
          <Grid item xs={12}>
            {" "}
            <TextField

              label={t("AddMembership")}
              variant="filled"
              color="primary"
              style={{ width: "100%" }}
              onChange={(e) => setMembershipName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={lan === 0 ? "arhide" : ""}>
            {" "}
            <TextField

              label={t("MembershipAr")}
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
                if (membershipName === '')
                  alert("please fill all fields")
                else {
                  dispatch(
                    AddMembershipAction({
                      membershipName,
                      nameAr,
                      cvID,
                      order: "1",
                    })
                  );
                  history.push("/buildcv/membership");
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
