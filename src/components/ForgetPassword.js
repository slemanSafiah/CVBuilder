import React, { useState } from "react";
import { Paper, Grid, Button, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import emailjs from 'emailjs-com';
import axios from "axios";

const SERVICE_ID = 'service_3hmskrp';
const TEMPLATE_ID = 'template_f0fh8zs';
const USER_ID = 'user_qCv6fHInwGWyS1oSahpy9';


export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();


  var _id = 'ooo';
  const handleSubmit = (e) => {
    let form=e.target;
    console.log(form)
    e.preventDefault();
    axios.post('https://we4cv.com/api/auth/getID', {
      Email: email
    })
      .then(res => {
        console.log(res)
        _id = res.data._id;
        localStorage.setItem('reset-id', _id);
        document.getElementById("_id").value = _id;
        console.log(document.getElementById("_id").value)
      }).then(result => {
        console.log(form)

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, USER_ID)
          .then((result) => {
            console.log(result);
          }, (error) => {
            console.log(error.text);
          });
      })
      .catch(err => console.log(err));



  }


  return (
    <Grid container justify="center" direction="column" alignItems="center" style={{ marginTop: "50px" }}>
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
              <h3 style={{ paddingTop: "30px" }}>Forget your password?</h3>{" "}
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <input
                    id="_id"
                    name="_id"
                    hidden
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <input
                      id="Email"
                      name="Email"
                      placeholder={t("Email")}
                      className="form-control text-right"
                      type="text"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <Button
                    variant="contained"
                    className="save"
                    style={{ float: "right" }}
                    type='submit'
                  >
                    {t("Send")}
                  </Button>
                </div>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}
