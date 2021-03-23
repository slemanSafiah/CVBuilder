import React, { useState } from "react";
import { Button, Paper, Grid, TextField, Container } from "@material-ui/core";
import { AddCertificateAction } from "./../../../store/action/certificate";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
export default function AddCertificate(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [date, setDate] = useState(new Date());
  const cvID = useSelector((state) => state.cvID);
  const lan = useSelector((state) => state.sections.twolan);

  const data = {
    name,
    description,
    nameAr,
    descriptionAr,
    date,
    cvID,
    order: "1",
  };
  const { t } = useTranslation();
  let history = useHistory();

  const handelCancel = () => {
    setName("");
    setDate(0);
    setDescription("");
    setName("");
    setNameAr("");
    setDescription("");
    setDescriptionAr("");
    history.push("/buildcv/certificates");
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
          justify="center"
          alignItems="center"
          direction="column"
          spacing={4}
        >
          <Grid item xs={12} sm={12}>
            <h2>{t("AddCertificate")}</h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}
            <TextField

              label={t("Certificate Name")}
              variant="filled"
              style={{ width: "100%" }}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}
            <TextField

              label={t("Description")}
              variant="filled"
              style={{ width: "100%" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={lan === 0 ? "arhide" : ""}>
            {" "}
            <TextField

              label={t("Certificate NameAr")}
              variant="filled"
              style={{ width: "100%" }}
              onChange={(e) => setNameAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={lan === 0 ? "arhide" : ""}>
            {" "}
            <TextField

              label={t("DescriptionAr")}
              variant="filled"
              style={{ width: "100%" }}
              onChange={(e) => setDescriptionAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}

            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                views={["year"]}
                label="Date"
                value={date}
                onChange={(e) => setDate(new Date(e))}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
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
                if (description === '' || name === '')
                  alert("please fill all fields")
                else {
                  dispatch(AddCertificateAction(data));
                  history.push("/buildcv/certificates");
                }
              }}
            >
              {t("save")}
            </Button>
          </Grid>
        </Grid>{" "}
      </Container>
    </Paper>
  );
}
