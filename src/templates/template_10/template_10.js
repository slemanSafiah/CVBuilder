import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./template_10.css";

//#region Import Images
import photo from "../../assets/imgs/template_10/00.png";
import img_01 from "../../assets/imgs/template_10/01.png";
import img_02 from "../../assets/imgs/template_10/02.png";
import img_03 from "../../assets/imgs/template_10/03.png";
import img_04 from "../../assets/imgs/template_10/04.png";
import img_05 from "../../assets/imgs/template_10/05.png";
import img_06 from "../../assets/imgs/template_10/06.png";
import img_07 from "../../assets/imgs/template_10/07.png";
import img_08 from "../../assets/imgs/template_10/08.png";
import img_09 from "../../assets/imgs/template_10/09.png";
import img_10 from "../../assets/imgs/template_10/10.png";
import img_11 from "../../assets/imgs/template_10/11.png";
import img_12 from "../../assets/imgs/template_10/12.png";
import img_13 from "../../assets/imgs/template_10/13.png";
import img_14 from "../../assets/imgs/template_10/14.png";
import img_15 from "../../assets/imgs/template_10/15.png";
import img_16 from "../../assets/imgs/template_10/16.png";
import img_17 from "../../assets/imgs/template_10/17.png";
import img_18 from "../../assets/imgs/template_10/18.png";
import img_19 from "../../assets/imgs/template_10/19.png";
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
    useCORS: true
  })
    .then((canvas) => {
      const filename = "template_10";
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
}

const ref = React.createRef();
const Template10 = (props) => {
  const {
    educations,
    experiences,
    languages,
    courses,
    personalInformation,
    skills,
  } = useSelector((state) => state.template);
  const hidden = useSelector((state) => state.isHide);

  let PI = null;
  if (personalInformation) {
    PI = personalInformation;
  }

  let edus = null;
  let arEdus = null;
  if (educations.length > 0) {
    let degree = "";
    let degreeAr = "";
    edus = educations.map((edu) => {
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
        <div className="t10-edu" key={edu._id}>
          <div className="t10-edu-box">
            <div className="t10-edu-title">
              <p className="bold">{edu.UniversityName}</p>
            </div>
            <div className="t10-edu-content">
              <p>
                <span className="t10-content-name">Degree: </span>
                <span>{degree}</span>
              </p>
              <p>
                <span className="t10-content-name">Specialization: </span>
                <span>{edu.Faculty}</span>
              </p>
              <p>
                <span className="t10-content-name">GPA:</span>
                <span>{edu.DegreeFrom5} out of 5</span>
              </p>
            </div>
          </div>
          <div className="t10-edu-date">
            <div className="t10-circle"></div>
            <span className="t10-start-date">{edu.YearStart}</span> -
            <span className="t10-end-date">{edu.YearEnd}</span>
          </div>
        </div>
      );
    });
    arEdus = educations.map((edu) => {
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
        <div className="t10-edu ar" key={edu._id}>
          <div className="t10-edu-box ar">
            <div className="t10-edu-title ar">
              <p className={`bold ar`}>{`${edu.UniversityNameAr}\xa0`}</p>
            </div>
            <div className="t10-edu-content ar">
               <p className={`ar`}>
                <span className="t10-content-name">{`الدرجة\xa0`} :</span>
                <span>{`${degreeAr}\xa0`}</span>
              </p>
               <p className={`ar`}>
                <span className="t10-content-name">{`التخصص\xa0`} :</span>
                <span>{`${edu.FacultyAr}\xa0`}</span>
              </p>
               <p className={`ar`}>
                <span className="t10-content-name">{`المعدل\xa0`} :</span>
                <span>{`${edu.DegreeFrom5}`}{`من\xa05\xa0`}</span>
              </p>
            </div>
          </div>
          <div className="t10-edu-date ar">
            <div className="t10-circle ar"></div>
            <span className="t10-start-date">{`${edu.YearStart}\xa0`}</span>-
            <span className="t10-end-date">{`${edu.YearEnd}\xa0`}</span>
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
        <div className="t10-work" key={job._id}>
          <div className="t10-work-box">
            <div className="t10-work-title">
              <p className="bold">{job.Name}</p>
            </div>
            <div className="t10-work-content">
              <p>
                <span className="t10-job-name">Job: </span>
                <span className="t10-job-value">{job.Description}</span>
              </p>
            </div>
          </div>
          <div className="t10-work-date">
            <div className="t10-circle"></div>
            <span className="t10-start-date">{job.Start}</span> -
            <span className="t10-end-date">{job.End}</span>
          </div>
        </div>
      );
    });
    arJobs = experiences.map((job) => {
      return (
        <div className="t10-work ar" key={job._id}>
          <div className="t10-work-box ar">
            <div className="t10-work-title ar">
              <p className={`bold ar`}>{job.NameAr}</p>
            </div>
            <div className="t10-work-content ar">
               <p className={`ar`}>
                <span className="t10-job-name">{`الوظيفة\xa0:\xa0`}</span>
                <span className="t10-job-value">{job.DescriptionAr}</span>
              </p>
            </div>
          </div>
          <div className="t10-work-date ar">
            <div className="t10-circle ar"></div>
            <span className="t10-start-date">{`${job.Start}\xa0`}</span>- <span className="t10-end-date">{`${job.End}\xa0`}</span>
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
        <div className="t10-course" key={crs._id}>
          <div className="t10-course-circle">
            <div className="t10-circle"></div>
          </div>
          <div className="t10-course-name">
            <p>{crs.Name}</p>
          </div>
        </div>
      );
    });

    arCrses = courses.map((crs) => {
      return (
        <div className="t10-course ar" key={crs._id}>
          <div className="t10-course-circle ar">
            <div className="t10-circle"></div>
          </div>
          <div className="t10-course-name">
             <p className={`ar`}>{`${crs.NameAr}\xa0`}</p>
          </div>
        </div>
      );
    });
  }

  const allSkills = {
    'Computer Proficiency': img_12,
    'Office Programs': img_13,
    'TeamWork': img_14,
    'Problem solving': img_15,
    'Self Development': img_16,
    'Leadership and Organisation': img_17,
    'Work under pressure': img_18,
    'Time Managment': img_19,
  };
  let skls = null;
  let arSkls = null;
  if (skills.length > 0) {
    skls = skills.map((skill) => {
      let skillLogo = allSkills[skill.Name];
      return (
        <div className="t10-skill" key={skill._id}>
          <div className="t10-skill-logo">
            <div className="t10-skill-logo-bg">
              <img src={skillLogo} alt="" />
            </div>
          </div>
          <div className="t10-skill-name">
            <p>{skill.Name}</p>
          </div>
        </div>
      );
    });
    arSkls = skills.map((skill) => {
      let skillLogo = allSkills[skill.Name];
      return (
        <div className="t10-skill" key={skill._id}>
          <div className="t10-skill-logo">
            <div className="t10-skill-logo-bg">
              <img src={skillLogo} alt="" />
            </div>
          </div>
          <div className="t10-skill-name">
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
      for (let i = 0; i < lang.RateFrom10; i++) {
        rate.push(<div className="t10-lang-deg" key={Math.random()}></div>);
      }
      for (let i = 0; i < 10 - lang.RateFrom10; i++) {
        rate.push(<div className="t10-lang-deg empty" key={Math.random()}></div>);
      }

      return (
        <div className="t10-lang" key={lang._id}>
          <div className="t10-lang-name">
            <p>{lang.Name}</p>
          </div>
          <div className="t10-lang-rate">{rate}</div>
        </div>
      );
    });
    arLangs = languages.map((lang) => {
      let rate = [];
      for (let i = 0; i < lang.RateFrom10; i++) {
        rate.push(<div className="t10-lang-deg" key={Math.random()}></div>);
      }
      for (let i = 0; i < 10 - lang.RateFrom10; i++) {
        rate.push(<div className="t10-lang-deg empty" key={Math.random()}></div>);
      }

      return (
        <div className="t10-lang" key={lang._id}>
          <div className="t10-lang-name">
             <p className={` ar`}>{`${lang.NameAr}\xa0`}</p>
          </div>
          <div className="t10-lang-rate">{rate}</div>
        </div>
      );
    });
  }

  //#region - Education Section
  let eduSection = !hidden.isEducationsHidden && edus && (
    <div className="t10-row-section">
      {/* English */}
      <div className="t10-sec t10-edu-sec">
        <div className="t10-sec-logo">
          <img src={img_07} alt="" />
        </div>
        <div className="t10-sec-title">
          <p className="bold">Education</p>
        </div>
        <div className="t10-sec-body">{edus}</div>
      </div>
      {/* Arabic */}
      <div className="t10-sec t10-edu-sec ar">
        <div className="t10-sec-logo ar">
          <img src={img_07} alt="" />
        </div>
        <div className="t10-sec-title ar">
          <p className={`bold  ar`}>{`المؤهل\xa0التعليمي\xa0`}</p>
        </div>
        <div className="t10-sec-body ar">{arEdus}</div>
      </div>
    </div>
  );

  //#endregion
  //#region - Work Section
  let workSection = !hidden.isExperiencesHidden && jobs && (
    <div className="t10-row-section">
      {/* English */}
      <div className="t10-sec t10-work-sec">
        <div className="t10-sec-logo">
          <img src={img_08} alt="" />
        </div>
        <div className="t10-sec-title">
          <p className="bold">Experience</p>
        </div>
        <div className="t10-sec-body">{jobs}</div>
      </div>
      {/* Arabic */}
      <div className="t10-sec t10-work-sec ar">
        <div className="t10-sec-logo ar">
          <img src={img_08} alt="" />
        </div>
        <div className="t10-sec-title ar">
          <p className={`bold  ar`}>{`الخبرات\xa0العملية\xa0`}</p>
        </div>
        <div className="t10-sec-body ar">{arJobs}</div>
      </div>
    </div>
  );

  //#endregion
  //#region - Courses Section
  let coursesSection = !hidden.isCoursesHidden && crses && (
    <div className="t10-row-section">
      {/* English */}
      <div className="t10-sec t10-courses-sec">
        <div className="t10-sec-logo">
          <img src={img_09} alt="" />
        </div>
        <div className="t10-sec-title">
          <p className="bold">Courses</p>
        </div>
        <div className="t10-sec-body">
          <div className="t10-sec-content">{crses}</div>
        </div>
      </div>
      {/* Arabic */}
      <div className="t10-sec t10-courses-sec ar">
        <div className="t10-sec-logo ar">
          <img src={img_09} alt="" />
        </div>
        <div className="t10-sec-title ar">
          <p className={`bold  ar`}>{`الدورات\xa0التدريبية\xa0`}</p>
        </div>
        <div className="t10-sec-body ar">
          <div className="t10-sec-content">{arCrses}</div>
        </div>
      </div>
    </div>
  );
  //#endregion
  //#region - Skills Section
  let skillsSection = skls && (
    <div className="t10-row-section">
      {/* English */}
      <div className="t10-sec t10-skills-sec">
        <div className="t10-sec-logo">
          <img src={img_10} alt="" />
        </div>
        <div className="t10-sec-title">
          <p className="bold">Skills</p>
        </div>
        <div className="t10-sec-body">{skls}</div>
      </div>
      {/* Arabic */}
      <div className="t10-sec t10-skills-sec ar">
        <div className="t10-sec-logo ar">
          <img src={img_10} alt="" />
        </div>
        <div className="t10-sec-title ar">
          <p className={`bold  ar`}>المهارات</p>
        </div>
        <div className="t10-sec-body ar">{arSkls}</div>
      </div>
    </div>
  );
  //#endregion
  //#region - Languages Section
  let languagesSection = !hidden.isLanguagesHidden && langs && (
    <div className="t10-row-section">
      {/* English */}
      <div className="t10-sec t10-lang-sec">
        <div className="t10-sec-logo">
          <img src={img_11} alt="" />
        </div>
        <div className="t10-sec-title">
          <p className="bold">Languages</p>
        </div>
        <div className="t10-sec-body">{langs}</div>
      </div>
      {/* Arabic */}
      <div className="t10-sec t10-lang-sec ar">
        <div className="t10-sec-logo ar">
          <img src={img_11} alt="" />
        </div>
        <div className="t10-sec-title ar">
          <p className={`bold  ar`}>اللغات</p>
        </div>
        <div className="t10-sec-body ar">{arLangs}</div>
      </div>
    </div>
  );
  //#endregion

  const [mainSectionList, setMainSectionList] = useState([
    eduSection,
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
        <div className="template10-body" ref={ref} id="toPDF">
          {/* Header Section */}
          <div className="t10-header-sec">
            {/* Photo */}
            <div className="t10-photo">
              <div className="t10-photo-bg">
                <img src={PI.Image ? PI.Image : photo} alt="" />
              </div>
            </div>

            {/* Name */}
            <div className="t10-name">
               <p className={`ar`}>
                {`${PI.FirstNameAr}\xa0 ${PI.SecondNameAr}\xa0 ${PI.LastNameAr}\xa0`}
              </p>
               <p>
                {PI.FirstName} {PI.SecondName} {PI.LastName}
              </p>
            </div>

            {/* Details */}
            <div className="t10-details">
              <div className="t10-detail">
                <div className="t10-detail-logo-1">
                  <img src={img_01} alt="" />
                </div>
                <div className="t10-detail-text">
                  <p>{PI.Birth}</p>
                </div>
              </div>
              <div className="t10-detail">
                <div className="t10-detail-logo-2">
                  <img src={img_02} alt="" />
                </div>
                <div className="t10-detail-text">
                  <p>{PI.Phone}</p>
                </div>
              </div>
              <div className="t10-detail">
                <div className="t10-detail-logo-3">
                  <img src={img_03} alt="" />
                </div>
                <div className="t10-detail-text">
                  <p>{PI.Email}</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="t10-location">
              <div className="t10-loc-data-1">
                <div className="t10-loc-logo">
                  <img src={img_04} alt="" />
                </div>
                <div className="t10-loc-text">
                   <p className={`ar`}>{`${PI.CityAr}\xa0`}</p>
                  <p>{PI.City}</p>
                </div>
              </div>
              <div className="t10-loc-data-2">
                <div className="t10-loc-logo">
                  <img src={img_05} alt="" />
                </div>
                <div className="t10-loc-text">
                   <p className={`ar`}>{`${PI.NationalityAr}\xa0`}</p>
                  <p>{PI.Nationality}</p>
                </div>
              </div>
              <img className="t10-world" src={img_06} alt="" />
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

export default Template10;
