import React from "react";
import {Button, Box, Paper, Grid, Container, Avatar} from "@material-ui/core";
import defaultimg from "./../../img/stylingcv-default.jpg";
import {
  PowerSettingsNew,
  Email,
  Call,
  Dashboard,
  Help,
  AccountBox,
} from "@material-ui/icons";
import {Link, Redirect} from "react-router-dom";
import {useTranslation} from "react-i18next";

function logout() {
  localStorage.clear();
  return (
    <Redirect
      to={{
        pathname: `/login`,
        // state: {from: props.location},
        key: "redirect-login",
      }}
    />
  );
}
export default function Drawer() {
  const {t, i18n} = useTranslation();

  return (
    <Container>
      <Grid
        container
        spacing={4}
        direction="column"
        alignItems="center"
        justify="center"
        style={{paddingTop: "20px", width: "300px"}}
      >
        <Grid item>
          <Avatar
            alt="Remy Sharp"
            src={defaultimg}
            style={{width: "50px", height: "50px"}}
          />
        </Grid>
        <Grid item>
          <h5>
            {i18n.language === "en" ? <AccountBox /> : ""}

            <span style={{margin: "10px"}}>{t("Name")}</span>
            {i18n.language === "ar" ? <AccountBox /> : ""}
          </h5>

          <hr />
        </Grid>
        <Grid item>
          <h5>
            {i18n.language === "en" ? <Dashboard /> : ""}

            <span style={{margin: "10px"}}>
              <Link to="dashboard">{t("Dashboard")} </Link>
            </span>
            {i18n.language === "ar" ? <Dashboard /> : ""}
          </h5>
        </Grid>

        <Grid item>
          <h5>
            {" "}
            {i18n.language === "en" ? <Email /> : ""}
            <span style={{margin: "10px"}}>
              <Link to="contactus">{t("ContactUs")}</Link>
            </span>
            {i18n.language === "ar" ? <Email /> : ""}
          </h5>
          <hr />
        </Grid>
        <Grid item>
          <h5 onClick={() => logout()}>
            {i18n.language === "en" ? <PowerSettingsNew /> : ""}

            <span style={{margin: "10px"}}>{t("Logout")}</span>
            {i18n.language === "ar" ? <PowerSettingsNew /> : ""}
          </h5>
        </Grid>
      </Grid>
    </Container>
  );
}
