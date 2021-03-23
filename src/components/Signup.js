import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Button, Box, Paper, Grid, Container, Hidden } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import {
  VisibilityOff,
  Visibility,
  GetAppTwoTone,
  InsertDriveFileTwoTone,
  Backup,
} from "@material-ui/icons";
import image from "./../img/login-img-eng.png";
import { SignupAction } from "./../store/action/auth";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import InputAdornment from "@material-ui/core/InputAdornment";

function Signup() {
  //const state = useSelector((state) => state.template[0]);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  return (
    <Grid
      container
      justify="space-evenly"
      alignItems="center"
      xs={12}
      style={{ minHeight: "100vh", backgroundColor: "#f6f6f8" }}
    >
      <Grid item sm={6}>
        <Hidden smDown>
          <Box p={10} style={{ width: "100%" }}>
            <Grid container spacing={8} justify="center">
              <Grid item>
                {" "}
                <h2>{t("Lets create your CV in 10 min")}</h2>
              </Grid>

              <Grid item>
                <Grid container spacing={8} justify="center">
                  <Grid item xs={4}>
                    <GetAppTwoTone />
                    <h6>{t("unlimited download")}</h6>
                  </Grid>
                  <Grid item xs={4}>
                    <InsertDriveFileTwoTone />
                    <h6>{t("over 30 templete")}</h6>
                  </Grid>
                  <Grid item xs={4}>
                    {" "}
                    <Backup />
                    <h6>{t("unlimited download")}</h6>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {" "}
                <img src={image} className="signupImage" />
              </Grid>
            </Grid>
          </Box>{" "}
        </Hidden>
      </Grid>
      <Grid item xs={10} sm={6}>
        <Paper elevation={3} style={{ width: "90%" }}>
          <Container>
            <Formik
              initialValues={{
                email: "",
                password: "",
                firstName: "",
                lastName: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = t("Required");
                }
                if (!values.firstName) {
                  errors.firstName = t("Required");
                }
                if (!values.lastName) {
                  errors.lastName = t("Required");
                }
                if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    values.email
                  )
                ) {
                  errors.email = t("Invalid email address");
                }
                if (values.password.length<8)
                  errors.password = t("password must be at least 8 character");
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(SignupAction(values));
                setTimeout(() => {
                  if (localStorage.getItem("token"))
                    history.push("/dashboard");
                }, 2000);
              }}
            >
              {({ submitForm, isSubmitting }) => (
                <Form className="signup">
                  {" "}
                  <Grid
                    container
                    alignItems="center"
                    justify="space-between"
                    direction="column"
                    spacing={4}
                  >
                    <Grid item xs={12}>
                      <h1 style={{ marginTop: "30px" }}>
                        {t("Signup for free now")}
                      </h1>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        name="firstName"
                        type="text"
                        label={t("FirstName")}
                        variant="outlined"
                        className="textField"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        name="lastName"
                        type="text"
                        label={t("LastName")}
                        variant="outlined"
                        className="textField"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        name="email"
                        type="email"
                        label={t("Email")}
                        variant="outlined"
                        className="textField"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        label={t("Password")}
                        variant="outlined"
                        className="textField"
                        component={TextField}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />{" "}
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        disabled={isSubmitting}
                        onClick={submitForm}
                        className="save"
                      >
                        {t("Submit")}
                      </Button>
                      <Link to="/login" style={{ marginLeft: "10px" }}>
                        {t("Login")}
                      </Link>
                    </Grid>{" "}
                  </Grid>{" "}
                </Form>
              )}
            </Formik>
          </Container>
        </Paper>
      </Grid>{" "}
    </Grid>
  );
}

export default Signup;
