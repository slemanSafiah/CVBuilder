import React, {useState, useEffect} from "react";
import {
  Button,
  Box,
  Paper,
  Grid,
  IconButton,
  Container,
  ButtonGroup,
} from "@material-ui/core";
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
  DeleteTechnicalSkillAction,
  CopyTechnicalSkillsAction,
  HideTechnicalSkillAction,
  OrderTechnicalSkillAction,
} from "../../../store/action/technicalskill";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import { getNext } from "./../../../helpers/get-next";

export default function TechnicalSkills() { 
  const dispatch = useDispatch();
  const temp = useSelector((state) => state.template.technicalskills);
  const technicalskilllen = useSelector(
    (state) => state.template.technicalskilllen
  );
  const template = useSelector((state) => state.cvTemplate);

  const {t} = useTranslation();
  const cvID = useSelector((state) => state.cvID);
  const [hide, setHide] = useState(0);
  const [technicalskills, setTechnicalskills] = useState([]);
  const isHidden = useSelector((state) => state.isHide.isTechnicalSkillsHidden);

  useEffect(() => {
    setTechnicalskills(temp);
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
    const users = Object.assign([], technicalskills);
    const droppedUser = technicalskills[source.index];

    users.splice(source.index, 1);
    users.splice(destination.index, 0, droppedUser);
    setTechnicalskills(users);
    dispatch(
      OrderTechnicalSkillAction({source, destination, cvID, technicalskills})
    );
  };
  const renderUsers = (per, index) => {
    return (
      <Draggable key={index} draggableId={index + " "} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Grid item className="mt-3" xs={12}>
              <Paper>
                <Container>
                  <Grid container direction="column" spacing={4}>
                    <Grid item>
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
                          <Grid item xs={7}>
                            <Grid container direction="column">
                              <Grid item>
                                <h6>
                                  {per.Name}
                                  <span
                                    style={{
                                      backgroundColor: "yellow",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    {per.RateFrom5 * 20}%
                                  </span>
                                </h6>{" "}
                              </Grid>
                              <Grid item>
                                <div class="progress">
                                  <div
                                    class="progress-bar"
                                    role="progressbar"
                                    style={{width: `${per.RateFrom5 * 20}%`}}
                                    aria-valuenow={per.RateFrom5 * 20}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  >
                                    {per.RateFrom5 * 20}%
                                  </div>
                                </div>{" "}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton aria-label="delete">
                              <Link
                                to={`/buildcv/edittechnicalskills?technicalskillID=${per._id}`}
                              >
                                {" "}
                                <Edit />
                              </Link>
                            </IconButton>
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              aria-label="delete"
                              onClick={() =>
                                dispatch(
                                  CopyTechnicalSkillsAction({
                                    id: per._id,
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
                                  DeleteTechnicalSkillAction({
                                    cvID,
                                    technicalSkill_id: per._id,
                                  })
                                )
                              }
                            >
                              <Delete />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Container>{" "}
                    </Grid>
                  </Grid>
                </Container>
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
          <Grid item style={{width: "100%"}} sx={12}>
            <Grid container alignItems="center" direction="row" spacing={6}>
              <Grid item sm={6} xs={12}>
                <h2>{t("TechnicalSkills")}</h2>
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <Button
                  color="secondary"
                  startIcon={isHidden === false ? <Visibility /> : <VisibilityOff />}
                  className="button"
                  onClick={() => {
                    setHide(!hide);
                    dispatch(HideTechnicalSkillAction({cvID, hide}));
                  }}
                >
                  {hide == 1 ? t("HideSection") : t("ShowSection")}
                </Button>{" "}
              </Grid>
            </Grid>
          </Grid>{" "}
          <Grid item xs={12}>
            <h5>{t("TechnicalSkillsText")}</h5>
          </Grid>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dp1">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {technicalskills.map(renderUsers)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* {technicalskills < technicalskilllen ? ( */}
            <Grid item xs={12}>
              {" "}
              <Link to="/buildcv/addtechnicalskills">
                {" "}
                <Button
                  variant="contained"
                  className="save"
                //  startIcon={<DeleteIcon />}
                >
                  {t("AddTechnicalSkill")}
                </Button>
              </Link> 
              <Link to={() => getNext('technicalskills', template)}>
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
