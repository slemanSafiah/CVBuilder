import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./template_01.css";

//#region Import Images
import img_00 from "../../assets/imgs/template_01/Layer_13.png";
import img_01 from "../../assets/imgs/template_01/01.png";
import img_02 from "../../assets/imgs/template_01/02.png";
import img_03 from "../../assets/imgs/template_01/03.png";
import img_04 from "../../assets/imgs/template_01/04.png";
import img_05 from "../../assets/imgs/template_01/05.png";
import img_06 from "../../assets/imgs/template_01/06.png";
import img_07 from "../../assets/imgs/template_01/07.png";
import img_08 from "../../assets/imgs/template_01/08.png";
import img_09 from "../../assets/imgs/template_01/09.png";
import img_10 from "../../assets/imgs/template_01/10.png";
//#endregion

function downloadImage(data, filename = 'untitled.jpeg') {
  var a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

function saveAs(type) {
  const filename = "template_1.pdf";
  const pdf = document.getElementById("toPDF");
  const name = [...pdf.querySelectorAll("h1")][0];
  const titles = [...pdf.querySelectorAll("h3")];
  const texts = [...pdf.querySelectorAll("p")];
  const infos = [...pdf.querySelectorAll("p.t01-info-status")];

  name.style.transform = "translateY(-30%)";
  titles.map((t) => (t.style.paddingBottom = "5%"));
  texts.map((p) => (p.style.transform = "translateY(-30%)"));
  infos.map((sp) => (sp.style.transform = "translateY(-15%)"));

  html2canvas(pdf, {
    dpi: 300, // Set to 300 DPI
    scale: 2, // Adjusts your resolution
    letterRendering: 1,
    useCORS: true
  })
    .then((canvas) => {
      if(type==='PDF'){
        var img = canvas.toDataURL("image/jpeg", 1);
        var doc = new jsPDF("p", "mm", "a4");
        doc.addImage(img, "JPEG", -4, 0, 215, 298);
        doc.save(filename);
      }
      else if(type==='PNG'){
        let imageURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        downloadImage(imageURL, 'template_1.png');
      }
      else {
        let imageURL = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        downloadImage(imageURL, 'template_1.jpeg');
      }
    })
    .catch((err) => console.log(err));


    
  name.style.transform = "translateY(0%)";
  titles.map((t) => (t.style.paddingBottom = "0px"));
  texts.map((p) => (p.style.transform = "translateY(0%)"));
  infos.map((sp) => (sp.style.transform = "translateY(0%)"));
}

const ref = React.createRef();

const Template01 = (props) => {
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
      let grade = "";
      if (edu.Grade === 1) {
        grade = "Good";
      } else if (edu.Grade === 2) {
        grade = "Very Good";
      } else if (edu.Grade === 3) {
        grade = "Excellent";
      }
      return (
        <div className="t01-edu" key={edu._id}>
          <p>
            {degree} in {edu.Faculty}
          </p>
          <p>{edu.UniversityName}</p>
          <p>University Grade: {grade}</p>
          <p>Graduate year: {edu.YearEnd}</p>
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
          <div
            className={`t01-edu ${cvLanguage === "Ar" ? "ar" : ""}`}
            key={edu._id}
          >
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
              {`${degreeAr}\xa0`} {`${edu.Faculty}\xa0`}
            </p>
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${edu.UniversityName}\xa0`}</p>
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`التقدير\xa0`} :{`${gradeAr}\xa0`}</p>
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`سنة\xa0التخرج\xa0`} :{`${edu.YearEnd}\xa0`}</p>
          </div>
        );
      });
    }
  }

  let jobs = null;
  if (experiences.length > 0) {
    jobs = experiences.map((job) => {
      return (
        <div className="t01-work" key={job._id}>
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
            {`${job.Start}\xa0`}- {`${job.End}\xa0`}
          </p>
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
            {`${job.Name}\xa0`}- {`${job.Description}\xa0`}
          </p>
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
  let photo = PI.Image ? PI.Image : img_00

  let crses = null;
  if (courses.length > 0) {
    crses = courses.map((crs) => {
      return (
        <div className="t01-course" key={crs._id}>
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${crs.Name}\xa0`}</p>
        </div>
      );
    });
  }

  let langs = null;
  if (languages.length > 0) {
    langs = languages.map((lang, index) => {
      let rate = [];
      for (let i = 0; i < lang.Rate; i++) {
        rate.push(<div className="t01-circle" key={Math.random()}></div>);
      }
      for (let i = 0; i < 5 - lang.Rate; i++) {
        rate.push(<div className="t01-circle t01-empty" key={Math.random()}></div>);
      }
      return (
        <div className="t01-lang" key={lang._id}>
          <p className={`t01-lang-name ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${lang.Name}\xa0`}</p>
          <div className="t01-lang-rate">{rate}</div>
        </div>
      );
    });
  }

  let skls = null;
  if (skills.length > 0) {
    skls = skills.map((skill) => {
      return <p className='t01-skill' key={skill._id}>
                {cvLanguage==='Ar' ? `${skill.NameAr}\xa0` : skill.Name}
              </p>;
    });
  }

  // Left Section
  //#region - Personal Info Section
  let personalInfoSection = (
    <div className="t01-personal-info t01-sec">
      <h3 className={`t01-sec-title bold ${cvLanguage === "Ar" ? "ar" : ""} `}>
        {cvLanguage === "Ar" ? "المعلومات\xa0الشخصية" : "Personal Information"}
      </h3>
      <div className="t01-info-details">
        <div className="t01-info-logo">
          <div className="t01-info-icon-bg">
            <img className="t01-info-icon-1" src={img_01} alt="home_icon" />
          </div>
        </div>
        <p className="t01-info-status">{`${PI.City}\xa0`}</p>
      </div>
      <div className="t01-info-details">
        <div className="t01-info-logo">
          <div className="t01-info-icon-bg">
            <img className="t01-info-icon-2" src={img_02} alt="phone_icon" />
          </div>
        </div>
        <p className="t01-info-status bold">{PI.Phone}</p>
      </div>
      <div className="t01-info-details">
        <div className="t01-info-logo">
          <div className="t01-info-icon-bg">
            <img className="t01-info-icon-3" src={img_03} alt="envelope_icon" />
          </div>
        </div>
        <p className="t01-info-status bold">{PI.Email}</p>
      </div>
      <div className="t01-info-details">
        <div className="t01-info-logo">
          <div className="t01-info-icon-bg">
            <img className="t01-info-icon-4" src={img_04} alt="date_icon" />
          </div>
        </div>
        <p className="t01-info-status bold">{PI.Birth}</p>
      </div>
      <div className="t01-info-details">
        <div className="t01-info-logo">
          <div className="t01-info-icon-bg">
            <img className="t01-info-icon-5" src={img_05} alt="globe_icon" />
          </div>
        </div>
        <p className="t01-info-status">{`${PI.Nationality}\xa0`}</p>
      </div>
      <div className="t01-info-details">
        <div className="t01-info-logo">
          <div className="t01-info-icon-bg">
            <img className="t01-info-icon-6" src={img_06} alt="couple_icon" />
          </div>
        </div>
        {cvLanguage === 'Ar' ? 
          (<p className="t01-info-status">{PI.MaritalStatus == 1 ? 'متزوج' : 'أعزب'}</p>)
          :
          (<p className="t01-info-status">{PI.MaritalStatus == 1 ? 'Married' : 'Single'}</p>)
        }
      </div>
    </div>
  );
  //#endregion
  //#region - Skills Section
  let skillSection = skls && (
    <div className="t01-skills t01-sec">
      <h3 className={`t01-sec-title bold ${cvLanguage === "Ar" ? "ar" : ""} `}>
        {cvLanguage === "Ar" ? "المهارات" : "Skills"}
      </h3>
      {skls}
    </div>
  );
  //#endregion
  //#region - Languages Section
  let languageSection = !hidden.isLanguagesHidden && langs && (
    <div className="t01-languages t01-sec">
      <h3 className={`t01-sec-title bold ${cvLanguage === "Ar" ? "ar" : ""} `}>
        {cvLanguage === "Ar" ? "اللغات" : "Languages"}
      </h3>
      {langs}
    </div>
  );
  //#endregion

  // Main Section
  //#region - Objective Career Section
  let objectiveSection = CO.text && (
    <div className={`t01-main-sec ${cvLanguage === "Ar" ? "ar" : ""} `}>
      <div className={`t01-icon ${cvLanguage === "Ar" ? "ar" : ""} `}>
        <img className="t01-target" src={img_07} alt="hat_img" />
      </div>
      <div className={`t01-sec-title bold ${cvLanguage === "Ar" ? "ar" : ""} `}>
        <h3>
          {cvLanguage === "Ar" ? "الهدف\xa0الوظيفي" : "Career Objective"}
        </h3>
      </div>
      <div className="t01-sec-body">
        <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${CO.text}\xa0`}</p>
      </div>
    </div>
  );
  //#endregion
  //#region - Education Section
  let eduSection = !hidden.isEducationsHidden && edus && (
    <div
      className={`t01-education t01-main-sec ${cvLanguage === "Ar" ? "ar" : ""} `}
    >
      <div className={`t01-icon ${cvLanguage === "Ar" ? "ar" : ""} `}>
        <img className="t01-hat" src={img_08} alt="hat_img" />
      </div>
      <div className={`t01-sec-title bold ${cvLanguage === "Ar" ? "ar" : ""} `}>
        <h3>{cvLanguage === "Ar" ? "المؤهلات\xa0العلمية" : "Education"}</h3>
      </div>
      <div className="t01-sec-body">{edus}</div>
    </div>
  );
  //#endregion
  //#region - Work Section
  let workSection = !hidden.isExperiencesHidden && jobs && (
    <div className={`t01-works t01-main-sec ${cvLanguage === "Ar" ? "ar" : ""} `}>
      <div className={`t01-icon ${cvLanguage === "Ar" ? "ar" : ""} `}>
        <img className="t01-briefcase" src={img_09} alt="briefcase_img" />
      </div>
      <div className={`t01-sec-title bold ${cvLanguage === "Ar" ? "ar" : ""} `}>
        <h3>
          {cvLanguage === "Ar" ? "الخبرات\xa0العملية" : "Work Experience"}
        </h3>
      </div>
      <div className="t01-sec-body">{jobs}</div>
    </div>
  );
  //#endregion
  //#region - Courses Section
  let coursesSection = !hidden.isCoursesHidden && crses && (
    <div className={`t01-courses t01-main-sec ${cvLanguage === "Ar" ? "ar" : ""} `}>
      <div className={`t01-icon ${cvLanguage === "Ar" ? "ar" : ""} `}>
        <img className="t01-cert" src={img_10} alt="certificate_img" />
      </div>
      <div className={`t01-sec-title bold ${cvLanguage === "Ar" ? "ar" : ""} `}>
        <h3>
          {cvLanguage === "Ar" ? "الدورات\xa0التدريبية" : "Training Courses"}
        </h3>
      </div>
      <div className="t01-sec-body">{crses}</div>
    </div>
  );
  //#endregion

  const [mainSectionList, setMainSectionList] = useState([
    objectiveSection,
    eduSection,
    workSection,
    coursesSection,
  ]);
  const [leftSectionList, setLeftSectionList] = useState([
    personalInfoSection,
    skillSection,
    languageSection,
  ]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    // console.log(result);

    if (result.type === "Main") {
      const items = Array.from(mainSectionList);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setMainSectionList(items);
    } else if (result.type === "Left") {
      const items = Array.from(leftSectionList);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setLeftSectionList(items);
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
          className={`template01-body ${cvLanguage === "Ar" ? "ar" : ""} `}
          ref={ref}
          id="toPDF"
        >
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className={`t01-left ${cvLanguage==='Ar'?'ar':''}`}>
              <div className="t01-photo">
                <img
                  className={`t01-personal-info-icon ${
                    cvLanguage === "Ar" ? "ar" : ""
                  } `}
                  src={photo}
                  alt="personal_photo"
                  crossOrigin="anonymous"
                />
              </div>
              <Droppable droppableId="droppable-leftSection" type="Left">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
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
            </div>

            <div className="t01-right">
              {/* Header */}
              <div className="t01-header">
                <h1>
                  {`${PI.FirstName}\xa0 ${PI.SecondName}\xa0 ${PI.LastName}\xa0`}
                </h1>
              </div>

              {/* Main Section */}
              <Droppable droppableId="droppable-main" type="Main">
                {(provided) => (
                  <div
                    className={`t01-main ${cvLanguage === "Ar" ? "ar" : ""} `}
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
            </div>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default Template01;
