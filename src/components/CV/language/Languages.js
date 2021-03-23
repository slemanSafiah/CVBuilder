import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Paper,
  Grid,
  IconButton,
  Container,
} from "@material-ui/core";
import {
  Delete,
  OpenWith,
  Edit,
  FileCopy,
  VisibilityOff,
  Visibility,
} from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import {
  DeleteLanguageAction,
  CopyLanguageAction,
  HideLanguageAction,
  OrderLanguageAction,
} from "./../../../store/action/language";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";

export default function Languages() {
  const dispatch = useDispatch();
  const temp = useSelector((state) => state.template.languages);
  const languagelen = useSelector((state) => state.template.languagelen);

  const { t } = useTranslation();
  const cvID = useSelector((state) => state.cvID);
  const [hide, setHide] = useState(0);
  const [languages, setLanguages] = useState([]);
  const isHidden = useSelector((state) => state.isHide.isLanguagesHidden);
  let history = useHistory();

  useEffect(() => {
    setLanguages(temp);
  }, [temp]);
  const onDragEnd = (result) => {
    const { destination, source, reason } = result;
    if (!destination || reason === "CANCEL") {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const users = Object.assign([], languages);
    const droppedUser = languages[source.index];

    users.splice(source.index, 1);
    users.splice(destination.index, 0, droppedUser);
    setLanguages(users);
    dispatch(OrderLanguageAction({ source, destination, cvID, languages }));
  };
  const renderUsers = (lan, index) => {
    return (
      <Draggable key={index} draggableId={index + " "} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Grid item xs={12} className="mt-3">
              <Paper>
                <Container>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={4}
                    style={{ width: "100%" }}
                  >
                    <Grid item xs={1}>
                      <h4>{index + 1}</h4>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container direction="column">
                        <Grid item>
                          <h6>
                            {lan.Name}
                            <span
                              style={{
                                backgroundColor: "yellow",
                                marginLeft: "10px",
                              }}
                            >
                              {lan.Rate}/5
                            </span>
                          </h6>{" "}
                        </Grid>
                        <Grid item>
                          <Box
                            component="fieldset"
                            mb={3}
                            borderColor="transparent"
                          >
                            <Rating
                              name="customized-10"
                              defaultValue={lan.Rate}
                              max={5}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/buildcv/editlanguage?language_id=${lan._id}`}>
                        {" "}
                        <IconButton aria-label="delete">
                          <Edit />
                        </IconButton>
                      </Link>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        aria-label="delete"
                        onClick={() =>
                          dispatch(
                            CopyLanguageAction({
                              id: lan._id,
                              cvID,
                            })
                          )
                        }
                      >
                        <FileCopy />
                      </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        aria-label="delete"
                        onClick={() =>
                          dispatch(
                            DeleteLanguageAction({ cvID, language_id: lan._id })
                          )
                        }
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Container>{" "}
              </Paper>
            </Grid>
          </div>
        )}
      </Draggable>
    );
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
        <Grid container alignItems="center" direction="column" spacing={6}>
          <Grid item style={{ width: "100%" }} sx={12}>
            <Grid container alignItems="center" direction="row" spacing={6}>
              <Grid item sm={6} xs={12}>
                <h2>{t("Languages")}</h2>
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <Button
                  color="secondary"
                  startIcon={isHidden === false ? <Visibility /> : <VisibilityOff />}
                  className="button"
                  onClick={() => {
                    setHide(!hide);
                    dispatch(HideLanguageAction({ cvID, hide }));
                  }}
                >
                  {hide === 1 ? t("HideSection") : t("ShowSection")}
                </Button>{" "}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <h5>{t("LanguagesText")}</h5>
          </Grid>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dp1">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {languages.map(renderUsers)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* {languages < languagelen ? ( */}
          <Grid item xs={12}>
            {" "}
            <Link to="addlanguage">
              {" "}
              <Button
                variant="contained"
                className="save"
              >
                {t("AddLanguage")}
              </Button>
            </Link>
            <Link to="/buildcv/experience">
              {" "}
              <Button
                variant="contained"
                className="save"
              >
                {t("next")}
              </Button>
            </Link>
          </Grid>
          {/* ) : (
            ""
          )} */}
        </Grid>
      </Container>
    </Paper>
  );
}
