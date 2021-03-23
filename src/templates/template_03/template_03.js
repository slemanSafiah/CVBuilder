import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./template_03.css";

//#region Import Images
import photo from "../../assets/imgs/template_03/00.png";
import img_01 from "../../assets/imgs/template_03/01.png";
import img_02 from "../../assets/imgs/template_03/02.png";
import img_03 from "../../assets/imgs/template_03/03.png";
import img_04 from "../../assets/imgs/template_03/04.png";
import img_05 from "../../assets/imgs/template_03/05.png";
import img_06 from "../../assets/imgs/template_03/06.png";
import img_07 from "../../assets/imgs/template_03/07.png";
import img_08 from "../../assets/imgs/template_03/08.png";
import img_09 from "../../assets/imgs/template_03/09.png";
import img_01_red from "../../assets/imgs/template_03/01_red.png";
import img_02_red from "../../assets/imgs/template_03/02_red.png";
import img_03_red from "../../assets/imgs/template_03/03_red.png";
import img_04_red from "../../assets/imgs/template_03/04_red.png";
import img_05_red from "../../assets/imgs/template_03/05_red.png";
import img_06_red from "../../assets/imgs/template_03/06_red.png";
import img_07_red from "../../assets/imgs/template_03/07_red.png";
import img_08_red from "../../assets/imgs/template_03/08_red.png";
import img_09_red from "../../assets/imgs/template_03/09_red.png";
//#endregion

function downloadImage(data, filename = 'untitled.jpeg') {
  var a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}


