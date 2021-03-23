import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./template_07.css";

//#region Import Images
import photo from "../../assets/imgs/template_07/00.png";
import img_01 from "../../assets/imgs/template_07/01.png";
import img_02 from "../../assets/imgs/template_07/02.png";
import img_03 from "../../assets/imgs/template_07/03.png";
import img_04 from "../../assets/imgs/template_07/04.png";
import img_05 from "../../assets/imgs/template_07/05.png";
import img_06 from "../../assets/imgs/template_07/06.png";
import img_07 from "../../assets/imgs/template_07/07.png";
import img_08 from "../../assets/imgs/template_07/08.png";
import img_09 from "../../assets/imgs/template_07/09.png";
import img_10 from "../../assets/imgs/template_07/10.png";
import img_11 from "../../assets/imgs/template_07/11.png";
import img_12 from "../../assets/imgs/template_07/12.png";
import img_13 from "../../assets/imgs/template_07/13.png";
import img_14 from "../../assets/imgs/template_07/14.png";
import img_15 from "../../assets/imgs/template_07/15.png";
import img_16 from "../../assets/imgs/template_07/16.png";
import img_17 from "../../assets/imgs/template_07/17.png";
import img_18 from "../../assets/imgs/template_07/18.png";
import img_19 from "../../assets/imgs/template_07/19.png";
import img_20 from "../../assets/imgs/template_07/20.png";
import img_21 from "../../assets/imgs/template_07/21.png";
import img_22 from "../../assets/imgs/template_07/22.png";
import img_23 from "../../assets/imgs/template_07/23.png";
import img_24 from "../../assets/imgs/template_07/24.png";
import img_25 from "../../assets/imgs/template_07/25.png";
import img_26 from "../../assets/imgs/template_07/26.png";
import img_27 from "../../assets/imgs/template_07/27.png";
import img_28 from "../../assets/imgs/template_07/28.png";
import img_29 from "../../assets/imgs/template_07/29.png";
import img_30 from "../../assets/imgs/template_07/30.png";
import img_31 from "../../assets/imgs/template_07/31.png";
import img_32 from "../../assets/imgs/template_07/32.png";
import img_33 from "../../assets/imgs/template_07/33.png";
import img_35 from "../../assets/imgs/template_07/35.png";
import img_36 from "../../assets/imgs/template_07/36.png";
import img_37 from "../../assets/imgs/template_07/37.png";
import img_38 from "../../assets/imgs/template_07/38.png";
import img_39 from "../../assets/imgs/template_07/39.png";
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

  text.map(
    (p) =>
      !p.classList.contains("t07-objective-text") &&
      // !p.classList.contains("t07-info-text") &&
      (p.style.transform = "translateY(-30%)")
  );
  text.map(
    (p) =>
      p.classList.contains("t07-year-text") &&
      (p.style.transform = "translateY(-50%)")
  );

  html2canvas(pdf, {
    dpi: 300, // Set to 300 DPI
    scale: 2, // Adjusts your resolution
    useCORS: true
  })
    .then((canvas) => {
      const filename = "template_7";
      if(type==='PDF'){
        var img = canvas.toDataURL("image/jpeg", 1);
        var doc = new jsPDF("p", "mm", "a4");
        doc.addImage(img, "JPEG", -2, 0, 212, 298);
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
      !p.classList.contains("objective-text") &&
      (p.style.transform = "translateY(0%)")
  );
}

function chunkArray(myArray, chunk_size) {
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    let myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }

  return tempArray;
}

