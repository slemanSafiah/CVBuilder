import React, {useState, useEffect} from "react";
import {Link, NavLink} from "react-router-dom";
import logo from "./../img/logo.png";
import {useHistory} from "react-router-dom";
import {ContactusAction} from "./../store/action/action";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {Button} from "@material-ui/core";
import emailjs from 'emailjs-com';

const SERVICE_ID = 'service_3hmskrp';
const TEMPLATE_ID = 'template_p2ssu4q';
const USER_ID = 'user_qCv6fHInwGWyS1oSahpy9';

export default function Getintouch() {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [number, setnumber] = useState("");
  // const data = {name, email, number, message};
  //const state = useSelector((state) => state.template[0]);
  const {t} = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || message === "" || number === "")
      alert("تأكد من ملأ جميع الحقول قبل الإرسال");
    else {
      // dispatch(ContactusAction(data));
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });  
    }
  }

  return (
    <div className="container shadow-lg rounded contact py-5 mb-5">
      <div className="row">
        {" "}
        <div className="div col-md-2">
          {" "}
          <img src={logo} className="mr-auto  " />
        </div>
        <div className="div col-md-10">
          {" "}
          <h3 className="text-right ">{t("Contact US")}</h3>
        </div>
      </div>
      <hr />
      <div
        className="row mt-3"
        data-aos="fade-up-left"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={sendEmail}>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <input
                      id="Full Name"
                      name="Name"
                      placeholder={t("FullName")}
                      className="form-control text-right"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <input
                      type="email"
                      name="Email"
                      className="form-control text-right"
                      id="inputEmail4"
                      placeholder={t("Email")}
                      value={email}
                      onChange={(event) => setemail(event.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <input
                      id="Mobile No."
                      name="Number"
                      placeholder={t("Phone")}
                      className="form-control text-right"
                      required="required"
                      type="text"
                      value={number}
                      onChange={(event) => setnumber(event.target.value)}
                    />
                  </div>

                  <div className="form-group col-md-12">
                    <textarea
                      id="comment"
                      name="Message"
                      cols="40"
                      rows="5"
                      placeholder={t("Message")}
                      className="form-control text-right"
                      value={message}
                      onChange={(event) => setmessage(event.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="form-row">
                  <Button
                    variant="contained"
                    className="save"
                    style={{float: "right"}}
                    type='submit'
                  >
                    {t("Send")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="text-right mb-5">
            <h5 className="mt-3">{"Address"}</h5>
            <p> دمشق -النبك</p>
          </div>
          <div className="text-right mb-2">
            <h5>{"Email"}</h5>
            <p> info@irtaki.com</p>
          </div>
          <div className="text-right mb-5">
            <h5>{"Phone"}</h5>
            <p> +963-0930737281</p>
          </div>
          <hr />
          <div className="social">
            <ul className="list-inline list-unstyled">
              <li className="list-inline-item">
                <Link to="#">
                  <i className="fab fa-google-plus-g icon"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#">
                  <i className="fab fa-linkedin-in icon"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#">
                  <i className="fab fa-facebook-f icon"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#">
                  <i className="fab fa-twitter icon"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
