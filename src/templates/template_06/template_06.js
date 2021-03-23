import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./template_06.css";

//#region Import Images
import img_01 from "../../assets/imgs/template_06/01.png";
import img_02 from "../../assets/imgs/template_06/02.png";
import img_03 from "../../assets/imgs/template_06/03.png";
import img_04 from "../../assets/imgs/template_06/04.png";
import img_05 from "../../assets/imgs/template_06/05.png";
import img_06 from "../../assets/imgs/template_06/06.png";
import img_07 from "../../assets/imgs/template_06/07.png";
import img_08 from "../../assets/imgs/template_06/08.png";
import img_09 from "../../assets/imgs/template_06/09.png";
import img_10 from "../../assets/imgs/template_06/10.png";
import img_11 from "../../assets/imgs/template_06/11.png";
import img_12 from "../../assets/imgs/template_06/12.png";
import img_13 from "../../assets/imgs/template_06/13.png";
import img_14 from "../../assets/imgs/template_06/14.png";
import img_15 from "../../assets/imgs/template_06/15.png";
import img_16 from "../../assets/imgs/template_06/16.png";
import img_17 from "../../assets/imgs/template_06/17.png";
import img_18 from "../../assets/imgs/template_06/18.png";
import img_19 from "../../assets/imgs/template_06/19.png";
import img_20 from "../../assets/imgs/template_06/20.png";
import img_21 from "../../assets/imgs/template_06/21.png";
import img_22 from "../../assets/imgs/template_06/22.png";
import img_23 from "../../assets/imgs/template_06/23.png";
import img_24 from "../../assets/imgs/template_06/24.png";
import img_25 from "../../assets/imgs/template_06/25.png";
import img_26 from "../../assets/imgs/template_06/26.png";
import img_27 from "../../assets/imgs/template_06/27.png";
import img_28 from "../../assets/imgs/template_06/28.png";
import img_29 from "../../assets/imgs/template_06/29.png";
import img_30 from "../../assets/imgs/template_06/30.png";
//#endregion