const ref = React.createRef();
const Template07 = (props) => {
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
        <div
          className={`t07-edu ${cvLanguage === "Ar" ? "ar" : ""} `}
          key={edu._id}
        >
          <div className="t07-edu-img">
            <img src={img_17} alt="" />
          </div>
          <div className="t07-edu-circle">
            <div className="t07-circle"></div>
          </div>
          <div className="t07-edu-degree">
            <p>
              {degree} in {edu.Faculty}
            </p>
          </div>
          <div className="t07-edu-school">
            <p>{edu.UniversityName}</p>
          </div>
          <div className="t07-edu-grade">
            <p>Grade: {grade}</p>
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
          <div
            className={`t07-edu ${cvLanguage === "Ar" ? "ar" : ""} `}
            key={edu._id}
          >
            <div className="t07-edu-img">
              <img src={img_17} alt="" />
            </div>
            <div className="t07-edu-circle">
              <div className="circle"></div>
            </div>
            <div className="t07-edu-degree">
               <p  className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                {`${degreeAr}\xa0${edu.Faculty}\xa0`}
              </p>
            </div>
            <div className="t07-edu-school">
               <p  className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${edu.UniversityName}\xa0`}</p>
            </div>
            <div className="t07-edu-grade">
               <p  className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`التقدير\xa0`} :{`${gradeAr}\xa0`}</p>
            </div>
          </div>
        );
      });
    }
  }

  let workRows = null;
  if (experiences.length > 0) {
    let groupedArray = chunkArray(experiences, 3);

    workRows = groupedArray.map((row, index) => {
      let works = row.map((job) => {
        return (
          <div className="t07-work" key={job._id}>
            <div className="t07-work-year">
              <p className={`t07-year-text ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${job.Start}\xa0`}- {`${job.End}\xa0`}</p>
            </div>
            <div className="t07-work-co">
               <p  className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${job.Description}\xa0`}</p>
            </div>
            <div className="t07-work-pos">
               <p  className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${job.Name}\xa0`}</p>
            </div>
          </div>
        );
      });
      return (
        <div className="t07-work-row" key={index}>
          {works}
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
          className={`t07-course ${cvLanguage === "Ar" ? "ar" : ""} `}
          key={crs._id}
        >
          <div className="t07-course-bullet">
            <div className="t07-bullet">
              <div className="t07-dash"></div>
              <div className="t07-circle"></div>
            </div>
          </div>
          <div className="t07-course-name">
             <p  className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${crs.Name}\xa0`}</p>
          </div>
          <div className="t07-course-co">
             <p  className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${crs.Description}\xa0`}</p>
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
        rate.push(<img src={img_30} alt="" key={Math.random()} />);
      }
      for (let i = 0; i < 5 - lang.Rate; i++) {
        rate.push(<img src={img_31} alt="" key={Math.random()} />);
      }

      return (
        <div className="t07-lang" key={lang._id}>
          <div className="t07-lang-name">
            <p className={`t07-lang-text ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${lang.Name}\xa0`}</p>
          </div>
          <div className="t07-lang-rate">{rate}</div>
        </div>
      );
    });
  }

  const allSkills = {
    'Time Managment': img_21,
    'TeamWork': img_22,
    'Problem solving': img_23,
    'MS4': img_24,
    'Self Development': img_25,
    'Office Programs': img_26,
    'Leadership and Organisation': img_27,
    'Work under pressure': img_28,
    'Computer Proficiency': img_29,
  };
  let skls = null;
  if (skills.length > 0) {
    skls = skills.map((skill) => {
      let skillLogo = allSkills[skill.Name];
      return (
        <div className="t07-skill" key={skill._id}>
          <div className="t07-skill-logo">
            <div className="t07-skill-logo-bg">
              <img src={skillLogo} alt="" />
            </div>
          </div>
          <div className="t07-skill-name">
             <p  className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage==='Ar' ? `${skill.NameAr}\xa0` : skill.Name}</p>
          </div>
        </div>
      );
    });
  }

  //#region - Education + Work Section
  const eduTitle = !hidden.isEducationsHidden && edus && (
    <>
      <div className="t07-sec-logo t07-edu-sec-logo">
        <img src={img_09} alt="" />
      </div>
      <div
        className={`t07-sec-title t07-edu-sec-title ${
          cvLanguage === "Ar" ? "ar" : ""
        } `}
      >
        <div className="t07-title">
          <p  className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "المؤهلات\xa0العلمية\xa0" : "Education"}</p>
        </div>
        <div className="t07-sec-arrow">
          <img src={img_14} alt="arrow-down" />
        </div>
      </div>
    </>
  );

  const workTitle = !hidden.isExperiencesHidden && workRows && (
    <>
      <div className="t07-sec-logo t07-work-sec-logo">
        <img src={img_10} alt="" />
      </div>
      <div
        className={`t07-sec-title t07-work-sec-title ${
          cvLanguage === "Ar" ? "ar" : ""
        } `}
      >
        <div className="t07-title">
           <p  className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "الخبرات\xa0العملية\xa0" : "Experience"}</p>
        </div>
        <div className="t07-sec-arrow">
          <img src={img_15} alt="arrow-up" />
        </div>
      </div>
    </>
  );

  let expSection = (
    <div className={`t07-sec t07-exp-sec ${cvLanguage === "Ar" ? "ar" : ""} `}>
      {eduTitle}

      {/* Body */}
      <div className={`t07-sec-body ${cvLanguage === "Ar" ? "ar" : ""} `}>
        {!hidden.isEducationsHidden && edus && (
          <div className={`t07-edu-body ${cvLanguage === "Ar" ? "ar" : ""} `}>
            <img className="t07-edu-sec-img" src={img_16} alt="" />
            {edus}
          </div>
        )}
        <div className="t07-sec-half">
          <div className="t07-grey"></div>
          <div className="t07-dark-grey"></div>
          <div className="t07-grey"></div>
          <div className="t07-dark-grey"></div>
          <div className="t07-grey"></div>
          <div className="t07-dark-grey"></div>
          <div className="t07-grey"></div>
        </div>
        {!hidden.isExperiencesHidden && workRows && (
          <div
            className={`t07-work-body ${cvLanguage === "Ar" ? "ar" : ""} `}
            id="workBody"
          >
            {experiences.length === 0 ? null : experiences.length === 1 ? (
              <img className="t07-work-sec-bg-img" src={img_35} alt="" />
            ) : experiences.length === 2 ? (
              <img className="t07-work-sec-bg-img" src={img_36} alt="" />
            ) : experiences.length === 3 ? (
              <img className="t07-work-sec-bg-img" src={img_37} alt="" />
            ) : experiences.length === 4 ? (
              <img className="t07-work-sec-bg-img" src={img_38} alt="" />
            ) : (
              <img className="t07-work-sec-bg-img" src={img_39} alt="" />
            )}
            <img className="t07-work-sec-img" src={img_19} alt="" />
            {workRows}
          </div>
        )}
      </div>

      {workTitle}
    </div>
  );
  //#endregion
  //#region - Languages Section
  let languagesSection = !hidden.isLanguagesHidden && langs && (
    <div className={`t07-sec t07-lang-sec ${cvLanguage === "Ar" ? "ar" : ""} `}>
      <div className="t07-sec-logo">
        <img src={img_13} alt="" />
      </div>
      <div className={`t07-sec-title ${cvLanguage === "Ar" ? "ar" : ""} `}>
        <div className="t07-title">
           <p  className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "اللغات" : "Languages"}</p>
        </div>
        <div className="t07-sec-arrow">
          <img src={img_14} alt="arrow-down" />
        </div>
      </div>
      <div className={`t07-sec-body ${cvLanguage === "Ar" ? "ar" : ""} `}>
        {langs}
      </div>
    </div>
  );
  //#endregion
  //#region - Courses Section
  let coursesSection = !hidden.isCoursesHidden && crses && (
    <div className={`t07-sec t07-course-sec ${cvLanguage === "Ar" ? "ar" : ""} `}>
      <div className="t07-sec-logo">
        <img src={img_11} alt="" />
      </div>
      <div className={`t07-sec-title ${cvLanguage === "Ar" ? "ar" : ""} `}>
        <div className="t07-title">
           <p  className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "الدورات\xa0التدريبية\xa0" : "Courses"}</p>
        </div>
        <div className="t07-sec-arrow">
          <img src={img_14} alt="arrow-down" />
        </div>
      </div>
      <div className={`t07-sec-body ${cvLanguage === "Ar" ? "ar" : ""} `}>
        <div className="t07-sec-img">
          <img src={img_20} alt="" />
        </div>
        <div className="t07-sec-content">
          {courses.length <= 5 ? (
            <img
              className="t07-course-sec-bg"
              src={img_33}
              alt=""
              style={{ width: "50%" }}
            />
          ) : (
            <img className="t07-course-sec-bg" src={img_32} alt="" />
          )}

          {crses}
        </div>
      </div>
    </div>
  );
  //#endregion
  //#region - Skills Section
  let skillsSection = skls && (
    <div className={`t07-sec t07-skills-sec ${cvLanguage === "Ar" ? "ar" : ""} `}>
      <div className="t07-sec-logo">
        <img src={img_12} alt="" />
      </div>
      <div className={`t07-sec-title ${cvLanguage === "Ar" ? "ar" : ""} `}>
        <div className="t07-title">
           <p  className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "المهارات" : "Skills"}</p>
        </div>
        <div className="t07-sec-arrow">
          <img src={img_14} alt="arrow-down" />
        </div>
      </div>
      <div className={`t07-sec-body ${cvLanguage === "Ar" ? "ar" : ""} `}>
        {skls}
      </div>
    </div>
  );
  //#endregion

  const [mainSectionList, setMainSectionList] = useState([
    expSection,
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
        <div
          className={`template07-body ${cvLanguage === "Ar" ? "ar" : ""} `}
          ref={ref}
          id="toPDF"
        >
          {/* Header Section */}
          <div className={`t07-header-sec ${cvLanguage === "Ar" ? "ar" : ""} `}>
            {/* Photo */}
            <div className="t07-photo">
              <div className="t07-photo-bg">
                <img src={PI.Image ? PI.Image : photo} alt="" />
              </div>
            </div>

            {/* Name */}
            <div className="t07-name">
               <p  className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>
                {`${PI.FirstName}\xa0 ${PI.SecondName}\xa0 ${PI.LastName}\xa0`}
              </p>
            </div>

            {/* Details */}
            <div className="t07-details">
              <div className={`t07-detail ${cvLanguage === "Ar" ? "ar" : ""} `}>
                <div className="t07-detail-logo">
                  <img className="t07-detail-logo-1" src={img_01} alt="" />
                </div>
                <div className="t07-detail-text">
                  <p className="t07-info-text">{PI.Email}</p>
                </div>
              </div>
              <div className={`t07-detail ${cvLanguage === "Ar" ? "ar" : ""} `}>
                <div className="t07-detail-logo">
                  <img className="t07-detail-logo-2" src={img_02} alt="" />
                </div>
                <div className="t07-detail-text">
                  <p className="t07-info-text">{PI.Birth}</p>
                </div>
              </div>
              <div className={`t07-detail ${cvLanguage === "Ar" ? "ar" : ""} `}>
                <div className="t07-detail-logo">
                  <img className="t07-detail-logo-3" src={img_03} alt="" />
                </div>
                <div className="t07-detail-text">
                  <p className="t07-info-text">{PI.Phone}</p>
                </div>
              </div>
              <div className={`t07-detail ${cvLanguage === "Ar" ? "ar" : ""} `}>
                <div className="t07-detail-logo">
                  <img className="t07-detail-logo-4" src={img_04} alt="" />
                </div>
                <div className="t07-detail-text">
                  <p className="t07-info-text">{`${PI.City}\xa0`}</p>
                </div>
              </div>
              <div className={`t07-detail ${cvLanguage === "Ar" ? "ar" : ""} `}>
                <div className="t07-detail-logo">
                  <img className="t07-detail-logo-5" src={img_05} alt="" />
                </div>
                <div className="t07-detail-text">
                {cvLanguage === 'Ar' ? 
                  (<p className="t01-info-status">{PI.MaritalStatus == 1 ? 'متزوج' : 'أعزب'}</p>)
                  :
                  (<p className="t01-info-status">{PI.MaritalStatus == 1 ? 'Married' : 'Single'}</p>)
                }
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="t07-location">
              <div className="t07-loc-data">
                <div className={`t07-loc ${cvLanguage === "Ar" ? "ar" : ""} `}>
                  <div className="t07-loc-icon">
                    <img className="t07-flag" src={img_06} alt="" />
                  </div>
                  <div className="t07-loc-text">
                    <p className={`t07-info-text ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${PI.Nationality}\xa0`}</p>
                  </div>
                </div>
              </div>
              <img className="t07-world" src={img_07} alt="" />
            </div>
          </div>

          {/* Career Objective Section */}
          <div className="t07-objective-sec">
            <div className="t07-sec-logo">
              <img src={img_08} alt="" />
            </div>
            <div className="t07-sec-name">
              <p className={`bold ${cvLanguage === "Ar" ? "ar" : ""}`}>
                {cvLanguage === "Ar" ? "الهدف\xa0الوظيفي\xa0" : "Career Objective"}
              </p>
            </div>
            <div className={`t07-sec-text ${cvLanguage==='Ar'?'ar':''}`}>
              <p className={`t07-objective-text bold ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${CO.text}\xa0`}</p>
            </div>
          </div>

          {/* Main Sections */}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable-main" type="Main">
              {(provided) => (
                <div
                  className="t07-main-sec"
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

export default Template07;
