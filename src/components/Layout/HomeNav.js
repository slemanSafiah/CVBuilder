import React, {useContext, useEffect, useState} from "react";
import {useHistory, withRouter, Link} from "react-router-dom";
import {ButtonContainer} from "./Button";
import us from "./../../img/us.svg";
import ar from "./../../img/sa.svg";

import AccountCircle from "@material-ui/icons/AccountCircle";

import {useTheme} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
function HomeNav(props) {
  const [isst, setisst] = useState(false);

  let history = useHistory();
  const theme = useTheme();
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);

    document.body.dir = i18n.dir();
    theme.direction = i18n.dir();
  };
  const logout = () => {
    localStorage.clear();
  };
  useEffect(() => {
    setisst(localStorage.getItem("state"));
  }, [history.location]);
  return (
    <nav className="navbar navbar-expand-lg justify-content-between">
      <a className="navbar-brand" href="#">
        CVBuilder
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse nav1"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="navbar-brand" to="/dashboard">
              <h5>{t("Dashboard")}</h5>
            </Link>
          </li>
          <li className="nav-item">
            <a className="navbar-brand" href="#">
              <h5>{t("AboutUS")}</h5>
            </a>
          </li>
          <li className="nav-item">
            <Link className="navbar-brand" to="/contactus">
              <h5>{t("ContactUS")}</h5>
            </Link>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src={
                  i18n.language == "en" || i18n.language == "en-US" ? us : ar
                }
                style={{width: "30px", marginLeft: "10px", marginRight: "10px"}}
              />
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" onClick={() => changeLanguage("en")}>
                <img
                  src={us}
                  style={{
                    width: "30px",
                  }}
                />
                <h6>English</h6>
              </a>
              <a className="dropdown-item" onClick={() => changeLanguage("ar")}>
                {" "}
                <img
                  src={ar}
                  style={{
                    width: "30px",
                  }}
                />{" "}
                <h6>عربي</h6>
              </a>
            </div>
          </li>
        </ul>
        <h5 onClick={props.setDrawerState}>
          <AccountCircle style={{width: "90px", color: "#2E0E33"}} />{" "}
        </h5>
        <Link 
          className="navbar-brand"
          to={localStorage.getItem("token")?"":"/login"}
          onClick={() => (localStorage.getItem("token") ? logout() : "")}
        >
          <h5>{localStorage.getItem("token") ? t("Logout") : t("Login")}</h5>
        </Link>
      </div>
    </nav>
  );
}
export default withRouter(HomeNav);
