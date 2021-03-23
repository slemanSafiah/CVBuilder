import React, {useContext, useEffect, useState} from "react";
import {useHistory, withRouter, Link} from "react-router-dom";
import {ButtonContainer} from "./Button";
import us from "./../../img/us.svg";
import ar from "./../../img/sa.svg";
import {useSelector, useDispatch} from "react-redux";

import AccountCircle from "@material-ui/icons/AccountCircle";

import {useTheme} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
function Navbar(props) {
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
  useEffect(() => {
    setisst(localStorage.getItem("state"));
  }, [history.location]);
  const cvTemplate = useSelector((state) => state.cvTemplate);

  const preview = () => {
    if (cvTemplate === "cv1") history.push("/template06");
    if (cvTemplate === "cv2") history.push("/template05");
    if (cvTemplate === "cv3") history.push("/template01");
    if (cvTemplate === "cv4") history.push("/template03");
    if (cvTemplate === "cv5") history.push("/template02");
    if (cvTemplate === "cv6") history.push("/template07");
    if (cvTemplate === "cv7") history.push("/template04");
    if (cvTemplate === "cv8") history.push("/template09");
    if (cvTemplate === "cv9") history.push("/template11");
    if (cvTemplate === "cv10") history.push("/template08");
    if (cvTemplate === "cv11") history.push("/template10");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <Link className="navbar-brand" to="/dashboard">
        {t("Dashboard")}
      </Link>
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

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          
          <li className="nav-item active">
            <Link className="navbar-brand" to="/cvtemplates">
              <h5>{t("ChangeTemplate")}</h5>
            </Link>
          </li>
          <li className="nav-item active">
            <a className="navbar-brand" onClick={() => preview()}>
              <h5>{t("Preview&Download")}</h5>
            </a>
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
                src={i18n.language == "en" ||i18n.language=="en-US"? us : ar}
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
          <li className="nav-item">
            <h5>
              <AccountCircle
                style={{width: "90px", color: "#2E0E33"}}
                onClick={props.setDrawerState}
              />{" "}
            </h5>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default withRouter(Navbar);
