import React, {useState, useEffect} from "react";
import {Button, Paper, Grid, IconButton, Container} from "@material-ui/core";
import {
  Delete,
  Edit,
  FileCopy,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import {
  DeleteOtherTrainingAction,
  OrderOtherTrainingAction,
  CopyOtherTrainingAction,
  HideOtherTrainingAction,
} from "./../../../store/action/othertraining";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {Link, useLocation} from "react-router-dom";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import { getNext } from "./../../../helpers/get-next";

export default function OtherTraining(props) {
  const dispatch = useDispatch();
  const temp = useSelector((state) => state.template.othertraining);
  const othertraininglen = useSelector(
    (state) => state.template.othertraininglen
  );
  const template = useSelector((state) => state.cvTemplate);

  const {t} = useTranslation();
  const cvID = useSelector((state) => state.cvID);
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
  const [hide, setHide] = useState(0);
  const [othertraining, setOthertraining] = useState([]);
  const isHidden = useSelector((state) => state.isHide.isOtherTrainingsHidden);

  useEffect(() => {
    setOthertraining(temp);
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
    const users = Object.assign([], othertraining);
    const droppedUser = othertraining[source.index];

    users.splice(source.index, 1);
    users.splice(destination.index, 0, droppedUser);
    setOthertraining(users);
    dispatch(
      OrderOtherTrainingAction({source, destination, cvID, othertraining})
    );
  };
  const renderUsers = (oth, index) => {
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
                      <h6>{oth.Name}</h6>{" "}
                    </Grid>
                    <Grid item xs={1}>
                      <Link
                        to={`/buildcv/editothertraining?othertrainingID=${oth._id}`}
                      >
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
                            CopyOtherTrainingAction({
                              id: oth._id,
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
                            DeleteOtherTrainingAction({
                              otherTraining_id: oth._id,
                              cvID,
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
          <Grid item style={{width: "100%"}} sx={12}>
            <Grid container alignItems="center" direction="row" spacing={6}>
              <Grid item sm={6} xs={12}>
                <h2>{t("YourOtherTraining")}</h2>
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <Button
                  color="secondary"
                  startIcon={isHidden === false ? <Visibility /> : <VisibilityOff />}
                  className="button"
                  onClick={() => {
                    setHide(!hide);
                    dispatch(HideOtherTrainingAction({cvID, hide}));
                  }}
                >
                  {hide === 1 ? t("HideSection") : t("ShowSection")}
                </Button>{" "}
              </Grid>
            </Grid>
          </Grid>{" "}
          <Grid item xs={12}>
            <h5>{t("OtherTrainingText")}</h5>
          </Grid>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dp1">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {othertraining.map(renderUsers)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* {othertraining < othertraininglen ? ( */}
            <Grid item xs={12}>
              {" "}
              <Link to="addothertraining">
                {" "}
                <Button
                  variant="contained"
                  className="save"
                  //startIcon={<DeleteIcon />}
                >
                  {t("AddOtherTraining")}
                </Button>
              </Link>
              <Link to={() => getNext('othertraining', template)}>
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
