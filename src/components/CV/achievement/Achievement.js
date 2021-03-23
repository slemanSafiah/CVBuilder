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
import AddMembership from "./AddAchievement";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  OrderAchievementAction,
  DeleteAchievementAction,
  CopyAchievementAction,
  HideCopyAchievementAction,
  HideAchievementAction,
} from "../../../store/action/achievement";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import { getNext } from "./../../../helpers/get-next";

export default function Membership() {
  const dispatch = useDispatch();
  const temp = useSelector((state) => state.template.achievements);
  const {t, i18n} = useTranslation();
  const cvID = useSelector((state) => state.cvID);
  const lan = useSelector((state) => state.sections.twolan);
  const achievementlen = useSelector((state) => state.sections.achievementlen);
  const isHidden = useSelector((state) => state.isHide.isAchievementsHidden);

  const [hide, setHide] = useState(0);
  const [achievement, setachievement] = useState([]);
  const template = useSelector((state) => state.cvTemplate);

  useEffect(() => {
    setachievement(temp);
  }, [temp]);
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
    const users = Object.assign([], achievement);
    const droppedUser = achievement[source.index];

    users.splice(source.index, 1);
    users.splice(destination.index, 0, droppedUser);
    setachievement(users);
    dispatch(OrderAchievementAction({source, destination, cvID, achievement}));
  };
  const renderUsers = (ach, index) => {
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
                      <h6>{ach.Name}</h6>{" "}
                    </Grid>
                    <Grid item xs={1}>
                      <Link
                        to={`/buildcv/editachievement?achievementID=${ach._id}`}
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
                          dispatch(CopyAchievementAction({id: ach._id, cvID}))
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
                            DeleteAchievementAction({
                              cvID,
                              achievement_id: ach._id,
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
      style={{minHeight:"350px"}}
    >
      <Container>
        <Grid container alignItems="center" direction="column" spacing={6}>
          <Grid item style={{width: "100%"}} sx={12}>
            <Grid container alignItems="center" direction="row" spacing={6}>
              <Grid item sm={6} xs={12}>
                <h2>{t("YourAchievements")}</h2>
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <Button
                  color="secondary"
                  startIcon={isHidden === false ? <Visibility /> : <VisibilityOff />}
                  className="button"
                  onClick={() => {
                    setHide(!hide);
                    dispatch(HideAchievementAction({cvID, hide}));
                  }}
                >
                  {hide === 1 ? t("HideSection") : t("ShowSection")}
                </Button>{" "}
              </Grid>
            </Grid>
          </Grid>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dp1">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {achievement.map(renderUsers)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
            <Grid item xs={12}>
              {" "}
              <Link to="/buildcv/addachievement">
                {" "}
                <Button
                  variant="contained"
                  className="save"
                >
                  {t("AddAchievement")}
                </Button>
              </Link>
              <Link to={() => getNext('achievement', template)}>
              {" "}
              <Button
                variant="contained"
                className="save"
              >
                {t("next")}
              </Button>
            </Link>
            </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}
