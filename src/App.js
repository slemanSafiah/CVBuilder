import React, { useState, useEffect } from "react";
import { VerticleButton as ScrollUpButton } from "react-scroll-up-button";
import { useDispatch } from "react-redux";
import "./App.css";

import withRoot from "./i18n/WithRoot";
import { Route, Switch, Redirect } from "react-router-dom";
import Footer from "./components/Layout/Footer";
import Default from "./components/Layout/Default";
import Home from "./components/Home";
import Loading from "./components/Layout/Loading";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contactus from "./components/Contactus";
import ForgetPassword from "./components/ForgetPassword";
import CVTemplates from "./components/CV/CVTemplates";
import CVName from "./components/CV/CVName";
import CVLanguage from "./components/CV/CVLanguage";
import BuildCV from "./components/CV/BuildCV";
import Dashboard from "./components/Dashboard";
import ResetPaeeword from "./components/ResetPassword";

import { useTranslation } from "react-i18next";
import Toast from "./components/Toast";

import AOS from "aos";
import "aos/dist/aos.css";

import Template01 from "./templates/template_01/template_01";
import Template02 from "./templates/template_02/template_02";
import Template03 from "./templates/template_03/template_03";
import Template04 from "./templates/template_04/template_04";
import Template05 from "./templates/template_05/template_05";
import Template06 from "./templates/template_06/template_06";
import Template07 from "./templates/template_07/template_07";
import Template08 from "./templates/template_08/template_08";
import Template09 from "./templates/template_09/template_09";
import Template10 from "./templates/template_10/template_10";
import Template11 from "./templates/template_11/template_11";
import { fetchCVId } from "./store/action/cv";

function App(props) {
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init();
    dispatch(fetchCVId());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Toast />
          <Switch>
            <Route exact path="/" render={(props) => <Home />} />
            <Route path="/login" render={(props) => <Login />} />
            <Route path="/signup" render={(props) => <Signup />} />
            <Route path="/contactus" render={(props) => <Contactus />} />
            <Route
              path="/forgetpassword"
              render={(props) => <ForgetPassword />}
            />
            <Route path="/resetpassword/:id" render={(props) => <ResetPaeeword />} />
            <PrivateRoute path="/cvtemplates"
              component={CVTemplates}
            />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/cvname" component={CVName} />
            <PrivateRoute path="/cvlanguage" component={CVLanguage} />
            <PrivateRoute path="/buildcv" component={BuildCV} />
            <PrivateRoute
              path="/template01"
              component={Template01}
            />
            <PrivateRoute
              path="/template02"
              component={Template02}
            />
            <PrivateRoute
              path="/template03"
              component={Template03}
            />
            <PrivateRoute
              path="/template04"
              component={Template04}
            />
            <PrivateRoute
              path="/template05"
              component={Template05}
            />
            <PrivateRoute
              path="/template06"
              component={Template06}
            />
            <PrivateRoute
              path="/template07"
              component={Template07}
            />
            <PrivateRoute
              path="/template08"
              component={Template08}
            />
            <PrivateRoute
              path="/template09"
              component={Template09}
            />
            <PrivateRoute
              path="/template10"
              component={Template10}
            />
            <PrivateRoute
              path="/template11"
              component={Template11}
            />

            <Route render={(props) => <Default />} />
          </Switch>
          <ScrollUpButton
            AnimationDuration={500}
            EasingType="easeOutCubic"
            style={{ backgroundColor: "rgba(69, 35, 73, 0.9)" }}
          />
        </>
      )}
    </div>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  console.log(localStorage.getItem("token"))
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
}
export default withRoot(App);
