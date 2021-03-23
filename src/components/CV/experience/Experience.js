import React, { useState, useEffect } from "react";
import { Button, Paper, Grid, IconButton, Container } from "@material-ui/core";
import {
  Delete,
  OpenWith,
  Edit,
  FileCopy,
  VisibilityOff,
  Visibility,
} from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  DeleteExperienceAction,
  CopyExperienceAction,
  HideExperienceAction,
  OrderExperienceAction,
} from "./../../../store/action/experience";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";

export default function Education() {
  const dispatch = useDispatch();
  const temp = useSelector((state) => state.template.experiences);
  const experiencelen = useSelector((state) => state.template.experiencelen);

  const { t, i18n } = useTranslation();
  const cvID = useSelector((state) => state.cvID);
  const [hide, setHide] = useState(0);
  const [experiences, setExperiences] = useState([]);
  const isHidden = useSelector((state) => state.isHide.isExperiencesHidden);
  let history = useHistory();

  useEffect(() => {
    let isMounted = true;
    if (isMounted)
      setExperiences(temp);
    return () => { isMounted = false };
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
    const users = Object.assign([], experiences);
    const droppedUser = experiences[source.index];

    users.splice(source.index, 1);
    users.splice(destination.index, 0, droppedUser);
    setExperiences(users);
    dispatch(OrderExperienceAction({ source, destination, cvID, experiences }));
  };
  const renderUsers = (exp, index) => {
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
                          <h6>{exp.Name}</h6>{" "}
                        </Grid>
                        <Grid item>
                          <h6>
                            {exp.Description}
                            <span>
                              ({exp.Start}-{exp.End})
                            </span>
                          </h6>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={1}>
                      <Link
                        to={`/buildcv/editexperience?experienceID=${exp._id}`}
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
                        onClick={() =>
                          dispatch(
                            CopyExperienceAction({
                              id: exp._id,
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
                            DeleteExperienceAction({
                              cvID,
                              experience_id: exp._id,
                            })
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
                <h2>{t("Experience")}</h2>
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <Button
                  color="secondary"
                  startIcon={isHidden === false ? <Visibility /> : <VisibilityOff />}
                  className="button"
                  onClick={() => {
                    setHide(!hide);
                    dispatch(HideExperienceAction({ cvID, hide }));
                  }}
                >
                  {hide === 1 ? t("HideSection") : t("ShowSection")}
                </Button>{" "}
              </Grid>
            </Grid>
          </Grid>{" "}
          <Grid item xs={12}>
            <h5>{t("ExperienceText")}</h5>
          </Grid>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dp1">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {experiences.map(renderUsers)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* {experiences.length < experiencelen ? ( */}
          <Grid item xs={12}>
            {" "}
            <Link to="/buildcv/addexperience">
              {" "}
              <Button
                variant="contained"
                //startIcon={<DeleteIcon />}
                className="save"
              >
                {t("AddExperience")}
              </Button>
            </Link>
            <Link to="/buildcv/skills">
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
