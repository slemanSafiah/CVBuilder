import React from "react";
import { Container, Paper, Grid, IconButton, Avatar } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { DeleteCVAction, EditCVAction } from "./../../store/action/cv";
import cv1 from "./../../img/cv1.jpg";
import cv2 from "./../../img/cv2.jpg";
import cv3 from "./../../img/cv3.jpg";
import cv4 from "./../../img/cv4.jpg";
import cv5 from "./../../img/cv5.jpg";
import cv6 from "./../../img/cv6.jpg";
import cv7 from "./../../img/cv7.jpg";
import cv8 from "./../../img/cv8.jpg";
import cv9 from "./../../img/cv9.jpg";
import cv10 from "./../../img/cv10.jpg";
import cv11 from "./../../img/cv11.jpg";
export default function Template(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const email = useSelector((state) => state.email);

 const getTemplatesImage = (template) => {
    if (template === 'cv1')
      return cv1;
    else if (template === 'cv2')
      return cv2;
    else if (template === 'cv3')
      return cv3;
    else if (template === 'cv4')
      return cv4;
    else if (template === 'cv5')
      return cv5;
    else if (template === 'cv6')
      return cv6;
    else if (template === 'cv7')
      return cv7;
    else if (template === 'cv8')
      return cv8;
    else if (template === 'cv9')
      return cv9;
    else if (template === 'cv10')
      return cv10;
    else if (template === 'cv11')
      return cv11;
  }
  
  return (
    <Paper className="shadow"
    >
      <Container>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          spacing={3}
        >
          <Grid item xs={12}>
            <Avatar
              alt="Remy Sharp"
              src={getTemplatesImage(props.template.Template)}
              className="avatar"
              style={{ width: "200px", height: "200px" }}
            />
          </Grid>
          <Grid item>
            <h5>{props.template.Name}</h5>
          </Grid>
          <Grid item>
            <h6>
              {t("Created")}:{props.template.CreatedDate}
            </h6>
          </Grid>

          <Grid item>
            <h6>
              {t("Language")}: {props.template.Language}
            </h6>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              spacing={4}
            >
              <Grid item xs={1}>
                <Link
                  to="/buildcv/peronalinfo"
                  onClick={() =>
                    dispatch(EditCVAction({ cvID: props.template._id }))
                  }
                >
                  {" "}
                  <IconButton aria-label="delete">
                    <Edit style={{ color: "rgba(69, 35, 73, 0.9)" }} />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    dispatch(DeleteCVAction({ cvID: props.template._id, email }))
                  }}
                >
                  <Delete style={{ color: "#606060" }} />
                </IconButton>
              </Grid>
            </Grid>{" "}
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}
