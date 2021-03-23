import React, {useState} from "react";
import {
  Button,
  Box,
  Paper,
  Grid,
  TextField,
  Container,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import {EditLanguageAction} from "./../../../store/action/language";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useHistory, useLocation} from "react-router-dom";
export default function AddLanguage(props) {
  const dispatch = useDispatch();
  const cvID = useSelector((state) => state.cvID);
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
  const id = query.get("language_id");
  const languagetemp = useSelector((state) => state.template.languages);
  const old = languagetemp.find((e) => e._id === id);
  const [language, setLanguage] = useState(old ? old.Name : "");
  const [nameAr, setNameAr] = useState(old ? old.NameAr : "");
  const [rate, setRate] = useState(old ? old.Rate : 0);
  const data = {language, rate, id, nameAr, order: "1"};
  let history = useHistory();
  const {t, i18n} = useTranslation();
  const lan = useSelector((state) => state.sections.twolan);

  const handelCancel = () => {
    setLanguage("");
    setRate(2);
    setNameAr("");
    history.push("/buildcv/languages");
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
          spacing={4}
          alignItems="center"
          justify="center"
          style={{textAlign: "center"}}
        >
          <Grid item xs={12}>
            <h2>{t("Edit Language")}</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField
             
              label={t("Language")}
              variant="filled"
              placeholder={t("eg.English")}
              style={{width: "100%"}}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={lan === 0 ? "arhide" : ""}>
            <TextField
             
              label={t("LanguageAr")}
              variant="filled"
              placeholder="مثال:اللغة الانكليزية"
              style={{width: "100%"}}
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating
                name="customized-10"
                defaultValue={2}
                max={5}
                onChange={(e) => setRate(e.target.value)}
              />
            </Box>
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
                dispatch(EditLanguageAction(data));
                history.push("/buildcv/languages");
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
