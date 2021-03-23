import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./template_08.css";

//#region Import Images
import img_01 from "../../assets/imgs/template_08/01.png";
import img_02 from "../../assets/imgs/template_08/02.png";
import img_03 from "../../assets/imgs/template_08/03.png";
import img_04 from "../../assets/imgs/template_08/04.png";
import img_05 from "../../assets/imgs/template_08/05.png";
import img_07 from "../../assets/imgs/template_08/07.png";
import img_08 from "../../assets/imgs/template_08/08.png";
import img_09 from "../../assets/imgs/template_08/09.png";
import img_10 from "../../assets/imgs/template_08/10.png";
import img_11 from "../../assets/imgs/template_08/11.png";
import img_12 from "../../assets/imgs/template_08/12.png";
import img_13 from "../../assets/imgs/template_08/13.png";
import img_14 from "../../assets/imgs/template_08/14.png";
import img_15 from "../../assets/imgs/template_08/15.png";
import img_16 from "../../assets/imgs/template_08/16.png";
import img_17 from "../../assets/imgs/template_08/17.png";
import img_18 from "../../assets/imgs/template_08/18.png";
import img_19 from "../../assets/imgs/template_08/19.png";
import img_20 from "../../assets/imgs/template_08/20.png";
import img_21 from "../../assets/imgs/template_08/21.png";
import img_22 from "../../assets/imgs/template_08/22.png";
import img_23 from "../../assets/imgs/template_08/23.png";
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
  const infos = [...pdf.querySelectorAll("div.t08-detail")];
  
  text.forEach(
    (p) =>
    !p.classList.contains('t08-co-text') &&
      (p.style.transform = "translateY(-30%)")
  );
  text.forEach(
    (p) =>
      p.classList.contains('t08-co-text') &&
      (p.style.transform = "translateY(-10%)")
  );
  // infos.forEach(
  //   (info) =>
  //   !info.classList.contains('t08-detail-3') &&
  //     (info.style.top = "12%")
  // );

  html2canvas(pdf, {
    dpi: 300, // Set to 300 DPI
    scale: 2, // Adjusts your resolution
    useCORS: true
  })
    .then((canvas) => {
      const filename = "template_8";
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
    // infos.forEach(
    //   (info) =>
    //   !info.classList.contains('t08-detail-3') &&
    //     (info.style.top = "12.5%")
    // );
}

const ref = React.createRef();
const Template08 = (props) => {
  const {
    educations,
    experiences,
    languages,
    courses,
    careerobjective,
    personalInformation,
    skills,
  } = useSelector((state) => state.template);
  const hidden = useSelector((state) => state.isHide);

  let CO = null;
  if (careerobjective) {
    CO = careerobjective;
  }

  let PI = null;
  if (personalInformation) {
    PI = personalInformation;
  }

  let edus = null;
  let arEdus = null;
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
      let grade = "";
      if (edu.Grade === 1) {
        grade = "Good";
      } else if (edu.Grade === 2) {
        grade = "Very Good";
      } else if (edu.Grade === 3) {
        grade = "Excellent";
      }
      return (
        <div className="t08-edu t08-sec-content" key={edu._id}>
          <div className="t08-content-circle">
            <div className="t08-circle"></div>
          </div>
          <div className="t08-content-text">
            <p className="t08-edu-title bold">{degree}</p>
            <div className="t08-edu-text">
              <p>Major: {edu.Faculty}</p>
              <p>{`${edu.UniversityName} - ${edu.YearEnd}`}</p>
              <p>
                GPA: {edu.DegreeFrom5} out of 5 with{" "}
                {grade === "Excellent" ? "an" : "a"} {grade} Grade
              </p>
            </div>
          </div>
        </div>
      );
    });
    arEdus = educations.map((edu) => {
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
      let gradeAr = "";
      if (edu.Grade === 1) {
        gradeAr = "جيد";
      } else if (edu.Grade === 2) {
        gradeAr = "جيد جداً";
      } else if (edu.Grade === 3) {
        gradeAr = "ممتاز";
      }
      return (
        <div className="t08-edu t08-sec-content" key={edu._id}>
          <div className="t08-content-circle">
            <div className="t08-circle"></div>
          </div>
          <div className="t08-content-text">
            <p className={`t08-edu-title bold ar`}>{degreeAr}</p>
            <div className="t08-edu-text">
               <p className={`ar`}>{`التخصص\xa0`}{`${edu.FacultyAr}\xa0`}</p>
               <p className={`ar`}>
                {`${edu.UniversityNameAr}\xa0`}- {`${edu.YearEnd}\xa0`}
              </p>
               <p className={`ar`}>
                {`المعدل\xa0`}{`${edu.DegreeFrom5}\xa0`}{`من\xa05\xa0وبتقدير\xa0`}{`${gradeAr}\xa0`}
              </p>
            </div>
          </div>
        </div>
      );
    });
  }

  let jobs = null;
  let arJobs = null;
  if (experiences.length > 0) {
    jobs = experiences.map((job) => {
      return (
        <div className="t08-work t08-sec-content" key={job._id}>
          <div className="t08-content-circle">
            <div className="t08-circle"></div>
          </div>
          <div className="t08-content-text">
            <div className="t08-work-text">
              <p>
                {job.Description} as {job.Name} from {job.Start} - {job.End}
              </p>
            </div>
          </div>
        </div>
      );
    });
    arJobs = experiences.map((job) => {
      return (
        <div className="t08-work t08-sec-content" key={job._id}>
          <div className="t08-content-circle">
            <div className="t08-circle"></div>
          </div>
          <div className="t08-content-text">
            <div className="t08-work-text">
               <p className={`ar`}>
                {`${job.DescriptionAr}\xa0`}{`بوظيفة\xa0`}{`${job.NameAr}\xa0`}{`من\xa0`}{`${job.Start}\xa0`}- {`${job.End}\xa0`}
              </p>
            </div>
          </div>
        </div>
      );
    });
  }

  let crses = null;
  let arCrses = null;
  if (courses.length > 0) {
    crses = courses.map((crs) => {
      return (
        <div className="t08-course t08-sec-content" key={crs._id}>
          <div className="t08-content-circle">
            <div className="t08-circle"></div>
          </div>
          <div className="t08-content-text">
            <div className="t08-course-text">
              <p>
                {crs.Name} at {crs.Description}
              </p>
              <p>From the period {crs.Year}</p>
            </div>
          </div>
        </div>
      );
    });

    arCrses = courses.map((crs) => {
      return (
        <div className="t08-course t08-sec-content" key={crs._id}>
          <div className="t08-content-circle">
            <div className="t08-circle"></div>
          </div>
          <div className="t08-content-text">
            <div className="t08-course-text">
               <p className={`ar`}>
                {`${crs.NameAr}\xa0`}{`في\xa0`}{`${crs.DescriptionAr}\xa0`}
              </p>
               <p className={`ar`}>{`من\xa0الفترة\xa0`}{`${crs.Year}\xa0`}</p>
            </div>
          </div>
        </div>
      );
    });
  }

  const allSkills = {
    'Computer Proficiency': img_13,
    'Time Managment': img_14,
    'TeamWork': img_15,
    'Problem solving': img_16,
    'Self Development': img_20,
    'Leadership and Organisation': img_21,
    'Work under pressure': img_22,
    'Office Programs': img_23,
  };
  let skls = null;
  let arSkls = null;
  if (skills.length > 0) {
    skls = skills.map((skill) => {
      let skillLogo = allSkills[skill.Name];
      return (
        <div className="t08-skill" key={skill._id}>
          <div className="t08-skill-logo">
            <div className="t08-skill-logo-bg">
              <img src={skillLogo} alt="" />
            </div>
          </div>
          <div className="t08-skill-name">
            <p>{skill.Name}</p>
          </div>
        </div>
      );
    });
    arSkls = skills.map((skill) => {
      let skillLogo = allSkills[skill.Name];
      return (
        <div className="t08-skill" key={skill._id}>
          <div className="t08-skill-logo">
            <div className="t08-skill-logo-bg">
              <img src={skillLogo} alt="" />
            </div>
          </div>
          <div className="t08-skill-name">
             <p className={`ar`}>{`${skill.NameAr}\xa0`}</p>
          </div>
        </div>
      );
    });
  }

  let langs = null;
  let arLangs = null;
  if (languages.length > 0) {
    langs = languages.map((lang) => {
      let rate = [];
      for (let i = 0; i < lang.Rate; i++) {
        rate.push(<img src={img_17} alt="" key={Math.random()} />);
      }
      for (let i = 0; i < 5 - lang.Rate; i++) {
        rate.push(<img src={img_18} alt="" key={Math.random()} />);
      }

      return (
        <div className="t08-lang" key={lang._id}>
          <div className="t08-lang-name">
            <p>{lang.Name}</p>
          </div>
          <div className="t08-lang-rate">{rate}</div>
        </div>
      );
    });
    arLangs = languages.map((lang) => {
      let rate = [];
      for (let i = 0; i < lang.Rate; i++) {
        rate.push(<img src={img_17} alt="" key={Math.random()} />);
      }
      for (let i = 0; i < 5 - lang.Rate; i++) {
        rate.push(<img src={img_18} alt="" key={Math.random()} />);
      }

      return (
        <div className="t08-lang" key={lang._id}>
          <div className="t08-lang-name">
             <p className={`ar`}>{`${lang.NameAr}\xa0`}</p>
          </div>
          <div className="t08-lang-rate">{rate}</div>
        </div>
      );
    });
  }

  //#region - Career Objective Section
  let objectiveSection = CO.text && (
    <div className="t08-row-section">
      {/* English */}
      <div className="t08-sec t08-objective-sec">
        <div className="t08-sec-logo">
          <img src={img_07} alt="" />
        </div>
        <div className="t08-sec-title">
          <p>Career Objective</p>
        </div>
        <div className="t08-sec-body">
          <div className="t08-sec-content">
            <div className="t08-content-circle">
              <div className="t08-circle"></div>
            </div>
            <div className="t08-content-text">
              <p className={`t08-co-text`}>{CO.text}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Arabic */}
      <div className="t08-sec t08-objective-sec ar">
        <div className="t08-sec-logo ar">
          <img src={img_07} alt="" />
        </div>
        <div className="t08-sec-title ar">
           <p className={`ar`}>{`الهدف\xa0الوظيفي`}</p>
        </div>
        <div className="t08-sec-body ar">
          <div className="t08-sec-content">
            <div className="t08-content-circle">
              <div className="t08-circle"></div>
            </div>
            <div className="t08-content-text">
              <p className={`t08-co-text ar`}>{`${CO.textAr}\xa0`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  //#endregion
  //#region - Education Section
  let educationSection = !hidden.isEducationsHidden && edus && (
    <div className="t08-row-section">
      {/* English */}
      <div className="t08-sec t08-edu-sec">
        <div className="t08-sec-logo">
          <img src={img_08} alt="" />
        </div>
        <div className="t08-sec-title">
          <p>Education</p>
        </div>
        <div className="t08-sec-body">{edus}</div>
      </div>
      {/* Arabic */}
      <div className="t08-sec t08-edu-sec ar">
        <div className="t08-sec-logo ar">
          <img src={img_08} alt="" />
        </div>
        <div className="t08-sec-title ar">
          <p>التعليم</p>
        </div>
        <div className="t08-sec-body ar">{arEdus}</div>
      </div>
    </div>
  );

  //#endregion
  //#region - Work Section
  let workSection = !hidden.isExperiencesHidden && jobs && (
    <div className="t08-row-section">
      {/* English */}
      <div className="t08-sec t08-work-sec">
        <div className="t08-sec-logo">
          <img src={img_09} alt="" />
        </div>
        <div className="t08-sec-title">
          <p>Experience</p>
        </div>
        <div className="t08-sec-body">{jobs}</div>
      </div>
      {/* Arabic */}
      <div className="t08-sec t08-work-sec ar">
        <div className="t08-sec-logo ar">
          <img src={img_09} alt="" />
        </div>
        <div className="t08-sec-title ar">
          <p>الخبرات</p>
        </div>
        <div className="t08-sec-body ar">{arJobs}</div>
      </div>
    </div>
  );

  //#endregion
  //#region - Courses Section
  let coursesSection = !hidden.isCoursesHidden && crses && (
    <div className="t08-row-section">
      {/* English */}
      <div className="t08-sec t08-course-sec">
        <div className="t08-sec-logo">
          <img src={img_10} alt="" />
        </div>
        <div className="t08-sec-title">
          <p>Courses</p>
        </div>
        <div className="t08-sec-body">{crses}</div>
      </div>
      {/* Arabic */}
      <div className="t08-sec t08-course-sec ar">
        <div className="t08-sec-logo ar">
          <img src={img_10} alt="" />
        </div>
        <div className="t08-sec-title ar">
          <p>الدورات</p>
        </div>
        <div className="t08-sec-body ar">{arCrses}</div>
      </div>
    </div>
  );
  //#endregion
  //#region - Skills Section
  let skillsSection = skls && (
    <div className="t08-row-section">
      {/* English */}
      <div className="t08-sec t08-skill-sec">
        <div className="t08-sec-logo">
          <img src={img_11} alt="" />
        </div>
        <div className="t08-sec-title">
          <p>Skills</p>
        </div>
        <div className="t08-sec-body">{skls}</div>
      </div>
      {/* Arabic */}
      <div className="t08-sec t08-skill-sec ar">
        <div className="t08-sec-logo ar">
          <img src={img_11} alt="" />
        </div>
        <div className="t08-sec-title ar">
          <p>المهارات</p>
        </div>
        <div className="t08-sec-body ar">{arSkls}</div>
      </div>
    </div>
  );
  //#endregion
  //#region - Languages Section
  let languagesSection = !hidden.isLanguagesHidden && langs && (
    <div className="t08-row-section">
      {/* English */}
      <div className="t08-sec t08-lang-sec">
        <div className="t08-sec-logo">
          <img src={img_12} alt="" />
        </div>
        <div className="t08-sec-title">
          <p>Languages</p>
        </div>
        <div className="t08-sec-body">{langs}</div>
      </div>
      {/* Arabic */}
      <div className="t08-sec t08-lang-sec ar">
        <div className="t08-sec-logo ar">
          <img src={img_12} alt="" />
        </div>
        <div className="t08-sec-title ar">
          <p>اللغات</p>
        </div>
        <div className="t08-sec-body ar">{arLangs}</div>
      </div>
    </div>
  );
  //#endregion

  const [mainSectionList, setMainSectionList] = useState([
    objectiveSection,
    educationSection,
    workSection,
    coursesSection,
    skillsSection,
    languagesSection,
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
        <div className="template08-body" ref={ref} id="toPDF">
          {/* Name Section */}
          <div className="t08-name-sec">
            <h1>
              {`${PI.FirstNameAr}\xa0 ${PI.SecondNameAr}\xa0 ${PI.LastNameAr}\xa0`}
            </h1>
            <h1>
              {PI.FirstName} {PI.SecondName} {PI.LastName}
            </h1>
          </div>

          {/* Header Section */}
          <div className="t08-header-sec">
            <div className="t08-details">
              <div className="t08-detail t08-detail-1 ar">{PI.City}</div>
              <div className="t08-detail t08-detail-2 ar">{PI.Nationality}</div>
              <div className="t08-detail t08-detail-3">
                <img src={img_05} alt="flag" />
              </div>
              <div className="t08-detail t08-detail-4">{PI.NationalityAr}</div>
              <div className="t08-detail t08-detail-5">{PI.CityAr}</div>
            </div>
            <div className="t08-world">
              <img src={img_19} alt="" />
            </div>
          </div>

          {/* Info Section */}
          <div className="t08-row-section">
            <div className="t08-info-sec">
              <div className="t08-info">
                <div className="t08-info-logo t08-info-logo-1">
                  <img src={img_01} alt="" />
                </div>
                <div className="t08-info-text">
                  <p>{PI.Phone}</p>
                </div>
              </div>
              <div className="t08-info">
                <div className="t08-info-logo t08-info-logo-2">
                  <img src={img_02} alt="" />
                </div>
                <div className="t08-info-text">
                  <p>{PI.Email}</p>
                </div>
              </div>
            </div>
            <div className="t08-info-sec ar">
              <div className="t08-info">
                <div className="t08-info-logo t08-info-logo-3">
                  <img src={img_03} alt="" />
                </div>
                <div className="t08-info-text ar">
                  <p>{PI.Birth}</p>
                </div>
              </div>
              <div className="t08-info">
                <div className="t08-info-logo t08-info-logo-4">
                  <img src={img_04} alt="" />
                </div>
                <div className="t08-info-text ar">
                  <p>
                    {`${PI.MaritalStatusAr == 1 ? 'متزوج' : 'أعزب'}\xa0`}- {`${PI.MaritalStatus == 1 ? 'Married' : 'Single'}\xa0`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Sections */}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable-main" type="Main">
              {(provided) => (
                <div
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

export default Template08;
