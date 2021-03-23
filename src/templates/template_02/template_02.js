import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./template_02.css";

//#region Import Images
import photo from "../../assets/imgs/template_02/00.png";
import img_01 from "../../assets/imgs/template_02/01.png";
import img_02 from "../../assets/imgs/template_02/02.png";
import img_03 from "../../assets/imgs/template_02/03.png";
import img_04 from "../../assets/imgs/template_02/04.png";
import img_05 from "../../assets/imgs/template_02/05.png";
import img_06 from "../../assets/imgs/template_02/06.png";
import img_07 from "../../assets/imgs/template_02/07.png";
import img_08 from "../../assets/imgs/template_02/08.png";
import img_09 from "../../assets/imgs/template_02/09.png";
import img_10 from "../../assets/imgs/template_02/10.png";
import img_11 from "../../assets/imgs/template_02/11.png";
import img_12 from "../../assets/imgs/template_02/12.png";
import img_13 from "../../assets/imgs/template_02/13.png";
import img_14 from "../../assets/imgs/template_02/14.png";
import img_15 from "../../assets/imgs/template_02/15.png";
import img_16 from "../../assets/imgs/template_02/16.png";
import img_17 from "../../assets/imgs/template_02/17.png";
import img_18 from "../../assets/imgs/template_02/18.png";
import img_19 from "../../assets/imgs/template_02/19.png";
import img_20 from "../../assets/imgs/template_02/20.png";
import img_21 from "../../assets/imgs/template_02/21.png";
import img_22 from "../../assets/imgs/template_02/22.png";
import img_23 from "../../assets/imgs/template_02/23.png";
import img_24 from "../../assets/imgs/template_02/24.png";
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
      !p.classList.contains("objective-text") &&
      (p.style.transform = "translateY(-30%)")
  );
  text.map(
    (p) =>
      p.classList.contains("title") && (p.style.transform = "translateY(-28%)")
  );
  text.map(
    (p) =>
      p.classList.contains("year") && (p.style.transform = "translateY(-35%)")
  );

  html2canvas(pdf, {
    dpi: 300, // Set to 300 DPI
    scale: 2, // Adjusts your resolution
    useCORS: true
  })
  .then((canvas) => {
    let filename = 'template_2';
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
  text.map((p) => (p.style.transform = "translateY(0%)"));
}

const ref = React.createRef();
const Template02 = (props) => {
  const {
    educations,
    experiences,
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
      return (
        <div
          className={`edu ${cvLanguage === "Ar" ? "ar" : ""}`}
          key={edu._id}
        >
          <div
            className={`circle ${cvLanguage === "Ar" ? "ar" : ""}`}
          ></div>
          <p className={`edu-title bold ${cvLanguage === "Ar" ? "ar" : ""}`}>{degree}</p>
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{edu.UniversityName}</p>
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>GPA: {edu.DegreeFrom5} out of 5</p>
          <div className={`edu-year ${cvLanguage === "Ar" ? "ar" : ""}`}>
            <p className="year">{edu.YearEnd}</p>
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
            className={`edu ${cvLanguage === "Ar" ? "ar" : ""}`}
            key={edu._id}
          >
            <div
              className={`circle ${cvLanguage === "Ar" ? "ar" : ""}`}
            ></div>
            <p className={`edu-title bold ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${degreeAr}\xa0`}</p>
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${edu.UniversityName}\xa0`}</p>
            <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`المعدل\xa0`} :{`${edu.DegreeFrom5}\xa0`}{`من\xa05\xa0`}</p>
            <div className={`edu-year ${cvLanguage === "Ar" ? "ar" : ""}`}>
              <p className="year">{edu.YearEnd}</p>
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

  let jobs = null;
  if (experiences.length > 0) {
    jobs = experiences.map((job) => {
      return (
        <div className="work" key={job._id}>
          <div
            className={`circle ${cvLanguage === "Ar" ? "ar" : ""}`}
          ></div>
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${job.Description}\xa0`}</p>
        </div>
      );
    });
  }

  let PI = null;
  if (personalInformation) {
    PI = personalInformation;
  }

  let crses = null;
  if (courses.length > 0) {
    crses = courses.map((crs) => {
      return (
        <div className="course" key={crs._id}>
          <div
            className={`circle ${cvLanguage === "Ar" ? "ar" : ""}`}
          ></div>
          <p className={` ${cvLanguage === "Ar" ? "ar" : ""}`}>{`${crs.Name}\xa0`}</p>
        </div>
      );
    });
  }

  const allSkills = {
    'Computer Proficiency': img_16,
    'Self Development': img_17,
    'TeamWork': img_18,
    'Problem solving': img_19,
    MS5: img_20,
    'Time Managment': img_21,
    'Leadership and Organisation': img_22,
    'Work under pressure': img_23,
    'Office Programs': img_24,
  };
  let skls = null;
  if (skills.length > 0) {
    skls = skills.map((skill) => {
      let skillLogo = allSkills[skill.Name];
      return (
        <div className="flex-content" key={skill._id}>
          <div className="skill-icon-bg">
            <img className="skill-icon-1" src={skillLogo} alt="" />
          </div>
          <div className="skill-text">
            <p>{cvLanguage==='Ar' ? `${skill.NameAr}\xa0` : skill.Name}</p>
          </div>
        </div>
      );
    });
  }

  //#region - Education Section
  let eduSection = !hidden.isEducationsHidden && edus && (
    <div className="sec edu-sec">
      <div className={`sec-icon-bg ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <img className="sec-icon-1" src={img_09} alt="" />
      </div>
      <div className={`sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <p className="title bold">
          {cvLanguage === "Ar" ? "المؤهلات\xa0العلمية\xa0" : "Education"}
        </p>
      </div>
      <div className={`sec-body ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <div className="sec-body-content">{edus}</div>
        <div className="sec-body-img">
          <img src={img_13} alt="" />
        </div>
      </div>
    </div>
  );
  //#endregion
  //#region - Work Section
  let workSection = !hidden.isExperiencesHidden && jobs && (
    <div className="sec work-sec">
      <div className={`sec-icon-bg ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <img className="sec-icon-2" src={img_10} alt="" />
      </div>
      <div className={`sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <p className="title bold">
          {cvLanguage === "Ar" ? "الخبرات\xa0العملية\xa0" : "Work Experience"}
        </p>
      </div>
      <div className={`sec-body ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <div className="sec-body-content">{jobs}</div>
        <div className="sec-body-img">
          <img src={img_14} alt="" />
        </div>
      </div>
    </div>
  );
  //#endregion
  //#region - Courses Section
  let coursesSection = !hidden.isCoursesHidden && crses && (
    <div className="sec course-sec">
      <div className={`sec-icon-bg ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <img className="sec-icon-3" src={img_11} alt="" />
      </div>
      <div className={`sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <p className="title bold">
          {cvLanguage === "Ar" ? "الدورات\xa0التدريبية\xa0" : "Training Courses"}
        </p>
      </div>
      <div className={`sec-body ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <div className="sec-body-content">{crses}</div>
        <div className="sec-body-img">
          <img src={img_15} alt="" />
        </div>
      </div>
    </div>
  );
  //#endregion
  //#region - Skills Section
  let skillsSection = skls && (
    <div className="sec skills-sec">
      <div className={`sec-icon-bg ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <img className="sec-icon-4" src={img_12} alt="" />
      </div>
      <div className={`sec-title ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <p className="title bold">
          {cvLanguage === "Ar" ? "المهارات" : "Skills"}
        </p>
      </div>
      <div className={`skill-sec-body ${cvLanguage === "Ar" ? "ar" : ""}`}>
        <div className="flex-container">{skls}</div>
      </div>
    </div>
  );
  //#endregion

  const [mainSectionList, setMainSectionList] = useState([
    eduSection,
    workSection,
    coursesSection,
    skillsSection,
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
          className={`template02-body ${cvLanguage === "Ar" ? "ar" : ""} `}
          ref={ref}
          id="toPDF"
        >
          {/* Name Section */}
          <div className="name-sec">
            <h1>
              {`${PI.FirstName}\xa0 ${PI.SecondName}\xa0 ${PI.LastName}\xa0`}
            </h1>
          </div>

          {/* Info Section */}
          <div className="info-sec">
            <div className="main-photo">
              <img
                className={`photo ${cvLanguage === "Ar" ? "ar" : ""} `}
                src={PI.Image ? PI.Image : photo}
                alt=""
              />
            </div>
            <div className="info-details">
              <div className="info-content">
                <div className="content-img">
                  <img className="date" src={img_01} alt="date-icon" />
                </div>
                <p>{PI.Birth}</p>
              </div>
              <div className="info-content">
                <div className="content-img">
                  <img
                    className="location-mark"
                    src={img_04}
                    alt="location-mark-icon"
                  />
                </div>
                <p>{`${PI.City}\xa0`}</p>
              </div>
              <div className="info-content">
                <div className="content-img">
                  <img
                    className="flag"
                    src={img_02}
                    alt="saudi-arabia-flag-icon"
                  />
                </div>
                <p>{`${PI.Nationality}\xa0`}</p>
              </div>
              <div className="info-content">
                <div className="content-img">
                  <img
                    className="smartphone"
                    src={img_05}
                    alt="smartphone-icon"
                  />
                </div>
                <p>{PI.Phone}</p>
              </div>
              <div className="info-content">
                <div className="content-img">
                  <img className="man" src={img_03} alt="man-icon" />
                </div>
                {cvLanguage === 'Ar' ? 
                  (<p className="t01-info-status">{PI.MaritalStatus == 1 ? 'متزوج' : 'أعزب'}</p>)
                  :
                  (<p className="t01-info-status">{PI.MaritalStatus == 1 ? 'Married' : 'Single'}</p>)
                }
              </div>
              <div className="info-content">
                <div className="content-img">
                  <img className="envelope" src={img_06} alt="envelope-icon" />
                </div>
                <p>{PI.Email}</p>
              </div>
            </div>
            <div className="world">
              <img src={img_07} alt="world-map" />
            </div>
          </div>

          {/* Intro Section */}
          <div className="intro-sec">
            <div className="intro-body">
              <img src={img_08} alt="" />
              <div className={`intro-content ${cvLanguage==='Ar'?'ar':''}`}>
                <p className="objective-text bold">{`${CO.text}\xa0`}</p>
              </div>
            </div>
          </div>

          <DragDropContext onDragEnd={handleOnDragEnd}>
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
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default Template02;
