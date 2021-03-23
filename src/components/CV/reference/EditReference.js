import React, {useState} from "react";
import {Button, Paper, Grid, TextField, Container} from "@material-ui/core";
import {EditReferenceAction} from "./../../../store/action/reference";
import {useSelector, useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function EditReference(props) {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();
  const {t, i18n} = useTranslation();
  const cvID = useSelector((state) => state.cvID);
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
  const id = query.get("referenceID");
  const referenc = useSelector((state) => state.template.referenc);
  const old = referenc.find((e) => e._id === id);
  const [reference, setReference] = useState(old ? old.Name : "");
  const data = {id, reference, phone, order: "1"};
  const lan = useSelector((state) => state.sections.twolan);

  const handelCancel = () => {
    setReference("");
    setPhone("");
    history.push("/buildcv/reference");
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
            <h2>{t("Edit Reference")}</h2>
          </Grid>
          <Grid item xs={12}>
            {" "}
            <TextField
              
              label={t("Reference Name")}
              variant="filled"
              color="primary"
              style={{width: "100%"}}
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            {" "}
            <TextField
              
              label={t("Phone")}
              variant="filled"
              color="primary"
              style={{width: "100%"}}
              onChange={(e) => setPhone(e.target.value)}
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
                dispatch(EditReferenceAction(data));
                history.push("/buildcv/reference");
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
