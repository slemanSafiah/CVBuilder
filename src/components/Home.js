import React, {Component, useState} from "react";
import Nav from "./Layout/HomeNav";
import section2img from "./../img/homepage.png";
import {Payment, EventNote} from "@material-ui/icons";
import Footer from "./Layout/Footer";
import Drawertemp from "./CV/Drawer";
import {Drawer} from "@material-ui/core";
import {useTranslation} from "react-i18next";

export default function Home() {
  const [drawerState, setDrawerState] = useState(false);
  const {t} = useTranslation();

  return (
    <div className="">
      <Drawer
        anchor={"right"}
        open={drawerState}
        onClose={() => setDrawerState(false)}
      >
        <Drawertemp />
      </Drawer>
      <section className="section1home pt-4">
        <div className="container">
          <Nav setDrawerState={setDrawerState} />
          <div className="row section1">
            <div
              className="col-sm-6"
              data-aos="fade-right"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              {" "}
              <h1>{t("homeheadtext")}</h1>
            </div>
            <div className="col-sm-6 section1img"></div>
          </div>{" "}
        </div>
      </section>
      <section
        className="section2 mt-5"
        data-aos="fade-in"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <div class="container">
          <div className="row ">
            <div className="col-sm-6">
              <img src={section2img} />
            </div>
            <div className="col-sm-6">
              <h1>
                Why BuildCV?
                <br />
                with us u can build a professional resume to get a good job
              </h1>
            </div>
          </div>{" "}
        </div>
      </section>
      <section className="section3">
        <div class="container" style={{textAlign: "center"}}>
          <div className="row">
            <div
              className="col-sm-4"
              data-aos="flip-right"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <div className="card shadow">
                <div className="card-body">
                  <Payment className="icon" />
                  <h5 className="card-title mt-3">Pay using MasterCard</h5>
                  <p className="card-text">
                    you can pay for building your cv using MasterCard
                  </p>
                </div>
              </div>{" "}
            </div>
            <div
              className="col-sm-4"
              data-aos="flip-up"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <div className="card shadow">
                <div className="card-body">
                  <EventNote className="icon" />
                  <h5 className="card-title mt-3">Over 30 Templates</h5>
                  <p className="card-text">
                    you can choose template from over 30 and download it
                    (pdf,png,jpeg)
                  </p>
                </div>
              </div>{" "}
            </div>
            <div
              className="col-sm-4"
              data-aos="flip-left"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <div className="card shadow">
                <div className="card-body">
                  <Payment className="icon" />

                  <h5 className="card-title mt-3">Pay using MasterCard</h5>
                  <p className="card-text">
                    you can pay for building your cv using MasterCard
                  </p>
                </div>
              </div>{" "}
            </div>
          </div>{" "}
        </div>
      </section>
      <Footer />
    </div>
  );
}
