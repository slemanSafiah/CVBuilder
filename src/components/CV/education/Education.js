import React, { useState, useEffect } from "react";
import { Button, Paper, Grid, IconButton, Container } from "@material-ui/core";
import {
  Delete,
  Edit,
  FileCopy,
  VisibilityOff,
  Visibility,
} from "@material-ui/icons";
import {
  EditEducationAction,
  DeleteEducationAction,
  CopyEducationAction,
  OrderEducationAction,
  HideEducationAction,
} from "./../../../store/action/education";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Education() {
  const dispatch = useDispatch();
  const temp = useSelector((state) => state.template.educations);
  const educationlen = useSelector((state) => state.template.educationlen);
  const isHidden = useSelector((state) => state.isHide.isEducationsHidden);

  const cvID = useSelector((state) => state.cvID);
  const [hide, setHide] = useState(0);
  const [educations, setEducations] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    setEducations(temp);
  }, [temp]);

  const getDegree = (degree) => {
    if (degree === 1)
      return t('Bachelor');
    else if (degree === 2)
      return t('Master');
    if (degree === 3)
      return t('PhD');
    if (degree === 4)
      return t('High school');
  }
  const getGrade = (grade) => {
    if (grade === 1)
      return t('good');
    else if (grade === 2)
      return t('very good');
    if (grade === 3)
      return t('excellent');
  }
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
    const users = Object.assign([], educations);
    const droppedUser = educations[source.index];

    users.splice(source.index, 1);
    users.splice(destination.index, 0, droppedUser);
    setEducations(users);
    dispatch(OrderEducationAction({ source, destination, cvID, educations }));
  };
  const renderUsers = (edu, index) => {
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
                        <Grid item >
                          <h6>
                            <b>{getDegree(edu.Degree)}</b>
                          </h6>{" "}
                        </Grid>
                        <Grid item>
                          <h6>
                            {t('University')}: {edu.UniversityName}
                          </h6>
                        </Grid>
                        <Grid item>
                          <Grid item >
                            <h6>
                              {t('Specialization')}: {edu.Faculty}
                            </h6>
                          </Grid>
                          ({edu.YearStart}-{edu.YearEnd})
                        </Grid>
                        <Grid item>
                          <h6>
                            {t("Rate")} :
                            <span
                              style={{
                                backgroundColor: "yellow",
                                marginLeft: "10px",
                              }}
                            >  ({edu.DegreeFrom100}%)
                            </span></h6>
                        </Grid>
                        <Grid item>
                          <h6>{t("Grade")}:
                            {getGrade(edu.Grade)}
                          </h6>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={1}>
                      <Link
                        to={`/buildcv/editeducation?educationID=${edu._id}`}
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
                            CopyEducationAction({
                              id: edu._id,
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
                            DeleteEducationAction({
                              cvID,
                              education_id: edu._id,
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
            <Grid container alignItems="center" direction="row"  justify="center" spacing={6}>
              <Grid item sm={6} xs={12}>
                <h2>{t("Education")}</h2>
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <Button
                  color="secondary"
                  startIcon={isHidden === false ? <Visibility /> : <VisibilityOff />}
                  className="button "
                  onClick={() => {
                    setHide(!hide);
                    dispatch(HideEducationAction({ cvID, hide }));
                  }}
                >
                  {hide === 1 ? t("HideSection") : t("ShowSection")}
                </Button>{" "}
              </Grid>
            </Grid>
          </Grid>{" "}
          <Grid item xs={12}>
            <h5>{t("EducationText")}</h5>
          </Grid>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dp1">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {educations.map(renderUsers)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* {educations.length < educationlen ? ( */}
          <Grid item xs={12}>
            {" "}
            <Link to="/buildcv/addeducation">
              {" "}
              <Button
                variant="contained"
                className="save"
              >
                {t("AddEducation")}
              </Button>
            </Link>
            <Link to="/buildcv/courses">
              {" "}
              <Button
                variant="contained"
                className="save ml5"
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