function downloadImage(data, filename = 'untitled.jpeg') {
  var a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

function saveAs(type) {
  const pdf = document.getElementById("toPDF");
  const text = [...pdf.querySelectorAll("p")];
  text.forEach(
    (p) =>
      (p.style.transform = "translateY(-35%)")
  );
  text.forEach(
    (p) =>
    p.classList.contains('t06-year-text') &&
      (p.style.transform = "translateY(-60%)")
  );

  html2canvas(pdf, {
    dpi: 300, // Set to 300 DPI
    scale: 2, // Adjusts your resolution
    useCORS: true
  })
    .then((canvas) => {
      const filename = "template_6";
      if(type==='PDF'){
        var img = canvas.toDataURL("image/PNG", 1);
        var doc = new jsPDF("p", "mm", "a4");
        doc.addImage(img, "PNG", -2, 0, 212, 298);
        doc.save(filename);
      }
      else if(type==='PNG'){
        let imageURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        downloadImage(imageURL, filename+'.png');
      }
      else {
        let imageURL = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        downloadImage(imageURL, filename+'.jpeg');
      }
    })
    .catch((err) => console.log(err));

    text.forEach(
      (p) =>
        (p.style.transform = "translateY(0%)")
    );
    text.forEach(
      (p) =>
      p.classList.contains('t06-year-text') &&
        (p.style.transform = "translateY(-30%)")
    );
}

const ref = React.createRef();
const Template06 = (props) => {
  const {
    educations,
    certificates,
    experiences,
    languages,
    courses,
    careerobjective,
    personalInformation,
    othertraining,
    skills,
  } = useSelector((state) => state.template);
  const hidden = useSelector((state) => state.isHide);
  const cvLanguage = useSelector((state) => state.cvLanguage);

  let edus = null;
  if (educations.length > 0) {
    edus = educations.map((edu) => {
      let degree = "";
      if (edu.Degree === 1) {
        degree = "Bachelor";
      } else if (edu.Degree === 2) {
        degree = "Master";
      } else if (edu.Degree === 3) {
        degree = "PhD";
      } else if (edu.Degree === 4) {
        degree = "High School Certificate";
      }

      return (
        <div className="t06-edu" key={edu._id}>
          <div className="t06-edu-title">
            <p className="bold">{edu.UniversityName}</p>
          </div>
          <div className="t06-edu-content">
            <div className="t06-edu-major">
              <p>
                {degree} in {edu.Faculty}
              </p>
            </div>
            <div className="t06-edu-year">
              <p>Graduation Year: {edu.YearEnd}</p>
            </div>
          </div>
        </div>
      );
    });
    if (cvLanguage === "Ar") {
      edus = educations.map((edu) => {
        let degreeAr = "";
        if (edu.Degree === 1) {
          degreeAr = "بكالوريوس";
        } else if (edu.Degree === 2) {
          degreeAr = "ماجستير";
        } else if (edu.Degree === 3) {
          degreeAr = "دكتوراه";
        } else if (edu.Degree === 4) {
          degreeAr = "شهادة\xa0الثانوية\xa0العامة\xa0";
        }
        return (
          <div className="t06-edu" key={edu._id}>
            <div className="t06-edu-title">
              <p className="" className={`bold ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${edu.UniversityName}\xa0`}</p>
            </div>
            <div className="t06-edu-content">
              <div className="t06-edu-major">
                <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                  {`${degreeAr}\xa0${edu.Faculty}\xa0`}
                </p>
              </div>
              <div className="t06-edu-year">
                <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`سنة\xa0التخرج\xa0`} :{`${edu.YearEnd}\xa0`}</p>
              </div>
            </div>
          </div>
        );
      });
    }
  }

  let jobs = null;
  if (experiences.length > 0) {
    jobs = experiences.map((job) => {
      return (
        <div className="t06-work" key={job._id}>
          <div className="t06-work-company">
            <div className={`t06-arrow ${cvLanguage === "Ar" ? "ar" : ""}`}>
              <img src={img_10} alt="half-full-right-arrow" />
            </div>
            <div className="t06-co-name">
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${job.Name}\xa0`}</p>
            </div>
          </div>
          <div className="t06-work-pos">
            <div className="t06-pos-square">
              <div className="t06-square"></div>
            </div>
            <div className="t06-pos-name">
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${job.Description}\xa0`}</p>
            </div>
          </div>
          <div className="t06-work-date">
            <div className="t06-empty-space"></div>
            <div className="t06-date-content">
              <span className="t06-from">{`${job.Start}\xa0`}</span>- <span className="t06-to">{`${job.End}\xa0`}</span>
            </div>
          </div>
        </div>
      );
    });
  }

  let CO = null;
  if (careerobjective) {
    CO = careerobjective;
  }

  let PI = null;
  if (personalInformation) {
    PI = personalInformation;
  }

  let crses = null;
  if (courses.length > 0) {
    crses = courses.map((crs) => {
      return (
        <div
          className={`t06-course ${cvLanguage === "Ar" ? "ar" : ""}`}
          key={crs._id}
        >
          <div className="t06-course-date">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{crs.Year}</p>
          </div>
          <div className="t06-course-circle">
            <div className="t06-circle">
              <div className="t06-inner-circle"></div>
            </div>
          </div>
          <div className="t06-course-name">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${crs.Name}\xa0`}</p>
          </div>
        </div>
      );
    });
  }

  let langs = null;
  if (languages.length > 0) {
    langs = languages.map((lang) => {
      let rate = [];
      for (let i = 0; i < lang.Rate; i++) {
        rate.push(<img src={img_29} alt="" key={Math.random()} />);
      }
      for (let i = 0; i < 5 - lang.Rate; i++) {
        rate.push(<img src={img_30} alt="" key={Math.random()} />);
      }

      return (
        <div className="t06-lang" key={lang._id}>
          <div className="t06-lang-name">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${lang.Name}\xa0`}</p>
          </div>
          <div className="t06-lang-rate">{rate}</div>
        </div>
      );
    });
  }

  let others = null;
  if (othertraining.length > 0) {
    others = othertraining.map((train) => {
      return (
        <div
          className={`t06-train ${cvLanguage === "Ar" ? "ar" : ""}`}
          key={train._id}
        >
          <div className="t06-train-circle">
            <div className="t06-circle">
              <div className="t06-inner-circle"></div>
            </div>
          </div>
          <div className="t06-train-name">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${train.Name}\xa0`}</p>
          </div>
        </div>
      );
    });
  }

  const allSkills = {
    'MS1': img_19,
    'Computer Proficiency': img_20,
    'Work under pressure': img_21,
    'Leadership and Organisation': img_22,
    'Office Programs': img_23,
    'Self Development': img_24,
    'MS7': img_25,
    'Problem solving': img_26,
    'TeamWork': img_27,
    'Time Managment': img_28,
  };
  let skls = null;
  if (skills.length > 0) {
    skls = skills.map((skill) => {
      let skillLogo = allSkills[skill.Name];
      return (
        <div className="t06-skill" key={skill._id}>
          <div className="t06-skill-logo">
            <div className="t06-skill-logo-bg">
              <img src={skillLogo} alt="" />
            </div>
          </div>
          <div className="t06-skill-name">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage==='Ar' ? `${skill.NameAr}\xa0` : skill.Name}</p>
          </div>
        </div>
      );
    });
  }

  let certs = null;
  if (certificates.length > 0) {
    certs = certificates.map((cert) => {
      return (
        <div className="t06-cert" key={cert._id}>
          <p className="" className={`t06-cert-text ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <span className="t06-cert-title">{`${cert.Name}\xa0`} :</span>
            {`${cert.Description}\xa0`}
          </p>
          <p className="" className={`t06-cert-year ${cvLanguage === "Ar" ? "ar" : ""}`}>{cert.Year}</p>
        </div>
      );
    });
  }

  //#region - Personal Info Section
  let personalInfoSection = (
    <div className={`t06-info-sec t06-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      <div className={`t06-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <div className={`t06-title-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <img src={img_01} alt="" />
        </div>
        <div className={`t06-title-name ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
            {cvLanguage === "Ar"
              ? "المعلومات\xa0الشخصية\xa0"
              : "Personal Information"}
          </p>
        </div>
      </div>
      <div className="t06-sec-body">
        <div className="t06-info">
          <div className="t06-info-logo">
            <img src={img_03} alt="" />
          </div>
          <div className="t06-info-text">
            <p>{PI.Phone}</p>
          </div>
        </div>
        <div className="t06-info">
          <div className="t06-info-logo">
            <img src={img_04} alt="" />
          </div>
          <div className="t06-info-text">
            <p>{`${PI.City}\xa0`}</p>
          </div>
        </div>
        <div className="t06-info">
          <div className="t06-info-logo">
            <img src={img_05} alt="" />
          </div>
          <div className="t06-info-text">
            <p>{PI.Email}</p>
          </div>
        </div>
        <div className="t06-info">
          <div className="t06-info-logo">
            <img src={img_06} alt="" />
          </div>
          <div className="t06-info-text">
          {cvLanguage === 'Ar' ? 
            (<p className="t01-info-status">{PI.MaritalStatus == 1 ? 'متزوج' : 'أعزب'}</p>)
            :
            (<p className="t01-info-status">{PI.MaritalStatus == 1 ? 'Married' : 'Single'}</p>)
          }
        </div>
        </div>
        <div className="t06-info">
          <div className="t06-info-logo">
            <img src={img_07} alt="" />
          </div>
          <div className="t06-info-text">
            <p>{PI.LinkedIn}</p>
          </div>
        </div>
        <div className="t06-info">
          <div className="t06-info-logo">
            <img src={img_08} alt="" />
          </div>
          <div className="t06-info-text">
            <p>{PI.Birth}</p>
          </div>
        </div>
      </div>
    </div>
  );
  //#endregion
  //#region - Objective Career Section
  let objectiveSection = (
    <div className={`t06-objective-sec t06-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      <div className={`t06-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <div className={`t06-title-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <img src={img_02} alt="" />
        </div>
        <div className={`t06-title-name ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
            {cvLanguage === "Ar" ? "الهدف\xa0الوظيفي\xa0" : "Career Objective"}
          </p>
        </div>
      </div>
      <div className="t06-sec-body">
        <div className="t06-objective-text">
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${CO.text}\xa0`}</p>
        </div>
      </div>
    </div>
  );
  //#endregion
  //#region - Work Section
  let workSection = !hidden.isExperiencesHidden && (
    <div className={`t06-work-sec t06-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      <div className={`t06-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <div className={`t06-title-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <img src={img_09} alt="" />
        </div>
        <div className={`t06-title-name ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "الخبرات\xa0العملية\xa0" : "Experience"}</p>
        </div>
      </div>
      <div className="t06-sec-body">
        <div className={`t06-left bold ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <div className={`t06-year ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className='t06-year-text'>{cvLanguage === "Ar" ? "الآن" : "Present"}</p>
            <div className="t06-dot"></div>
          </div>
          <div className={`t06-year ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className='t06-year-text'>2020</p>
            <div className="t06-dot"></div>
          </div>
          <div className={`t06-year ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className='t06-year-text'>2019</p>
            <div className="t06-dot"></div>
          </div>
          <div className={`t06-year ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className='t06-year-text'>2018</p>
            <div className="t06-dot"></div>
          </div>
          <div className={`t06-year ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className='t06-year-text'>2017</p>
            <div className="t06-dot"></div>
          </div>
          <div className={`t06-year ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className='t06-year-text'>2016</p>
            <div className="t06-dot"></div>
          </div>
          <div className={`t06-year ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className='t06-year-text'>2015</p>
            <div className="t06-dot"></div>
          </div>
          <div className={`t06-year ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className='t06-year-text'>2014</p>
            <div className="t06-dot"></div>
          </div>
          <div className={`t06-year ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className='t06-year-text'>2013</p>
            <div className="t06-dot"></div>
          </div>
          <div className={`t06-year ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className='t06-year-text'>2012</p>
            <div className="t06-dot"></div>
          </div>
          <div className={`t06-year ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className='t06-year-text'>2011</p>
            <div className="t06-dot"></div>
          </div>
          <div className={`t06-year ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className='t06-year-text'>2010</p>
            <div className="t06-dot"></div>
          </div>
        </div>
        <div className="t06-right">{jobs}</div>
      </div>
    </div>
  );
  //#endregion
  //#region - Education Section
  let eduSection = !hidden.isEducationsHidden && (
    <div className={`t06-edu-sec t06-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      <div className={`t06-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <div className={`t06-title-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <img src={img_11} alt="" />
        </div>
        <div className={`t06-title-name ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "المؤهلات\xa0العلمية\xa0" : "Education"}</p>
        </div>
      </div>
      <div className="t06-sec-body">
        {edus}
        <div
          className={`t06-sec t06-certification-sec ${
            cvLanguage === "Ar" ? "ar" : ""
          }`}
        >
          <div className={`t06-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <div
              className={`t06-title-logo ${cvLanguage === "Ar" ? "ar" : ""}`}
            >
              <img src={img_12} alt="" />
            </div>
            <div
              className={`t06-title-name ${cvLanguage === "Ar" ? "ar" : ""}`}
            >
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "الشهادات" : "Certificates"}</p>
            </div>
          </div>
          <div className="t06-sec-body">{certs}</div>
        </div>
      </div>
    </div>
  );

  //#endregion
  //#region - Courses Section
  let coursesSection = !hidden.isCoursesHidden && (
    <div className={`t06-sec t06-course-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      <div className={`t06-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <div className={`t06-title-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <img src={img_13} alt="" />
        </div>
        <div className={`t06-title-name ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
            {cvLanguage === "Ar" ? "الدورات\xa0التدريبية\xa0" : "Training Courses"}
          </p>
        </div>
      </div>
      <div className="t06-sec-body">{crses}</div>
    </div>
  );
  //#endregion
  //#region - Programs Section
  let programsSection = (
    <div className={`t06-program-sec t06-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      <div className={`t06-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <div className={`t06-title-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <img src={img_14} alt="" />
        </div>
        <div className={`t06-title-name ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "البرامج" : "Programs"}</p>
        </div>
      </div>
      <div className="t06-sec-body">
        <div className="t06-program">
          <div className="t06-program-logo">
            <img src={img_15} alt="" />
          </div>
          <div className="t06-program-name">
            <p>Microsoft Office Applications</p>
            <p>Highly expert in Excel</p>
          </div>
        </div>
      </div>
    </div>
  );
  //#endregion
  //#region - Skills Section
  let skillsSection = (
    <div className={`t06-sec t06-skill-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      <div className={`t06-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <div className={`t06-title-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <img src={img_16} alt="" />
        </div>
        <div className={`t06-title-name ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "المهارات" : "Skills"}</p>
        </div>
      </div>
      <div className="t06-sec-body">{skls}</div>
    </div>
  );
  //#endregion
  //#region - Other Trainings Section
  let otherTrainingsSection = !hidden.isOtherTrainingsHidden && (
    <div className={`t06-other-sec t06-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      <div className={`t06-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <div className={`t06-title-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <img src={img_17} alt="" />
        </div>
        <div className={`t06-title-name ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "تدريبات\xa0أخرى\xa0" : "Other Training"}</p>
        </div>
      </div>
      <div className="t06-sec-body">{others}</div>
    </div>
  );
  //#endregion
  //#region - Languages Section
  let languageSection = !hidden.isLanguagesHidden && (
    <div className="t06-lang-wrapper">
      <div className={`t06-lang-sec t06-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <div className={`t06-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <div className={`t06-title-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <img src={img_18} alt="" />
          </div>
          <div className={`t06-title-name ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "اللغات" : "Languages"}</p>
          </div>
        </div>
        <div className="t06-sec-body">{langs}</div>
      </div>
    </div>
  );
  //#endregion

  //#region - Section 1
  let section_1 = (
    <div className="t06-sec-wrapper t06-sec-wrapper-1">
      {/* Info Section */}
      {personalInfoSection}
      {/* Career Objective Section */}
      {objectiveSection}
    </div>
  );
  //#endregion
  //#region - Section 2
  let section_2 = (
    <div className="t06-sec-wrapper t06-sec-wrapper-2">
      {/* Work Section */}
      {workSection}
      {/* Education Section */}
      {eduSection}
    </div>
  );
  //#endregion
  //#region - Section 3
  let section_3 = (
    <div
      className={`t06-sec-wrapper t06-sec-wrapper-3 ${
        cvLanguage === "Ar" ? "ar" : ""
      }`}
    >
      {/* Courses Section */}
      {coursesSection}
      {/* Programs Section */}
      {programsSection}
    </div>
  );
  //#endregion
  //#region - Section 4
  let section_4 = (
    <div className="t06-sec-wrapper t06-sec-wrapper-4">
      {/* Skills Section */}
      {skillsSection}
    </div>
  );
  //#endregion
  //#region - Section 5
  let section_5 = (
    <div className="t06-sec-wrapper t06-sec-wrapper-5">
      {/* Other Training */}
      {otherTrainingsSection}
      {/* Languages */}
      {languageSection}
    </div>
  );
  //#endregion

  const [mainSectionList, setMainSectionList] = useState([
    section_1,
    section_2,
    section_3,
    section_4,
    section_5,
  ]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    if (result.type === "Main") {
      const items = Array.from(mainSectionList);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setMainSectionList(items);
    }
  }

  return (
    <>
      <div className="backgroundimg">
        <div className='dl-ctrls'>
          <button onClick={() => saveAs('PDF')}>Download as PDF</button>
          <button onClick={() => saveAs('PNG')}>Download as PNG</button>
          <button onClick={() => saveAs('JPEG')}>Download as JPEG</button>
        </div>
        <div
          className={`template06-body ${cvLanguage === "Ar" ? "ar" : ""}`}
          ref={ref}
          id="toPDF"
        >
          {/* Name Section */}
          <div className="t06-name-sec">
            <h1>
              {`${PI.FirstName}\xa0 ${PI.SecondName}\xa0 ${PI.LastName}\xa0`}
            </h1>
          </div>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div>
              <Droppable droppableId="droppable-main" type="Main">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {mainSectionList.map((sec, index) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={`draggable-main-${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {sec}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default Template06;
