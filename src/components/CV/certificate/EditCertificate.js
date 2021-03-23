import React, { useState } from "react";
import { Button, Paper, Grid, TextField, Container } from "@material-ui/core";
import { EditCertificateAction } from "./../../../store/action/certificate";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
export default function EditCertificate(props) {
  const dispatch = useDispatch();
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
  const id = query.get("certificateID");
  const certificates = useSelector((state) => state.template.certificates);
  const old = certificates.find((e) => e._id === id);
  const [name, setName] = useState(old ? old.Name : "");
  const [description, setDescription] = useState(old ? old.Description : "");
  const [nameAr, setNameAr] = useState(old ? old.NameAr : "");
  const [descriptionAr, setDescriptionAr] = useState(
    old ? old.DescriptionAr : ""
  );
  const [date, setDate] = useState(new Date());
  const cvID = useSelector((state) => state.cvID);
  let history = useHistory();
  const { t, i18n } = useTranslation();

  const lan = useSelector((state) => state.sections.twolan);

  const data = {
    name,
    description,
    date,
    nameAr,
    descriptionAr,
    id,
    order: "1",
    cvID,
  };
  const handelCancel = () => {
    setName("");
    setDate(0);
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
          <Grid item xs={12} sm={6}>
            <h2>{t("Edit Certificate")}</h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}
            <TextField

              label={t("Certificate Name")}
              variant="filled"
              style={{ width: "100%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}
            <TextField

              label={t("Description")}
              variant="filled"
              style={{ width: "100%" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={lan === 0 ? "arhide" : ""}>
            {" "}
            <TextField

              label={t("Certificate NameAr")}
              variant="filled"
              style={{ width: "100%" }}
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={lan === 0 ? "arhide" : ""}>
            {" "}
            <TextField

              label={t("DescriptionAr")}
              variant="filled"
              style={{ width: "100%" }}
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  views={["year"]}
                  label="Date"
                  value={date}
                  onChange={(e) => setDate(e)}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
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
                  dispatch(EditCertificateAction(data));
                  history.push("/buildcv/certificates");
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
