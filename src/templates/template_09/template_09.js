import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./template_09.css";

//#region Import Images
import photo from "../../assets/imgs/template_09/00.png";
import img_01 from "../../assets/imgs/template_09/01.png";
import img_02 from "../../assets/imgs/template_09/02.png";
import img_03 from "../../assets/imgs/template_09/03.png";
import img_04 from "../../assets/imgs/template_09/04.png";
import img_05 from "../../assets/imgs/template_09/05.png";
import img_06 from "../../assets/imgs/template_09/06.png";
import img_07 from "../../assets/imgs/template_09/07.png";
import img_08 from "../../assets/imgs/template_09/08.png";
import img_09 from "../../assets/imgs/template_09/09.png";
import img_10 from "../../assets/imgs/template_09/10.png";
import img_11 from "../../assets/imgs/template_09/11.png";
import img_07_red from "../../assets/imgs/template_09/07_red.png";
import img_08_red from "../../assets/imgs/template_09/08_red.png";
import img_09_red from "../../assets/imgs/template_09/09_red.png";
import img_10_red from "../../assets/imgs/template_09/10_red.png";
import img_11_red from "../../assets/imgs/template_09/11_red.png";
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
  const titles = [...pdf.querySelectorAll("h2")];
  const text = [...pdf.querySelectorAll("p")];

  titles.map(
    (t) =>
      !t.classList.contains("tag-text") &&
      (t.style.transform = "translateY(-30%)")
  );
  text.map(
    (p) =>
      !p.classList.contains("detail-text") &&
      (p.style.transform = "translateY(-30%)")
  );

  html2canvas(pdf, {
    dpi: 300, // Set to 300 DPI
    scale: 2, // Adjusts your resolution
    useCORS: true
  })
    .then((canvas) => {
      const filename = "template_9";
      if(type==='PDF'){
        var img = canvas.toDataURL("image/PNG", 1);
        var doc = new jsPDF("p", "mm", "a4");
        doc.addImage(img, "PNG", -4, 0, 212, 298);
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

  titles.map((t) => (t.style.transform = "translateY(0%)"));
  text.map(
    (p) =>
      !p.classList.contains("detail-text") &&
      (p.style.transform = "translateY(0%)")
  );
}

const ref = React.createRef();
const Template09 = (props) => {
  const {
    educations,
    experiences,
    languages,
    courses,
    personalInformation,
    skills,
  } = useSelector((state) => state.template);
  const hidden = useSelector((state) => state.isHide);
  const cvColor = useSelector((state) => state.sections.color);

  const colorStyle ={
    darkRed: '#893c4e',
    lightRed: '#9a5665',
    darkGreen: '#376363',
    lightGreen: '#386464',
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
      return (
        <div className="t09-edu" key={edu._id}>
          <div className="t09-circle"
              style={{backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}></div>
          <p className="t09-edu-title"
              style={{color: cvColor===1 ? `${colorStyle.lightRed}` : `${colorStyle.lightGreen}`}}>
            {degree}
          </p>
          <div className="t09-edu-text">
            <p>Major: {edu.Faculty}</p>
            <p>
              {edu.UniversityName} - {edu.YearEnd}
            </p>
            <p>GPA: {edu.DegreeFrom5} out of 5</p>
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
      return (
        <div className="t09-edu" key={edu._id}>
          <div className="t09-circle ar"
              style={{backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}></div>
          <p className={`t09-edu-title ar`}
              style={{color: cvColor===1 ? `${colorStyle.lightRed}` : `${colorStyle.lightGreen}`}}>
            {degreeAr}
          </p>
          <div className="t09-edu-text">
             <p className={`ar`}>{`تخصص\xa0`} :{`${edu.FacultyAr}\xa0`}</p>
             <p className={`ar`}>{`${edu.UniversityNameAr}\xa0`}</p>
             <p className={`ar`}>{`المعدل\xa0`} :{`${edu.DegreeFrom5}\xa0`}{`من\xa05\xa0`}</p>
             <p className={`ar`}>{`سنة\xa0التخرج\xa0`} :{`${edu.YearEnd}\xa0`}</p>
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
        <div className="t09-work" key={job._id}>
          <div className="t09-circle"
              style={{backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}></div>
          <p className="t09-work-title">{job.Name}</p>
          <div className="t09-work-text">
            <p>{job.Description}</p>
            <p>
              {job.Start} - {job.End}
            </p>
          </div>
        </div>
      );
    });
    arJobs = experiences.map((job) => {
      return (
        <div className="t09-work" key={job._id}>
          <div className="t09-circle ar"
              style={{backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}></div>
          <p className={`t09-work-title ar`}>{`${job.NameAr}\xa0`}</p>
          <div className="t09-work-text">
             <p className={`ar`}>{`بوظيفة:\xa0`}{`${job.Description}\xa0`}</p>
             <p className={`ar`}>
              {`${job.Start}\xa0`}- {`${job.End}\xa0`}
            </p>
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
        <div className="t09-course" key={crs._id}>
          <div className="t09-circle-container">
            <div className="t09-circle"
                style={{backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}></div>
          </div>
          <div className="t09-course-text">
            <p>{crs.Name}</p>
          </div>
        </div>
      );
    });
    arCrses = courses.map((crs) => {
      return (
        <div className="t09-course ar" key={crs._id}>
          <div className="t09-circle-container">
            <div className="t09-circle ar"
                style={{backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}></div>
          </div>
          <div className="t09-course-text">
             <p className={`ar`}>{`${crs.NameAr}\xa0`}</p>
          </div>
        </div>
      );
    });
  }

  let skls = null;
  let arSkls = null;
  if (skills.length > 0) {
    skls = skills.map((skill) => {
      return (
        <div className="t09-p-skill" key={skill._id}>
          <div className="t09-circle-container">
            <div className="t09-circle"
                style={{backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}></div>
          </div>
          <div className="t09-p-skill-text">
            <p>{skill.Name}</p>
          </div>
        </div>
      );
    });
    arSkls = skills.map((skill) => {
      return (
        <div className="t09-p-skill ar" key={skill._id}>
          <div className="t09-circle-container">
            <div className="t09-circle"
                style={{backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}></div>
          </div>
          <div className="t09-p-skill-text">
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
        rate.push(<div className="t09-lang-deg" 
                      style={{backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}} 
                      key={Math.random()}></div>);
      }
      for (let i = 0; i < 10 - lang.RateFrom10; i++) {
        rate.push(<div className="t09-lang-deg empty" key={Math.random()}></div>);
      }

      return (
        <div className="t09-lang" key={lang._id}>
          <div className="t09-lang-name">
            <p>{lang.Name}</p>
          </div>
          <div className="t09-lang-rate">{rate}</div>
        </div>
      );
    });
    arLangs = languages.map((lang) => {
      let rate = [];
      for (let i = 0; i < lang.RateFrom10; i++) {
        rate.push(<div className="t09-lang-deg" 
                      style={{backgroundColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}} 
                      key={Math.random()}></div>);
      }
      for (let i = 0; i < 10 - lang.RateFrom10; i++) {
        rate.push(<div className="t09-lang-deg empty" key={Math.random()}></div>);
      }

      return (
        <div className="t09-lang" key={lang._id}>
          <div className="t09-lang-name">
             <p className={`ar`}>{`${lang.NameAr}\xa0`}</p>
          </div>
          <div className="t09-lang-rate">{rate}</div>
        </div>
      );
    });
  }

  //#region - Education Section
  let educationSection = !hidden.isEducationsHidden && edus && (
    <div className="t09-row-section">
      {/* English */}
      <div className="t09-sec t09-edu-sec">
        <div className="t09-sec-logo">
          {cvColor===1 ? (<img src={img_07_red} alt="" />) : (<img src={img_07} alt="" />)}
        </div>
        <div className="t09-sec-content">
          <h2 className="t09-sec-title"
              style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>
            Education
          </h2>
          {edus}
        </div>
      </div>
      {/* Arabic */}
      <div className="t09-sec t09-edu-sec ar">
        <div className="t09-sec-logo">
        {cvColor===1 ? (<img src={img_07_red} alt="" />) : (<img src={img_07} alt="" />)}
        </div>
        <div className="t09-sec-content ar">
          <h2 className="t09-sec-title ar"
              style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>التعليم</h2>
          {arEdus}
        </div>
      </div>
    </div>
  );

  //#endregion
  //#region - Work Section
  let workSection = !hidden.isExperiencesHidden && jobs && (
    <div className="t09-row-section">
      {/* English */}
      <div className="t09-sec t09-work-sec">
        <div className="t09-sec-logo">
          {cvColor===1 ? (<img src={img_08_red} alt="" />) : (<img src={img_08} alt="" />)}
        </div>
        <div className="t09-sec-content">
          <h2 className="t09-sec-title"
              style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>Work Experience</h2>
          {jobs}
        </div>
      </div>
      {/* Arabic */}
      <div className="t09-sec t09-work-sec ar">
        <div className="t09-sec-logo">
          {cvColor===1 ? (<img src={img_08_red} alt="" />) : (<img src={img_08} alt="" />)}
        </div>
        <div className="t09-sec-content ar">
          <h2 className="t09-sec-title ar"
              style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>الخبرات</h2>
          {arJobs}
        </div>
      </div>
    </div>
  );

  //#endregion
  //#region - Courses Section
  let coursesSection = !hidden.isCoursesHidden && crses && (
    <div className="t09-row-section">
      {/* English */}
      <div className="t09-sec t09-courses-sec">
        <div className="t09-sec-logo">
          {cvColor===1 ? (<img src={img_09_red} alt="" />) : (<img src={img_09} alt="" />)}
        </div>
        <div className="t09-sec-content">
          <h2 className="t09-sec-title"
              style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>Training Courses</h2>
          {crses}
        </div>
      </div>

      {/* Arabic */}
      <div className="t09-sec t09-courses-sec ar">
        <div className="t09-sec-logo">
          {cvColor===1 ? (<img src={img_09_red} alt="" />) : (<img src={img_09} alt="" />)}
        </div>
        <div className="t09-sec-content ar">
          <h2 className="t09-sec-title ar"
              style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>{`الدورات\xa0التدريبية\xa0`}</h2>
          {arCrses}
        </div>
      </div>
    </div>
  );
  //#endregion
  //#region - Skills Section
  let skillsSection = skls && (
    <div className="t09-row-section">
      {/* English */}
      <div className="t09-sec t09-personal-skills-sec">
        <div className="t09-sec-logo">
          {cvColor===1 ? (<img src={img_10_red} alt="" />) : (<img src={img_10} alt="" />)}
        </div>
        <div className="t09-sec-content">
          <h2 className="t09-sec-title"
              style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>Personal Skills</h2>
          {skls}
        </div>
      </div>
      {/* Arabic */}
      <div className="t09-sec t09-personal-skills-sec ar">
        <div className="t09-sec-logo">
          {cvColor===1 ? (<img src={img_10_red} alt="" />) : (<img src={img_10} alt="" />)}
        </div>
        <div className="t09-sec-content ar">
          <h2 className="t09-sec-title ar"
              style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>المهارات</h2>
          {arSkls}
        </div>
      </div>
    </div>
  );
  //#endregion
  //#region - Languages Section
  let languagesSection = !hidden.isLanguagesHidden && langs && (
    <div className="t09-row-section">
      {/* English */}
      <div className="t09-sec t09-lang-sec">
        <div className="t09-sec-logo">
        {cvColor===1 ? (<img src={img_11_red} alt="" />) : (<img src={img_11} alt="" />)}
        </div>
        <div className="t09-sec-content">
          <h2 className="t09-sec-title"
              style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>Languages</h2>
          {langs}
        </div>
      </div>
      {/* Arabic */}
      <div className="t09-sec t09-lang-sec ar">
        <div className="t09-sec-logo">
        {cvColor===1 ? (<img src={img_11_red} alt="" />) : (<img src={img_11} alt="" />)}
        </div>
        <div className="t09-sec-content ar">
          <h2 className="t09-sec-title ar"
              style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>اللغات</h2>
          {arLangs}
        </div>
      </div>
    </div>
  );
  //#endregion

  const [mainSectionList, setMainSectionList] = useState([
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
        <div className="template09-body" ref={ref} id="toPDF">
          {/* CV Tag */}
          <div className="t09-cv-tag"
              style={{backgroundColor: cvColor===1 ? `${colorStyle.lightRed}`: `${colorStyle.lightGreen}`}}>
            <h2 className="t09-tag-text">
              CV
            </h2>
          </div>

          {/* Photo Section */}
          <div className="t09-photo"
              style={{borderColor: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}}>
            <img src={PI.Image ? PI.Image : photo} alt="" />
          </div>

          {/* Name Section */}
          <div className="t09-name-sec">
            <p className={`ar`} style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}} >
              {`${PI.FirstNameAr}\xa0 ${PI.SecondNameAr}\xa0 ${PI.LastNameAr}\xa0`}
            </p>
            <p style={{color: cvColor===1 ? `${colorStyle.darkRed}` : `${colorStyle.darkGreen}`}} >
              {PI.FirstName} {PI.SecondName} {PI.LastName}
            </p>
          </div>

          {/* Info Section */}
          <div className="t09-info-sec">
            <div className="t09-info-details">
              <div className="t09-detail">
                <div className="t09-detail-img-bg t09-detail-img-bg-3"
                    style={{backgroundColor: cvColor===1 ? '#843d4b' : '#7b9d9d' }}>
                  <img className="t09-detail-img-1" src={img_01} alt="" />
                </div>
                <div className="t09-detail-p-1"
                    style={{backgroundColor: cvColor===1 ? '#843d4b' : '#485e5e' }}>
                  <p className="t09-detail-text">{PI.Email} </p>
                </div>
              </div>
              <div className="t09-detail">
                <div className="t09-detail-img-bg t09-detail-img-bg-1"
                    style={{backgroundColor: cvColor===1 ? '#4d364a' : '#485e5e' }}>
                  <img className="t09-detail-img-2" src={img_02} alt="" />
                </div>
                <div className="t09-detail-p-3"
                    style={{backgroundColor: cvColor===1 ? '#4d364a' : '#7b9d9d' }}>
                  <p className="t09-detail-text">{PI.Phone}</p>
                </div>
              </div>
              <div className="t09-detail">
                <div className="t09-detail-img-bg t09-detail-img-bg-2"
                    style={{backgroundColor: cvColor===1 ? '#2d2d49' : '#537b7b' }}>
                  <img className="t09-detail-img-3" src={img_03} alt="" />
                </div>
                <div className="t09-detail-p-2"
                    style={{backgroundColor: cvColor===1 ? '#2d2d49' : '#537b7b' }}>
                  <p className="t09-detail-text">{`${PI.City}\xa0`}- {`${PI.CityAr}\xa0`}</p>
                </div>
              </div>
              <div className="t09-detail">
                <div className="t09-detail-img-bg t09-detail-img-bg-2"
                    style={{backgroundColor: cvColor===1 ? '#2d2d49' : '#537b7b' }}>
                  <img className="t09-detail-img-4" src={img_04} alt="" />
                </div>
                <div className="t09-detail-p-2"
                    style={{backgroundColor: cvColor===1 ? '#2d2d49' : '#537b7b' }}>
                  <p className="t09-detail-text">{`${PI.Nationality}\xa0`}- {`${PI.NationalityAr}\xa0`}</p>
                </div>
              </div>
              <div className="t09-detail">
                <div className="t09-detail-img-bg t09-detail-img-bg-1"
                    style={{backgroundColor: cvColor===1 ? '#4d364a' : '#485e5e' }}>
                  <img className="t09-detail-img-5" src={img_05} alt="" />
                </div>
                <div className="t09-detail-p-3"
                    style={{backgroundColor: cvColor===1 ? '#4d364a' : '#7b9d9d' }}>
                  <p className="t09-detail-text">{`${PI.MaritalStatus == 1 ? 'Married' : 'Single'}\xa0`}- {`${PI.MaritalStatusAr == 1 ? 'متزوج' : 'أعزب'}\xa0`}</p>
                </div>
              </div>
              <div className="t09-detail">
                <div className="t09-detail-img-bg t09-detail-img-bg-3"
                    style={{backgroundColor: cvColor===1 ? '#843d4b' : '#7b9d9d' }}>
                  <img className="t09-detail-img-6" src={img_06} alt="" />
                </div>
                <div className="t09-detail-p-1"
                    style={{backgroundColor: cvColor===1 ? '#843d4b' : '#485e5e' }}>
                  <p className="t09-detail-text">{PI.Birth} </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Sections */}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable-main" type="Main">
              {(provided) => (
                <div
                  className="t09-main-sec"
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

export default Template09;
