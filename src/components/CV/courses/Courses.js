import React, {useState, useEffect} from "react";
import {Button, Paper, Grid, IconButton, Container} from "@material-ui/core";
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
  HideCoursesAction,
  DeleteCoursesAction,
  CopyCoursesAction,
  OrderCoursesAction,
} from "../../../store/action/courses";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";

export default function Courses() {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);

  const temp = useSelector((state) => state.template.courses);
  const courseslen = useSelector((state) => state.template.courseslen);
  const isHidden = useSelector((state) => state.isHide.isCoursesHidden);
  let history = useHistory();

  useEffect(() => {
    setCourses(temp);
  }, [temp]);

  const {t, i18n} = useTranslation();
  const cvID = useSelector((state) => state.cvID);
  const [hide, setHide] = useState(0);
  const onDragEnd = (result) => {
    const {destination, source, reason} = result;
    if (!destination || reason === "CANCEL") {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const users = Object.assign([], courses);
    const droppedUser = courses[source.index];

    users.splice(source.index, 1);
    users.splice(destination.index, 0, droppedUser);
    setCourses(users);
    dispatch(OrderCoursesAction({source, destination, cvID, courses}));
  };
  const renderUsers = (cou, index) => {
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
                    style={{width: "100%"}}
                  >
                    <Grid item xs={1}>
                      <h4>{index + 1}</h4>
                    </Grid>
                    <Grid item xs={6}>
                      <h6>{cou.Name}</h6>{" "}
                    </Grid>
                    <Grid item xs={1}>
                      <Link to={`/buildcv/editcourses?course_id=${cou._id}`}>
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
                          dispatch(CopyCoursesAction({id: cou._id, cvID}))
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
                            DeleteCoursesAction({cvID, courses_id: cou._id})
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
          <Grid item xs={12} style={{width: "100%"}}>
            <Grid container alignItems="center" direction="row" spacing={6}>
              <Grid item sm={6} xs={12}>
                <h2>{t("YourCourses")}</h2>
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <Button
                  color="secondary"
                  startIcon={isHidden === false ? <Visibility /> : <VisibilityOff />}
                  className="button"
                  onClick={() => {
                    setHide(!hide);
                    dispatch(HideCoursesAction({cvID, hide}));
                  }}
                >
                  {hide === 1 ? t("HideSection") : t("ShowSection")}
                </Button>{" "}
              </Grid>
            </Grid>{" "}
          </Grid>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dp1">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {courses.map(renderUsers)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* {courses.length < courseslen ? ( */}
            <Grid item sm={6} xs={12}>
              {" "}
              <Link to="/buildcv/addcourses">
                {" "}
                <Button
                  variant="contained"
                  className="save"
                >
                  {t("AddCourse")}
                </Button>
              </Link>
              <Link to="/buildcv/languages">
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
