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
import {AddLanguageAction} from "./../../../store/action/language";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

export default function AddLanguage(props) {
  const [language, setLanguage] = useState("");
  const [nameAr, setNameAr] = useState("");

  const [rate, setRate] = useState(2);
  const dispatch = useDispatch();
  const cvID = useSelector((state) => state.cvID);
  const data = {language, rate, nameAr, order: 1, cvID};
  const {t, i18n} = useTranslation();
  let history = useHistory();
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
            <h2>{t("AddLanguage")}</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField
         
              label={t("Language")}
              variant="filled"
              placeholder="eg.English"
              style={{width: "100%"}}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={lan === 0 ? "arhide" : ""}>
            <TextField
         
              label={t("LanguageAr")}
              variant="filled"
              placeholder="مثال:اللغة الانكليزية"
              style={{width: "100%"}}  
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
              variant="outlined"
              style={{marginLeft: "10px", float: "right"}}
              onClick={handelCancel}
              className="cancel"
            >
              {t("cancel")}
            </Button>
            <Button
              variant="contained"
              className="save"
              style={{float: "right"}}
              onClick={() => {
                if (language === '')
                  alert("please fill all fields")
                  else{
                dispatch(AddLanguageAction(data));
                history.push("/buildcv/languages");}
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
