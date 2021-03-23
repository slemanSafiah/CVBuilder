import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./template_05.css";

//#region Import Images
import photo from "../../assets/imgs/template_05/00.png";
import img_01 from "../../assets/imgs/template_05/01.png";
import img_02 from "../../assets/imgs/template_05/02.png";
import img_03 from "../../assets/imgs/template_05/03.png";
import img_04 from "../../assets/imgs/template_05/04.png";
import img_05 from "../../assets/imgs/template_05/05.png";
import img_06 from "../../assets/imgs/template_05/06.png";
import img_07 from "../../assets/imgs/template_05/07.png";
import img_08 from "../../assets/imgs/template_05/08.png";
import img_09 from "../../assets/imgs/template_05/09.png";
import img_10 from "../../assets/imgs/template_05/10.png";
import img_11 from "../../assets/imgs/template_05/11.png";
import img_12 from "../../assets/imgs/template_05/12.png";
import img_13 from "../../assets/imgs/template_05/13.png";
import img_14 from "../../assets/imgs/template_05/14.png";
import img_15 from "../../assets/imgs/template_05/15.png";
import img_16 from "../../assets/imgs/template_05/16.png";
import img_17 from "../../assets/imgs/template_05/17.png";
import img_18 from "../../assets/imgs/template_05/18.png";
import img_19 from "../../assets/imgs/template_05/19.png";
import img_20 from "../../assets/imgs/template_05/20.png";
import img_21 from "../../assets/imgs/template_05/21.png";
import img_22 from "../../assets/imgs/template_05/22.png";
import img_23 from "../../assets/imgs/template_05/23.png";
import img_24 from "../../assets/imgs/template_05/24.png";
import img_25 from "../../assets/imgs/template_05/25.png";
import img_26 from "../../assets/imgs/template_05/26.png";
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
      (p.style.transform = "translateY(-30%)")
  );

  html2canvas(pdf, {
    dpi: 300, // Set to 300 DPI
    scale: 2, // Adjusts your resolution
    useCORS: true,
    letterRendering: 1,
  })
    .then((canvas) => {
      const filename = "template_5";
      if(type==='PDF'){
        var img = canvas.toDataURL("image/jpeg", 1);
        var doc = new jsPDF("p", "mm", "a4");
        doc.addImage(img, "JPEG", -4, 0, 215, 298);
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
}

const ref = React.createRef();
const Template05 = (props) => {
  const {
    educations,
    experiences,
    languages,
    courses,
    careerobjective,
    personalInformation,
    memberships,
    references,
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
        <div
          className={`t05-edu ${cvLanguage === "Ar" ? "ar" : ""}`}
          key={edu._id}
        >
          <div className={`t05-edu-box ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <div
              className={`t05-edu-title bold ${
                cvLanguage === "Ar" ? "ar" : ""
              }`}
            >
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{edu.UniversityName}</p>
            </div>
            <div
              className={`t05-edu-content ${cvLanguage === "Ar" ? "ar" : ""}`}
            >
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                <span className="t05-content-name">Degree: </span>
                <span>{degree}</span>
              </p>
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                <span className="t05-content-name">Field: </span>
                <span>{edu.Faculty}</span>
              </p>
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                <span className="t05-content-name">Grade: </span>
                <span>{edu.DegreeFrom5} out of 5</span>
              </p>
            </div>
          </div>
          <div className={`t05-edu-date ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <div
              className={`t05-circle ${cvLanguage === "Ar" ? "ar" : ""}`}
            ></div>
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
              <span className="t05-start-date">{edu.YearStart}</span> -
              <span className="t05-end-date">{edu.YearEnd}</span>
            </p>
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
          <div
            className={`t05-edu ${cvLanguage === "Ar" ? "ar" : ""}`}
            key={edu._id}
          >
            <div className={`t05-edu-box ${cvLanguage === "Ar" ? "ar" : ""}`}>
              <div
                className={`t05-edu-title bold ${
                  cvLanguage === "Ar" ? "ar" : ""
                }`}
              >
                <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${edu.UniversityName}\xa0`}</p>
              </div>
              <div
                className={`t05-edu-content ${cvLanguage === "Ar" ? "ar" : ""}`}
              >
                <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                  <span className="t05-content-name">{`الدرجة\xa0العلمية\xa0`} :</span>
                  <span>{`${degreeAr}\xa0`}</span>
                </p>
                <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                  <span className="t05-content-name">{`التخصص\xa0`} :</span>
                  <span>{`${edu.Faculty}\xa0`}</span>
                </p>
                <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                  <span className="t05-content-name">{`المعدل:\xa0`}</span>
                  <span>{`${edu.DegreeFrom5}\xa0`}{`من\xa05\xa0`}</span>
                </p>
              </div>
            </div>
            <div className={`t05-edu-date ${cvLanguage === "Ar" ? "ar" : ""}`}>
              <div
                className={`t05-circle ${cvLanguage === "Ar" ? "ar" : ""}`}
              ></div>
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                <span className="t05-start-date">{edu.YearStart}</span> -
                <span className="t05-end-date">{edu.YearEnd}</span>
              </p>
            </div>
          </div>
        );
      });
    }
  }

  let jobs = null;
  if (experiences.length > 0) {
    jobs = experiences.map((job) => {
      for (let i = 0; i < job.Project.length; i++) {
        console.log(job.Project.charAt(i));
      }
      return (
        <div
          className={`t05-work ${cvLanguage === "Ar" ? "ar" : ""}`}
          key={job._id}
        >
          <div className={`t05-work-box ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <div
              className={`t05-work-title bold ${
                cvLanguage === "Ar" ? "ar" : ""
              }`}
            >
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{job.Name}</p>
            </div>
            <div
              className={`t05-work-content ${cvLanguage === "Ar" ? "ar" : ""}`}
            >
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                <span className="t05-project-name">Project: </span>
                <span className="t05-project-value">{job.Project}</span>
              </p>
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                <span className="t05-job-name">Job: </span>
                <span className="t05-job-value">{job.Description}</span>
              </p>
            </div>
          </div>
          <div className={`t05-work-date ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <div
              className={`t05-circle ${cvLanguage === "Ar" ? "ar" : ""}`}
            ></div>
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
              <span className="t05-start-date">{job.Start}</span> -
              <span className="t05-end-date">{job.End}</span>
            </p>
          </div>
        </div>
      );
    });
    if (cvLanguage === "Ar") {
      jobs = experiences.map((job) => {
        return (
          <div
            className={`t05-work ${cvLanguage === "Ar" ? "ar" : ""}`}
            key={job._id}
          >
            <div className={`t05-work-box ${cvLanguage === "Ar" ? "ar" : ""}`}>
              <div
                className={`t05-work-title bold ${
                  cvLanguage === "Ar" ? "ar" : ""
                }`}
              >
                <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${job.Name}\xa0`}</p>
              </div>
              <div
                className={`t05-work-content ${
                  cvLanguage === "Ar" ? "ar" : ""
                }`}
              >
                <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                  <span className="t05-project-name">{`المشروع\xa0`}</span>
                  <span className="t05-project-value">{`${job.Project}\xa0`}</span>
                </p>
                <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                  <span className="t05-job-name">{`الوظيفة\xa0`}</span>
                  <span className="t05-job-value">{`${job.Description}\xa0`}</span>
                </p>
              </div>
            </div>
            <div className={`t05-work-date ${cvLanguage === "Ar" ? "ar" : ""}`}>
              <div
                className={`t05-circle ${cvLanguage === "Ar" ? "ar" : ""}`}
              ></div>
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                <span className="t05-start-date">{`${job.Start}\xa0`}</span>- <span className="t05-end-date">{`${job.End}\xa0`}</span>
              </p>
            </div>
          </div>
        );
      });
    }
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
          className={`t05-course ${cvLanguage === "Ar" ? "ar" : ""}`}
          key={crs._id}
        >
          <div
            className={`t05-course-circle ${cvLanguage === "Ar" ? "ar" : ""}`}
          >
            <div className="t05-circle"></div>
          </div>
          <div className="t05-course-name">
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
      for (let i = 0; i < lang.RateFrom10; i++) {
        rate.push(<div className="t05-lang-deg" key={Math.random()}></div>);
      }
      for (let i = 0; i < 10 - lang.RateFrom10; i++) {
        rate.push(<div className="t05-lang-deg t05-empty" key={Math.random()}></div>);
      }

      return (
        <div className="t05-lang" key={lang._id}>
          <div className="t05-lang-name">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${lang.Name}\xa0`}</p>
          </div>
          <div className="t05-lang-rate">{rate}</div>
        </div>
      );
    });
  }

  let mems = null;
  if (memberships.length > 0) {
    mems = memberships.map((member) => {
      return (
        <div
          className={`t05-part ${cvLanguage === "Ar" ? "ar" : ""}`}
          key={member._id}
        >
          <div className={`t05-part-circle ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <div className="t05-circle"></div>
          </div>
          <div className="t05-part-text">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${member.Name}\xa0`}</p>
          </div>
        </div>
      );
    });
  }

  let refs = null;
  if (references.length > 0) {
    refs = references.map((ref) => {
      return (
        <div className="t05-ref" key={ref._id}>
          <div className="t05-ref-circle">
            <div className="t05-circle"></div>
          </div>
          <div className="t05-ref-name">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${ref.Name}\xa0`}</p>
          </div>
          <div className="t05-ref-logo">
            <img src={img_25} alt="" />
          </div>
          <div className="t05-ref-num">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{ref.Number}</p>
          </div>
        </div>
      );
    });
  }

  const allSkills = {
    'Computer Proficiency': img_15,
    'Office Programs': img_16,
    'Leadership and Organisation': img_17,
    'MS4': img_18,
    'Self Development': img_19,
    'Time Managment': img_20,
    'Problem solving': img_21,
    'Work under pressure': img_22,
    'MS9': img_23,
    'TeamWork': img_24,
  };
  let skls = null;
  if (skills.length > 0) {
    skls = skills.map((skill) => {
      let skillLogo = allSkills[skill.Name];
      return (
        <div className="t05-skill" key={skill._id}>
          <div className="t05-skill-logo">
            <div className="t05-skill-logo-bg">
              <img src={skillLogo} alt="" />
            </div>
          </div>
          <div className="t05-skill-name">
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage==='Ar' ? `${skill.NameAr}\xa0` : skill.Name}</p>
          </div>
        </div>
      );
    });
  }

  //#region - Education Section
  let eduSection = !hidden.isEducationsHidden && edus && (
    <div className={`t05-sec t05-edu-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      {/* sec logo */}
      <div className={`t05-sec-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <img src={img_08} alt="" />
      </div>
      {/* sec title */}
      <div className={`t05-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "المؤهل\xa0التعليمي\xa0" : "Education"}</p>
      </div>
      {/* sec body */}
      <div className={`t05-sec-body ${cvLanguage === "Ar" ? "ar" : ""}`}>
        {edus}
      </div>
    </div>
  );
  //#endregion
  //#region - Work Section
  let workSection = !hidden.isExperiencesHidden && jobs && (
    <div className={`t05-sec t05-work-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      {/* sec logo */}
      <div className={`t05-sec-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <img src={img_09} alt="" />
      </div>
      {/* sec title */}
      <div className={`t05-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "الخبرات\xa0العملية\xa0" : "Work Experience"}</p>
      </div>
      {/* sec body */}
      <div className={`t05-sec-body ${cvLanguage === "Ar" ? "ar" : ""}`}>
        {jobs}
      </div>
    </div>
  );
  //#endregion
  //#region - Courses Section
  let coursesSection = !hidden.isCoursesHidden && crses && (
    <div className={`t05-sec t05-courses-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      {/* sec logo */}
      <div className={`t05-sec-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <img src={img_10} alt="" />
      </div>
      {/* sec title */}
      <div className={`t05-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
          {cvLanguage === "Ar" ? "الدورات\xa0التدريبية\xa0" : "Training Courses"}
        </p>
      </div>
      {/* sec body */}
      <div className={`t05-sec-body ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <div className="t05-sec-content">{crses}</div>
      </div>
    </div>
  );
  //#endregion
  //#region - Skills Section
  let skillsSection = skls && (
    <div className={`t05-sec t05-skills-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      {/* sec logo */}
      <div className={`t05-sec-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <img src={img_11} alt="" />
      </div>
      {/* sec title */}
      <div className={`t05-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "المهارات" : "Skills"}</p>
      </div>
      {/* sec body */}
      <div className={`t05-sec-body ${cvLanguage === "Ar" ? "ar" : ""}`}>
        {skls}
      </div>
    </div>
  );
  //#endregion
  //#region - Other Section
  let otherSection = (
    <div className="t05-other-sec">
      {/* Memberships */}
      {!hidden.isMembershipsHidden && mems && (
        <div className={`t05-sec t05-part-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
          {/* sec logo */}
          <div className={`t05-sec-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <img src={img_12} alt="" />
          </div>
          {/* sec title */}
          <div className={`t05-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "العضويات" : "Memberships"}</p>
          </div>
          {/* sec body */}
          <div className={`t05-sec-body ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <div className={`t05-sec-content ${cvLanguage === "Ar" ? "ar" : ""}`}>
              {mems}
            </div>
          </div>
        </div>
      )}

      {/* Languages */}
      {!hidden.isLanguagesHidden && langs && (
        <div className={`t05-sec t05-lang-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
          {/* sec logo */}
          <div className={`t05-sec-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <img src={img_13} alt="" />
          </div>
          {/* sec title */}
          <div className={`t05-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "اللغات" : "Languages"}</p>
          </div>
          {/* sec body */}
          <div className={`t05-sec-body ${cvLanguage === "Ar" ? "ar" : ""}`}>
            {langs}
          </div>
        </div>
      )}

      {/* References */}
      {!hidden.isReferencesHidden && refs && (
        <div className={`t05-sec t05-ref-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
          {/* sec logo */}
          <div className={`t05-sec-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <img src={img_14} alt="" />
          </div>
          {/* sec title */}
          <div className={`t05-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "المراجع" : "References"}</p>
          </div>
          {/* sec body */}
          <div className={`t05-sec-body ${cvLanguage === "Ar" ? "ar" : ""}`}>
            {refs}
          </div>
        </div>
      )}
    </div>
  );
  //#endregion

  const [mainSectionList, setMainSectionList] = useState([
    eduSection,
    workSection,
    coursesSection,
    skillsSection,
    otherSection,
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
          className={`template05-body ${cvLanguage === "Ar" ? "ar" : ""}`}
          ref={ref}
          id="toPDF"
        >
          {/* Header Section */}
          <div className="t05-header-sec">
            {/* Photo */}
            <div className="t05-photo">
              <div className="t05-photo-bg">
                <img src={PI.Image ? PI.Image : photo} alt="" />
              </div>
            </div>

            {/* Name */}
            <div className="t05-name">
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                {`${PI.FirstName}\xa0 ${PI.SecondName}\xa0 ${PI.LastName}\xa0`}
              </p>
            </div>

            {/* Details */}
            <div className="t05-details">
              <div className={`t05-detail ${cvLanguage === "Ar" ? "ar" : ""}`}>
                <div className="t05-detail-logo">
                  <img src={img_01} alt="" />
                </div>
                <div className="t05-detail-text">
                  <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{PI.Birth}</p>
                </div>
              </div>
              <div className={`t05-detail ${cvLanguage === "Ar" ? "ar" : ""}`}>
                <div className="t05-detail-logo">
                  <img src={img_02} alt="" />
                </div>
                <div className="t05-detail-text">
                  <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{PI.Phone}</p>
                </div>
              </div>
              <div className={`t05-detail ${cvLanguage === "Ar" ? "ar" : ""}`}>
                <div className="t05-detail-logo">
                  <img src={img_03} alt="" />
                </div>
                <div className="t05-detail-text">
                  <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{PI.Email}</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="t05-location">
              <div className="t05-loc-data">
                <div className={`t05-loc ${cvLanguage === "Ar" ? "ar" : ""}`}>
                  <div className="t05-loc-icon">
                    <img className="t05-flag" src={img_04} alt="" />
                  </div>
                  <div className="t05-loc-text">
                    <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${PI.Nationality}\xa0`}</p>
                  </div>
                </div>
                <div className={`t05-loc ${cvLanguage === "Ar" ? "ar" : ""}`}>
                  <div className="t05-loc-icon">
                    <img src={img_05} alt="" />
                  </div>
                  <div className="t05-loc-text">
                    <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${PI.City}\xa0`}</p>
                  </div>
                </div>
              </div>
              {cvLanguage === "Ar" ? (
                <img className="t05-world ar" src={img_26} alt="" />
              ) : (
                <img className="t05-world" src={img_06} alt="" />
              )}
            </div>
          </div>

          {/* Intro Section */}
          <div className={`t05-objective ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <div className={`t05-obj-logo ${cvLanguage === "Ar" ? "ar" : ""}`}>
              <img src={img_07} alt="" />
            </div>
            <div className={`t05-obj-text ${cvLanguage === "Ar" ? "ar" : ""}`}>
              <p className={`bold ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${CO.text}\xa0`}</p>
            </div>
          </div>

          {/* Main Sections */}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable-main" type="Main">
              {(provided) => (
                <div
                  className="t05-main-sec"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
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
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default Template05;
