import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./template_04.css";

//#region Import Images
import photo from "../../assets/imgs/template_04/00.png";
import img_01 from "../../assets/imgs/template_04/01.png";
import img_02 from "../../assets/imgs/template_04/02.png";
import img_03 from "../../assets/imgs/template_04/03.png";
import img_04 from "../../assets/imgs/template_04/04.png";
import img_05 from "../../assets/imgs/template_04/05.png";
import img_06 from "../../assets/imgs/template_04/06.png";
import img_07 from "../../assets/imgs/template_04/07.png";
import img_08 from "../../assets/imgs/template_04/08.png";
import img_09 from "../../assets/imgs/template_04/09.png";
import img_10 from "../../assets/imgs/template_04/10.png";
import img_11 from "../../assets/imgs/template_04/11.png";
import img_12 from "../../assets/imgs/template_04/12.png";
//#endregion

function downloadImage(data, filename = 'untitled.jpeg') {
  var a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}


const ref = React.createRef();
const Template04 = (props) => {
  const {
    educations,
    experiences,
    languages,
    courses,
    careerobjective,
    personalInformation,
    memberships,
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
          className={`t04-edu ${cvLanguage === "Ar" ? "ar" : ""}`}
          key={edu._id}
        >
          <div
            className={`t04-circle ${cvLanguage === "Ar" ? "ar" : ""}`}
          ></div>
          <p className={`t04-edu-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
            {degree} {edu.Faculty}
          </p>
          <div className={`t04-edu-content ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <div className="t04-edu-circle">
              <div className="t04-circle-dark"></div>
            </div>
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{edu.UniversityName}</p>
          </div>
          <div className={`t04-edu-content ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <div className="t04-edu-circle">
              <div className="t04-circle-dark"></div>
            </div>
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>GPA: {edu.DegreeFrom5}</p>
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
            className={`t04-edu ${cvLanguage === "Ar" ? "ar" : ""}`}
            key={edu._id}
          >
            <div
              className={`t04-circle ${cvLanguage === "Ar" ? "ar" : ""}`}
            ></div>
            <p className={`t04-edu-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
              {`${degreeAr}\xa0`}{`في\xa0`}{`${edu.Faculty}\xa0`}
            </p>
            <div
              className={`t04-edu-content ${cvLanguage === "Ar" ? "ar" : ""}`}
            >
              <div className="t04-edu-circle">
                <div className="t04-circle-dark"></div>
              </div>
              <p className={`t04-edu-text ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${edu.UniversityName}\xa0`}</p>
            </div>
            <div
              className={`t04-edu-content ${cvLanguage === "Ar" ? "ar" : ""}`}
            >
              <div className="t04-edu-circle">
                <div className="t04-circle-dark"></div>
              </div>
              <p className={`t04-edu-text ${cvLanguage === "Ar" ? "ar" : ""}`}>{`المعدل\xa0التراكمي\xa0`} :{`${edu.DegreeFrom5}\xa0`}</p>
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
        <div
          className={`t04-work ${cvLanguage === "Ar" ? "ar" : ""}`}
          key={job._id}
        >
          <div
            className={`t04-circle ${cvLanguage === "Ar" ? "ar" : ""}`}
          ></div>
          <p className={`t04-work-text ${cvLanguage === "Ar" ? "ar" : ""}`}>
            {`${job.Name}\xa0`}- {`${job.Description}\xa0`}{`${job.Start}\xa0`}- {`${job.End}\xa0`}
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

  let crses = null;
  if (courses.length > 0) {
    crses = courses.map((crs) => {
      return (
        <div
          className={`t04-course ${cvLanguage === "Ar" ? "ar" : ""}`}
          key={crs._id}
        >
          <div
            className={`t04-circle ${cvLanguage === "Ar" ? "ar" : ""}`}
          ></div>
          <p className='' className={`t04-course-text ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${crs.Name}\xa0`}</p>
        </div>
      );
    });
  }

  let langs = null;
  if (languages.length > 0) {
    langs = languages.map((lang) => {
      let rate = [];
      for (let i = 0; i < lang.Rate; i++) {
        rate.push(<div className="t04-lang-circle" key={Math.random()}></div>);
      }
      for (let i = 0; i < 6 - lang.Rate; i++) {
        rate.push(
          <div className="t04-lang-circle t04-empty" key={Math.random()}></div>
        );
      }

      return (
        <div className="t04-lang" key={lang._id}>
          <div className="t04-lang-name">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${lang.Name}\xa0`}</p>
          </div>
          <div className="t04-lang-rate">{rate}</div>
        </div>
      );
    });
  }

  let mems = null;
  if (memberships.length > 0) {
    mems = memberships.map((member) => {
      return (
        <div
          className={`t04-part ${cvLanguage === "Ar" ? "ar" : ""}`}
          key={member._id}
        >
          <div
            className={`t04-circle ${cvLanguage === "Ar" ? "ar" : ""}`}
          ></div>
          <p className={`t04-member-text ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${member.Name}\xa0`}</p>
        </div>
      );
    });
  }

  const allSkills = {
    'Time Managment': img_04,
    'Computer Proficiency': img_05,
    'Leadership and Organisation': img_06,
    'Work under pressure': img_07,
    'MS5': img_08,
    'Problem solving': img_09,
    'Self Development': img_10,
    'Office Programs': img_11,
    'TeamWork': img_12,
  };
  let skls = null;
  if (skills.length > 0) {
    skls = skills.map((skill, id) => {
      let skillLogo = allSkills[skill.Name];

      return (
        <div className="t04-skill" key={skill._id}>
          <div className="t04-skill-logo">
            <img className={`t04-skill-logo-${id + 1}`} src={skillLogo} alt="" />
          </div>
          <div className="t04-skill-name">
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage==='Ar' ? `${skill.NameAr}\xa0` : skill.Name}</p>
          </div>
        </div>
      );
    });
  }

  // Left Section
  //#region - Career Objective Section
  let objectiveSection = CO.text && (
    <div className={`t04-sec t04-objective-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      <div className={`t04-sec-title bold ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "الهدف\xa0الوظيفي\xa0" : "Objective Career"}</p>
      </div>
      <div className="t04-sec-body">
        <p className='' className={`t04-co-text ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${CO.text}\xa0`}</p>
      </div>
    </div>
  );
  //#endregion
  //#region - Personal Info Section
  let commSection = (
    <div className={`t04-sec t04-comm-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      <div className={`t04-sec-title bold ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "التواصل" : "Communication"}</p>
      </div>
      <div className="t04-sec-body">
        <div className="t04-comm">
          <div className="t04-comm-logo">
            <div className="t04-comm-logo-bg">
              <img className="t04-comm-logo-1" src={img_01} alt="" />
            </div>
          </div>
          <div className={`t04-comm-name ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className={`t04-comm-name-1 ${cvLanguage === "Ar" ? "ar" : ""}`}>{PI.Email}</p>
          </div>
        </div>
        <div className="t04-comm">
          <div className="t04-comm-logo">
            <div className="t04-comm-logo-bg">
              <img className="t04-comm-logo-2" src={img_02} alt="" />
            </div>
          </div>
          <div className={`t04-comm-name ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className={`t04-comm-name-2 ${cvLanguage === "Ar" ? "ar" : ""}`}>{PI.Phone}</p>
          </div>
        </div>
        <div className="t04-comm">
          <div className="t04-comm-logo">
            <div className="t04-comm-logo-bg">
              <img className="t04-comm-logo-3" src={img_03} alt="" />
            </div>
          </div>
          <div className={`t04-comm-name ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className={`t04-comm-name-3 ${cvLanguage === "Ar" ? "ar" : ""}`}>
              {`${PI.Nationality}\xa0`}- {`${PI.City}\xa0`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  //#endregion
  //#region - Personal Skills Section
  let skillsSection = skls && (
    <div className={`t04-sec t04-skill-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      <div className={`t04-sec-title bold ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "المهارات" : "Skills"}</p>
      </div>
      <div className="t04-sec-body">{skls}</div>
    </div>
  );
  //#endregion
  //#region - Languages Section
  let languagesSection = !hidden.isLanguagesHidden && langs && (
    <div className={`t04-sec t04-lang-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
      <div className={`t04-sec-title bold ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{cvLanguage === "Ar" ? "اللغة" : "Languages"}</p>
      </div>
      <div className="t04-sec-body">{langs}</div>
    </div>
  );
  //#endregion

  // Right Section
  //#region - Education Section
  let eduSection = !hidden.isEducationsHidden && edus && (
    <div className={`t04-main-sec t04-edu-sec ${cvLanguage==='Ar'?'ar':''}`}>
      <div className="t04-main-sec-title">
        <div className={`t04-title-back-bg ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <div className="t04-title-front-bg"></div>
          <p className={`t04-title bold ${cvLanguage === "Ar" ? "ar" : ""}`}>
            {cvLanguage === "Ar" ? "المؤهلات\xa0العلمية\xa0" : "Education"}
          </p>
        </div>
      </div>
      <div className="t04-main-sec-body t04-edu-body">{edus}</div>
    </div>
  );
  //#endregion
  //#region - Work Section
  let workSection = !hidden.isExperiencesHidden && jobs && (
    <div className={`t04-main-sec t04-work-sec ${cvLanguage==='Ar'?'ar':''}`}>
      <div className="t04-main-sec-title">
        <div className={`t04-title-back-bg ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <div className="t04-title-front-bg"></div>
          <p className={`t04-title bold ${cvLanguage === "Ar" ? "ar" : ""}`}>
            {cvLanguage === "Ar" ? "الخبرات\xa0العملية\xa0" : "Work Experience"}
          </p>
        </div>
      </div>
      <div className="t04-main-sec-body">{jobs}</div>
    </div>
  );
  //#endregion
  //#region - Courses Section
  let coursesSection = !hidden.isCoursesHidden && crses && (
    <div className={`t04-main-sec t04-course-sec ${cvLanguage==='Ar'?'ar':''}`}>
      <div className="t04-main-sec-title">
        <div className={`t04-title-back-bg ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <div className="t04-title-front-bg"></div>
          <p className={`t04-title bold ${cvLanguage === "Ar" ? "ar" : ""}`}>
            {cvLanguage === "Ar" ? "الدورات\xa0التدريبية\xa0" : "Training Courses"}
          </p>
        </div>
      </div>
      <div className="t04-main-sec-body">{crses}</div>
    </div>
  );
  //#endregion
  //#region - Memberships Section
  let membershipsSection = !hidden.isMembershipsHidden && mems && (
    <div className={`t04-main-sec t04-part-sec ${cvLanguage==='Ar'?'ar':''}`}>
      <div className="t04-main-sec-title">
        <div className={`t04-title-back-bg ${cvLanguage === "Ar" ? "ar" : ""}`}>
          <div className="t04-title-front-bg"></div>
          <p className={`t04-title bold ${cvLanguage === "Ar" ? "ar" : ""}`}>
            {cvLanguage === "Ar" ? "العضويات" : "Memberships"}
          </p>
        </div>
      </div>
      <div className="t04-main-sec-body">{mems}</div>
    </div>
  );
  //#endregion

  const [leftSectionList, setLeftSectionList] = useState([
    objectiveSection,
    commSection,
    languagesSection,
    skillsSection,
  ]);
  const [rightSectionList, setRightSectionList] = useState([
    eduSection,
    workSection,
    coursesSection,
    membershipsSection,
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
    const titles = [...pdf.querySelectorAll("p")];
    const texts = [...pdf.querySelectorAll("p")];
  
    texts.forEach((p) => {
      (!p.classList.contains("t04-co-text") &&  
      !p.classList.contains("t04-edu-text"))  &&
      (p.style.transform = "translateY(-40%)");
    });
    texts.forEach((p) => {
      p.classList.contains("t04-edu-title") && 
      (p.style.transform = "translateY(-80%)");
    });
    texts.forEach((p) => {
      p.classList.contains("t04-edu-text") && 
      (p.style.transform = "translateY(-30%)")
    });
    texts.forEach((p) => {
      (
      p.classList.contains("t04-work-text") || 
      p.classList.contains("t04-course-text") || 
      p.classList.contains("t04-member-text")) && 
      (p.style.transform = "translateY(-80%)");
  });

    titles.forEach((p) => {
      if(cvLanguage==='Ar'){
        p.classList.contains("t04-title") &&
        (p.style.transform = "translate(50%,-80%)");
      }else{
        p.classList.contains("t04-title") &&
        (p.style.transform = "translate(-50%,-80%)");
      }
    });
  
    html2canvas(pdf, {
      dpi: 300, // Set to 300 DPI
      scale: 2, // Adjusts your resolution
      useCORS: true
    })
      .then((canvas) => {
        const filename = "template_4";
        if(type==='PDF'){
          var img = canvas.toDataURL("image/jpeg", 1);
          var doc = new jsPDF("p", "mm", "a4");
          doc.addImage(img, "JPEG", -4, 0, 214, 298);
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
  
    texts.forEach((p) => {
      !p.classList.contains("t04-co-text") && 
      (p.style.transform = "translateY(0%)");
    });
    texts.forEach((p) => {
      p.classList.contains("t04-edu-title") && 
      (p.style.transform = "translateY(-50%)");
    });
    texts.forEach((p) => {
      p.classList.contains("t04-edu-text") && 
      (p.style.transform = "translateY(0%)");
    });
    texts.forEach((p) => {
      (p.classList.contains("t04-work-text") || 
      p.classList.contains("t04-course-text") || 
      p.classList.contains("t04-member-text")) && 
      (p.style.transform = "translateY(-50%)");
    });

    titles.forEach((p) => {
      if(cvLanguage==='Ar'){
        p.classList.contains("t04-title") &&
        (p.style.transform = "translate(50%,-50%)");
      }
      else{
        p.classList.contains("t04-title") &&
        (p.style.transform = "translate(-50%,-50%)");
      }
    });
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
          className={`template04-body ${cvLanguage === "Ar" ? "ar" : ""}`}
          ref={ref}
          id="toPDF"
        >
          {/*  Corners  */}
          <div
            className={`t04-top-right-back-corner ${
              cvLanguage === "Ar" ? "ar" : ""
            }`}
          ></div>
          <div
            className={`t04-top-right-front-corner ${
              cvLanguage === "Ar" ? "ar" : ""
            }`}
          ></div>
          <div
            className={`t04-top-left-back-corner ${
              cvLanguage === "Ar" ? "ar" : ""
            }`}
          ></div>
          <div
            className={`t04-top-left-front-corner ${
              cvLanguage === "Ar" ? "ar" : ""
            }`}
          ></div>
          <div
            className={`t04-bottom-right-back-corner ${
              cvLanguage === "Ar" ? "ar" : ""
            }`}
          ></div>
          <div
            className={`t04-bottom-right-front-corner ${
              cvLanguage === "Ar" ? "ar" : ""
            }`}
          ></div>
          <div
            className={`t04-bottom-left-back-corner ${
              cvLanguage === "Ar" ? "ar" : ""
            }`}
          ></div>
          <div
            className={`t04-bottom-left-front-corner ${
              cvLanguage === "Ar" ? "ar" : ""
            }`}
          ></div>

          {/* Personal Photo */}
          <div className={`t04-photo ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <img src={PI.Image ? PI.Image : photo} alt="" />
          </div>

          {/* Name Section */}
          <div className={`t04-name-sec ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <h1>
              {`${PI.FirstName}\xa0 ${PI.SecondName}\xa0 ${PI.LastName}\xa0`}
            </h1>
            {/* <h2>Computer Science</h2> */}
          </div>

          {/* Main */}
          <div className="t04-main">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              {/* Left */}
              <div className={`t04-left ${cvLanguage === "Ar" ? "ar" : ""}`}>
                <Droppable droppableId="droppable-left" type="Left" >
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} style={{width: '100%'}}>
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

              {/* Right */}
              <div className="t04-right">
                <Droppable droppableId="droppable-right" type="Right">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
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
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template04;
