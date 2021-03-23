import React, { useState } from "react";
import { TextField, Paper, Grid, Button, Box } from "@material-ui/core";
import { ResetPassword } from "./../store/action/action";
import { useSelector, useDispatch } from "react-redux";

export default function ResetPasswordC() {
  const email = useSelector((state) => state.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const _id = window.location.href.split('/').reverse()[0];

  return (
    <Grid
      container
      justify="center"
      direction="column"
      alignItems="center"
      style={{ marginTop: "50px" }}
    >
      <Grid item xs={12}>
        <Paper elevation={3} style={{ width: "600px", padding: "30px" }}>
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
            spacing={8}
          >
            <Grid item xs={12}>
              <h3 style={{ paddingTop: "30px" }}>Reset password</h3>{" "}
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label="Password"
                variant="outlined"
                style={{ width: "400px" }}
                className="textField"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Confirm Password"
                variant="outlined"
                style={{ width: "400px" }}
                className="textField"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (password === confirmPassword)
                    dispatch(ResetPassword({ _id, email, password }));
                  else alert("كلمتي المرور غير متطابقتان");
                }}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}