const ref = React.createRef();
const Template03 = (props) => {
  const {
    educations,
    experiences,
    languages,
    courses,
    careerobjective,
    personalInformation,
    skills,
    technicalskills,
  } = useSelector((state) => state.template);
  const hidden = useSelector((state) => state.isHide);
  const cvColor = useSelector((state) => state.sections.color);
  const cvLanguage = useSelector((state) => state.cvLanguage);

  const colorStyle ={
    darkRed: "#893a4c",
    lightRed: "#9a5665",
    darkGreen: "#386464",
    lightGreen: "#669696",
  }
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
      let grade = "";
      if (edu.Grade === 1) {
        grade = "Good";
      } else if (edu.Grade === 2) {
        grade = "Very Good";
      } else if (edu.Grade === 3) {
        grade = "Excellent";
      }
      return (
        <div className="t03-edu" key={edu._id}>
          <div
            className={`t03-circle ${cvLanguage === "Ar" ? "ar" : ""}`}
            style={{backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}
          ></div>
          <p className="t03-edu-title"
             style={{color: cvColor===1 ? `${colorStyle.lightRed}` : `${colorStyle.lightGreen}`}}>
               {degree}
          </p>
          <div className="t03-edu-text">
            <p>{edu.Field}</p>
            <p>{edu.UniversityName}</p>
            <p>
              {`Grade: ${edu.DegreeFrom100}% with ${
                grade === "Excellent" ? "an" : "a"
              } ${grade} grade`}
            </p>
            <p>Graduation Date: {edu.YearEnd}</p>
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
        let gradeAr = "";
        if (edu.Grade === 1) {
          gradeAr = "جيد";
        } else if (edu.Grade === 2) {
          gradeAr = "جيد جداً";
        } else if (edu.Grade === 3) {
          gradeAr = "ممتاز";
        }
        return (
          <div className="t03-edu" key={edu._id}>
            <div
              className={`t03-circle ${cvLanguage === "Ar" ? "ar" : ""}`}
              style={{backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}
            ></div>
            <p className={`t03-edu-title ${cvLanguage === "Ar" ? "ar" : ""}`}
               style={{color: cvColor===1 ? `${colorStyle.lightRed}` : `${colorStyle.lightGreen}`}}>
              {degreeAr}
            </p>
            <div className="t03-edu-text">
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${edu.Faculty}\xa0`}</p>
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${edu.UniversityName}\xa0`}</p>
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                {`بمعدل\xa0`} :{`${edu.DegreeFrom100}%\xa0`}{`بتقدير\xa0`}{`${gradeAr}\xa0`}
              </p>
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`تاريخ\xa0التخرج\xa0`} :{`${edu.YearEnd}\xa0`}</p>
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
        <div className="t03-work" key={job._id}>
          <div
            className={`t03-circle ${cvLanguage === "Ar" ? "ar" : ""}`}
            style={{backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}
          ></div>
          <p className={`t03-work-title ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${job.Name}\xa0`}</p>
          <div className="t03-work-text">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${job.Description}\xa0`}</p>
            {cvLanguage === "Ar" ? (
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                {`لمدة\xa0`}{`${job.End - job.Start}\xa0`}
                {`${job.End - job.Start > 1 ? "سنوات" : "سنة"}\xa0`}
              </p>
            ) : (
              <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                {`for ${job.End - job.Start} 
              ${job.End - job.Start === 1 ? "year" : "years"}`}
              </p>
            )}
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
          className={`t03-course ${cvLanguage === "Ar" ? "ar" : ""}`}
          key={crs._id}
        >
          <div className="t03-circle-container">
            <div className="t03-circle"
            style={{backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}></div>
          </div>
          <div className="t03-course-text">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${crs.Name}\xa0`}</p>
          </div>
        </div>
      );
    });
  }

  let tSkills = null;
  if (technicalskills.length > 0) {
    tSkills = technicalskills.map((tskill, id) => {
      return (
        <div className="t03-t-skill" key={tskill._id}>
          <div className="t03-t-skill-name">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${tskill.Name}\xa0`}</p>
          </div>
          <div className="t03-t-skill-value">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{tskill.RateFrom100}%</p>
          </div>
          <div className="t03-t-skill-bar">
            <div className="t03-bar-container">
              <div
                className={`t03-bar bar-${id + 1}`}
                style={{ width: `${tskill.RateFrom100}%`, backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}` }}
              ></div>
            </div>
          </div>
        </div>
      );
    });
  }

  let langs = null;
  if (languages.length > 0) {
    langs = languages.map((lang, id) => {
      let langColor = cvColor===1 ? `${colorStyle.darkRed}`: `${colorStyle.darkGreen}`;
      return (
        <div className="t03-lang" key={lang._id}>
          <p className={`t03-lang-rate ${cvLanguage === "Ar" ? "ar" : ""}`}>
            {lang.RateFrom100}%
          </p>
          <p className={`t03-lang-name ${cvLanguage === "Ar" ? "ar" : ""}`}
              style={{color: lang.RateFrom100 < 40 ? langColor : 'fff'}}>
            {`${lang.Name}\xa0`}
          </p>
          <div
            className={`t03-lang-circle-wrapper ${
              cvLanguage === "Ar" ? "ar" : ""
            }`}
          >
            <div
              className={`t03-full-lang-${id + 1}`}
              style={{ width: `${lang.RateFrom100}%`,
                       backgroundColor: cvColor===1 ? `${colorStyle.lightRed}`: `${colorStyle.lightGreen}` }}
              
            ></div>
          </div>
        </div>
      );
    });
  }

  let skls = null;
  if (skills.length > 0) {
    skls = skills.map((skill) => {
      return (
        <div
          className={`t03-p-skill ${cvLanguage === "Ar" ? "ar" : ""}`}
          key={skill._id}
        >
          <div className="t03-circle-container">
            <div className="t03-circle"
            style={{backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}></div>
          </div>
          <div className="t03-p-skill-text">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage==='Ar' ? `${skill.NameAr}\xa0` : skill.Name}</p>
          </div>
        </div>
      );
    });
  }

  // Left Section
  //#region - Education Section
  let eduSection = !hidden.isEducationsHidden && edus && (
    <div className="t03-sec t03-edu-sec">
      {cvColor===1
      ?(<img src={img_05_red} alt="" />)
      :(<img src={img_05} alt="" />)
      }
      <div className={`t03-sec-content ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <h2 className={`t03-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}
           style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>
          {cvLanguage === "Ar" ? "التعليم" : "Education"}
        </h2>
        {edus}
      </div>
    </div>
  );
  //#endregion
  //#region - Work Section
  let workSection = !hidden.isExperiencesHidden && jobs && (
    <div className="t03-sec t03-work-sec">
      {cvColor===1
      ?(<img src={img_06_red} alt="" />)
      :(<img src={img_06} alt="" />)
      }
      <div className={`t03-sec-content ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <h2 className={`t03-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}
            style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>
          {cvLanguage === "Ar" ? "الخبرات" : "Work Experience"}
        </h2>
        {jobs}
      </div>
    </div>
  );
  //#endregion
  //#region - Courses Section
  let coursesSection = !hidden.isCoursesHidden && crses && (
    <div className="t03-sec t03-courses-sec">
      {cvColor===1
      ?(<img 
        className={`${cvLanguage === "Ar" ? "ar" : ""}`}
        src={img_07_red} 
        alt="" 
        />)
      :(<img 
        className={`${cvLanguage === "Ar" ? "ar" : ""}`}
        src={img_07}
        alt="" 
        />)
      }
      <div className={`t03-sec-content ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <h2 className={`t03-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}
            style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>
          {cvLanguage === "Ar" ? "الدورات\xa0التدريبية\xa0" : "Training Courses"}
        </h2>
        {crses}
      </div>
    </div>
  );
  //#endregion

  // Right Section
  //#region - Personal Skills Section
  let personalSkillsSection = skls && (
    <div className="t03-sec t03-personal-skills-sec">
      {cvColor===1
        ?(<img src={img_08_red} alt="" />)
        :(<img src={img_08} alt="" />)
      }
      <div className={`t03-sec-content ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <h2 className={`t03-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}
            style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>
          {cvLanguage === "Ar" ? "المهارات\xa0الشخصية\xa0" : "Personal Skills"}
        </h2>
        {skls}
      </div>
    </div>
  );
  //#endregion
  //#region - Technical Skills Section
  let technicalSkillsSection = !hidden.isTechnicalSkillsHidden && tSkills &&(
    <div className="t03-sec t03-tech-skills-sec">
      {cvColor===1
        ?(<img src={img_09_red} alt="" />)
        :(<img src={img_09} alt="" />)
      }
      <div className={`t03-sec-content ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <h2 className={`t03-sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}
            style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>
          {cvLanguage === "Ar" ? "المهارات\xa0التقنية\xa0" : "Technical Skills"}
        </h2>
        {tSkills}
      </div>
    </div>
  );
  //#endregion
  //#region - Languages Section
  let languagesSection = !hidden.isLanguagesHidden && langs && (
    <div className="t03-languages-sec t03-sec">
      <div className="t03-languages-title">
        <h2 className='bold' style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>
          {cvLanguage === "Ar" ? "اللغات" : "Languages"}
        </h2>
      </div>
      <div className="t03-langs">{langs}</div>
    </div>
  );
  //#endregion

  const [leftSectionList, setLeftSectionList] = useState([
    eduSection,
    workSection,
    coursesSection,
  ]);
  const [rightSectionList, setRightSectionList] = useState([
    personalSkillsSection,
    technicalSkillsSection,
    languagesSection,
  ]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    if (result.type === "Right") {
      const items = Array.from(rightSectionList);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setRightSectionList(items);
    } else if (result.type === "Left") {
      const items = Array.from(leftSectionList);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setLeftSectionList(items);
    }
  }

  function saveAs(type) {
    const pdf = document.getElementById("toPDF");
    const text = [...pdf.querySelectorAll("p")];
    const titles = [...pdf.querySelectorAll("h2")];
  
    text.map(
      (p) =>
        !p.classList.contains("lang-rate") &&
        !p.classList.contains("lang-name") &&
        (p.style.transform = "translateY(-20%)")
    );
    text.map(
      (p) =>{
        if(cvLanguage==='Ar'){
          (p.classList.contains("t03-lang-rate") ||
          p.classList.contains("t03-lang-name")) &&
          (p.style.transform = "translate(50%,-7%)")
      }else{
        (p.classList.contains("t03-lang-rate") ||
        p.classList.contains("t03-lang-name")) &&
        (p.style.transform = "translate(-50%,-7%)")
      }
    });
    text.map(
      (p) =>
        p.classList.contains("t03-detail-text") &&
        (p.style.transform = "translateY(-20%)")
    );
    text.map(
      (p) =>
        p.classList.contains("t03-info-desc-title") &&
        (p.style.transform = "translateY(-50%)")
    );
    text.map(
      (p) =>
        p.classList.contains("t03-info-desc-text") &&
        (p.style.transform = "translateY(-15%)")
    );
  
    titles.map((h2) => (h2.style.transform = "translateY(-30%)"));
  
    html2canvas(pdf, {
      dpi: 300, // Set to 300 DPI
      scale: 2, // Adjusts your resolution
      useCORS: true
    })
    .then((canvas) => {
        const filename = "template_3";
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
  
    text.map(
      (p) =>
        !p.classList.contains("t03-info-desc-text") &&
        !p.classList.contains("t03-lang-rate") &&
        !p.classList.contains("t03-lang-name") &&
        (p.style.transform = "translateY(0%)")
    );
    text.map(
      (p) =>{
        if(cvLanguage==='Ar'){
          (p.classList.contains("t03-lang-rate") ||
          p.classList.contains("t03-lang-name")) && 
          (p.style.transform = "translate(50%,0%)")
      } else {
        (p.classList.contains("t03-lang-rate") ||
        p.classList.contains("t03-lang-name")) && 
        (p.style.transform = "translate(-50%,0%)")
      }
    });
    text.map(
      (p) =>
        p.classList.contains("t03-info-desc-text") &&
        (p.style.transform = "translateY(10%)")
    );
    titles.map((h2) => (h2.style.transform = "translateY(0%)"));
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
          className={`template03-body ${cvLanguage === "Ar" ? "ar" : ""}`}
          ref={ref}
          id="toPDF"
        >
          <div className={`t03-cv-tag ${cvLanguage === "Ar" ? "ar" : ""}`}
              style={{backgroundColor: cvColor===1 ? `${colorStyle.lightRed}`: `${colorStyle.lightGreen}`}}>
            <p className={`bold ${cvLanguage === "Ar" ? "ar" : ""}`}>
              {cvLanguage === "Ar" ? "السيرة\xa0 الذاتية" : "CV"}
            </p>
          </div>

          {/* Photo Section */}
          <div className={`t03-photo ${cvLanguage === "Ar" ? "ar" : ""}`}
              style={{borderColor: cvColor===1 ? `${colorStyle.darkRed}`: `${colorStyle.darkGreen}`}}> {/* '#356767' */}
            <img src={PI.Image ? PI.Image : photo} alt="" />
          </div>

          {/* Name Section */}
          <div className="t03-name-sec">
            <h1 style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>
              {`${PI.FirstName}\xa0 ${PI.SecondName}\xa0 ${PI.LastName}\xa0`}
            </h1>
          </div>

          {/* Info Section */}
          <div className="t03-info-sec">
            <div className="t03-info-details">
              <div className="t03-detail">
                {cvColor===1 ? (<img
                  className={`t03-detail-img-1 ${cvLanguage === "Ar" ? "ar" : ""}`}
                  src={img_01_red}
                  alt=""
                />):(<img
                  className={`t03-detail-img-1 ${cvLanguage === "Ar" ? "ar" : ""}`}
                  src={img_01}
                  alt=""
                />)}
                <div className="t03-detail-p-1"
                      style={{backgroundColor: cvColor===1 ? '#2d2d49' : '#7d9d97' }}>
                  <p className="t03-detail-text">{PI.Phone} </p>
                </div>
              </div>
              <div className="t03-detail">
              {cvColor===1?
                (<img
                  className={`t03-detail-img-2 ${
                    cvLanguage === "Ar" ? "ar" : ""
                  }`}
                  src={img_02_red}
                  alt=""
                />):
                (<img
                  className={`t03-detail-img-2 ${
                    cvLanguage === "Ar" ? "ar" : ""
                  }`}
                  src={img_02}
                  alt=""
                />)}
                <div className="t03-detail-p-2"
                    style={{backgroundColor: cvColor===1 ? '#4d364a' : '#7d929d' }}>
                  <p className="t03-detail-text">{PI.Email}</p>
                </div>
              </div>
              <div className="t03-detail">
              {cvColor===1?
                (<img
                  className={`t03-detail-img-3 ${
                    cvLanguage === "Ar" ? "ar" : ""
                  }`}
                  src={img_03_red}
                  alt=""
                />):
                (<img
                  className={`t03-detail-img-3 ${
                    cvLanguage === "Ar" ? "ar" : ""
                  }`}
                  src={img_03}
                  alt=""
                />)}
                <div className="t03-detail-p-3"
                    style={{backgroundColor: cvColor===1 ? '#843d4b' : '#518699' }}>
                  {cvLanguage==='Ar' ?
                    (<p className="t03-detail-text">
                      {`${PI.NationalityAr}\xa0`} / {`${PI.CityAr}\xa0`}
                    </p>)
                    :
                    (<p className="t03-detail-text">
                    {`${PI.Nationality}\xa0`} / {`${PI.City}\xa0`}
                    </p>)
                  }
                </div>
              </div>
              <div className="t03-detail">
              {cvColor===1?
                (<img
                  className={`t03-detail-img-4 ${
                    cvLanguage === "Ar" ? "ar" : ""
                  }`}
                  src={img_04_red}
                  alt=""
                />):
                (<img
                  className={`t03-detail-img-4 ${
                    cvLanguage === "Ar" ? "ar" : ""
                  }`}
                  src={img_04}
                  alt=""
                />)}
                <div className="t03-detail-p-4"
                style={{backgroundColor: cvColor===1 ? '#4d364a' : '#7d9d97' }}>
                  <p className="t03-detail-text">{PI.Birth}</p>
                </div>
              </div>
            </div>
            <div className="t03-info-desc">
              <p className="t03-info-desc-title"
                  style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>
                {cvLanguage === "Ar" ? "الهدف\xa0الوظيفي\xa0" : "Career Objective"}
              </p>
              <p className={`t03-info-desc-text ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${CO.text}\xa0`}</p>
            </div>
          </div>

          {/* Main Section */}
          <div className="t03-main-sec">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              {/* Left */}
              {/* <div className="left"></div> */}
              <Droppable droppableId="droppable-left" type="Left">
                {(provided) => (
                  <div
                    className="t03-template03-left"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {leftSectionList.map((sec, index) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={`draggable-left-${index}`}
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
              {/* Right */}
              {/* <div className="right"> */}
              <Droppable droppableId="droppable-right" type="Right">
                {(provided) => (
                  <div
                    className="t03-right"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {rightSectionList.map((sec, index) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={`draggable-right-${index}`}
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
              {/* </div> */}
            </DragDropContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template03;
