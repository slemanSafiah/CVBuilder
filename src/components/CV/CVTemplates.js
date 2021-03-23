import React from "react";
import Card from "./Card";
import {Box, Grid} from "@material-ui/core";
import cv1 from "./../../img/cv1.jpg";
import cv2 from "./../../img/cv2.jpg";
import cv3 from "./../../img/cv3.jpg";
import cv4 from "./../../img/cv4.jpg";
import cv5 from "./../../img/cv5.jpg";
import cv6 from "./../../img/cv6.jpg";
import cv7 from "./../../img/cv7.jpg";
import cv8 from "./../../img/cv8.jpg";
import cv9 from "./../../img/cv9.jpg";
import cv10 from "./../../img/cv10.jpg";
import cv11 from "./../../img/cv11.jpg";

import {useTranslation} from "react-i18next";

export default function CVTemplates() {
  const {t, i18n} = useTranslation();

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      spacing={6}
      style={{paddingTop: "30px"}}
      className="backgroundimg scrolltemplates"
    >
      <Grid item xs={12}>
        {" "}
        <h1
          style={{color: "#5B2338 "}}
          data-aos="fade-down"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
        >
          {t("Select Design")}
        </h1>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={8} justify="center">
          <Grid
            item
            xm={4}
            data-aos="flip-right"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
          >
            <Card CardImage={cv1} template="cv1" />
          </Grid>
          <Grid
            item
            xm={4}
            data-aos="flip-right"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
          >
            <Card CardImage={cv2} template="cv2" />
          </Grid>
          <Grid
            item
            xm={4}
            data-aos="flip-right"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
          >
            <Card CardImage={cv3} template="cv3" />
          </Grid>
          <Grid
            item
            xm={4}
            data-aos="flip-right"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
          >
            <Card CardImage={cv4} template="cv4" />
          </Grid>
          <Grid
            item
            xm={4}
            data-aos="flip-right"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
          >
            <Card CardImage={cv5} template="cv5" />
          </Grid>
          <Grid
            item
            xm={4}
            data-aos="flip-right"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
          >
            <Card CardImage={cv6} template="cv6" />
          </Grid>
          <Grid
            item
            xm={4}
            data-aos="flip-right"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
          >
            <Card CardImage={cv7} template="cv7" />
          </Grid>
          <Grid
            item
            xm={4}
            data-aos="flip-right"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
          >
            <Card CardImage={cv8} template="cv8" />
          </Grid>
          <Grid
            item
            xm={4}
            data-aos="flip-right"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
          >
            <Card CardImage={cv9} template="cv9" />
          </Grid>
          <Grid
            item
            xm={4}
            data-aos="flip-right"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
          >
            <Card CardImage={cv10} template="cv10" />
          </Grid>
          <Grid
            item
            xm={4}
            data-aos="flip-right"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
          >
            <Card CardImage={cv11} template="cv11" />
          </Grid>
        </Grid>
      </Grid>{" "}
    </Grid>
  );
}
