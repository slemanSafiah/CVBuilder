import React, {useState, useEffect} from "react";
import {Button, Paper, Grid, IconButton, Container} from "@material-ui/core";
import {
  Delete,
  Edit,
  VisibilityOff,
  Visibility,
} from "@material-ui/icons";
import {useSelector, useDispatch} from "react-redux";
import {
  DeleteReferenceAction,
  CopyReferenceAction,
  HideReferenceAction,
} from "./../../../store/action/reference";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import { getNext } from "./../../../helpers/get-next";

export default function Refernce() {
  const dispatch = useDispatch();
  const temp = useSelector((state) => state.template.references);
  const template = useSelector((state) => state.cvTemplate);
  const {t} = useTranslation();
  const cvID = useSelector((state) => state.cvID);
  const [hide, setHide] = useState(0);
  const [references, setReferences] = useState([]);
  const isHidden = useSelector((state) => state.isHide.isReferencesHidden);

  useEffect(() => {
    setReferences(temp);
  }, [temp]);

  return (
    <Paper
      className="buildcvbar"
      data-aos="fade-up-left"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1000"
    >
      <Container>
        <Grid container alignItems="center" direction="column" spacing={6}>
          <Grid item style={{width: "100%"}} sx={12}>
            <Grid container alignItems="center" direction="row" spacing={6}>
              <Grid item sm={6} xs={12}>
                <h2>{t("YourRefernces")}</h2>
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <Button
                  color="secondary"
                  startIcon={isHidden === false ? <Visibility /> : <VisibilityOff />}
                  className="button"
                  onClick={() => {
                    setHide(!hide);
                    dispatch(HideReferenceAction({cvID, hide}));
                  }}
                >
                  {hide === 1 ? t("HideSection") : t("ShowSection")}
                </Button>{" "}
              </Grid>
            </Grid>
          </Grid>{" "}
          <Grid item xs={12}>
            <h5>{t("YourReferncesText")}</h5>
          </Grid>
          {references.map((ref) => (
            <Grid item xs={12}>
              <Paper>
                <Container>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={4}
                    style={{width: "100%"}}
                  >
                    <Grid item xs={1}>
                      <h4>{1}</h4>
                    </Grid>
                    <Grid item xs={7}>
                      <h6>{ref.Name}</h6>{" "}
                    </Grid>
                    <Grid item xs={7}>
                      <h6 className="ml-2">Phone : {ref.Number}</h6>{" "}
                    </Grid>
                    <Grid item xs={1}>
                      <Link
                        to={`/buildcv/editreference?referenceID=${ref._id}`}
                      >
                        {" "}
                        <IconButton aria-label="delete">
                          <Edit />
                        </IconButton>
                      </Link>
                    </Grid>

                    <Grid item xs={1}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          dispatch(
                            DeleteReferenceAction({cvID, reference_id: ref._id})
                          );
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Container>{" "}
              </Paper>
            </Grid>
          ))}
          {references < 1 ? ( 
            <Grid item xs={12}>
              {" "}
              <Link to="/buildcv/addreference">
                {" "}
                <Button
                  variant="contained"
                  className="save"
                >
                  {t("AddReference")}
                </Button>
              </Link>
              <Link to={() => getNext('reference', template)}>
              {" "}
              <Button
                variant="contained"
                className="save"
              >
                {t("next")}
              </Button>
            </Link>
            </Grid>
          ) : (
            ""
          )} 
        </Grid>
      </Container>
    </Paper>
  );
}
