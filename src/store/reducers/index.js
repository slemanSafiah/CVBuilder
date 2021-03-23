export default function reducer(state, action) {
  switch (action.type) {
    case "PERSONALINFO":
      return {
        ...state,
        template: {
          ...state.template,
          personalInformation: action.payload
        }
      };
    case "FETCHCVID":
      return {
        ...state,
        cvID: localStorage.getItem('cv_id') ? localStorage.getItem('cv_id') : state.cvID,
        email: localStorage.getItem('Email') ? localStorage.getItem('Email') : state.email,
        token: localStorage.getItem('token') ? localStorage.getItem('token') : state.token,
        firstName: localStorage.getItem('FirstName') ? localStorage.getItem('FirstName') : state.firstName,
        cvTemplate: localStorage.getItem('cvTemplate') ? localStorage.getItem('cvTemplate') : state.cvTemplate,
        template: {
          ...state.template,
          careerObjectives_id: localStorage.getItem('careerObjectives_id') ? localStorage.getItem('careerObjectives_id') : state.template.careerObjectives_id,
          personalInformation_id: localStorage.getItem('personalInformation_id') ? localStorage.getItem('personalInformation_id') : state.template.personalInformation_id
        }
      };
    case "ADDCV":
      return {
        ...state,
        cvID: action.payload.cv_id,
        template: {
          ...state.template,
          careerObjectives_id: action.payload.careerObjectives_id,
          personalInformation_id: action.payload.personalInformation_id,
          languages:[...state.template.languages,action.payload.ArabicLanguage,action.payload.EnglishLanguage]
        },
      };
    case "DELETECV":
      var temp = state.MyTemplates;
      temp = temp.filter((e) => e._id != action.payload.cvID);
      return {
        ...state,
        MyTemplates: temp,
      };
    case "CVNAME":
      return {
        ...state,
        cvName: action.payload.name,
      };
    case "EDITCV":
      let cv = {}
      state.MyTemplates.map(e => e._id === action.payload.cvID ? cv = e : '')
      return {
        ...state,
        cvName: cv.Name,
        cvID: cv._id,
        cvTemplate: cv.Template,
        cvLanguage: cv.Language,
        template: {
          educations: cv.Educations,
          certificates: cv.Certificates,
          experiences: cv.Experiences,
          languages: cv.Languages,
          memberships: cv.Memberships,
          othertraining: cv.OtherTrainings,
          technicalskills: cv.TechnicalSkills,
          achievements: cv.Achievements,
          references: cv.References,
          skills: cv.Skill,
          courses: cv.Courses,
          personalInformation: cv.PersonalInformation,
          careerobjective: cv.CareerObjectives,
          careerObjectives_id: cv.careerObjectives_id,
          personalInformation_id: cv.personalInformation_id
        },
        isHide:{
          isAchievementsHidden: cv.Hidden.HideAchievements,
          isCertificatesHidden: cv.Hidden.HideCertificates,
          isCoursesHidden: cv.Hidden.HideCourses,
          isEducationsHidden: cv.Hidden.HideEducations,
          isExperiencesHidden: cv.Hidden.HideExperiences,
          isLanguagesHidden: cv.Hidden.HideLanguages,
          isMembershipsHidden: cv.Hidden.HideMemberships,
          isOtherTrainingsHidden: cv.Hidden.HideOtherTrainings,
          isReferencesHidden: cv.Hidden.HideReferences,
          isTechnicalSkillsHidden: cv.Hidden.HideTechnicalSkills,
        }
      };
    case "CVTEMPLATE":
      return {
        ...state,
        cvTemplate: action.payload.template,
        sections: action.payload.sections,
      };
    case "CVLANGIAGE":
      return {
        ...state,
        cvLanguage: action.payload.Language,
      };
    case "GETALLCV":
      return {
        ...state,
        MyTemplates: action.payload,
      };
    case "CVCOLOR":
      return {
        ...state,
        sections: {
          ...state.sections,
          color: action.payload.color,
        },
      };
    case "AUTH":
      return {
        ...state,
        email: localStorage.getItem("Email"),
        token: localStorage.getItem("token"),
        LastName: localStorage.getItem("LastName"),
        FirstName: localStorage.getItem("FirstName"),
      };
    case "ADDCERTIFICATE":
      return {
        ...state,
        template: {
          ...state.template,
          certificates: [...state.template.certificates, action.payload],
        },
      };
    case "ORDERCERTIFICATE":
      return {
        ...state,
        template: {
          ...state.template,
          certificates: action.payload.certificates,
        },
      };
    case "ADDEDUCATION":
      return {
        ...state,
        template: {
          ...state.template,
          educations: [...state.template.educations, action.payload],
        },
      };
    case "ORDEREDUCATION":
      return {
        ...state,
        template: {
          ...state.template,
          educations: action.payload.educations,
        },
      };
    case "ADDEXPERIENCE":
      return {
        ...state,
        template: {
          ...state.template,
          experiences: [...state.template.experiences, action.payload],
        },
      };
    case "ORDEREXPERIENCE":
      return {
        ...state,
        template: {
          ...state.template,
          experiences: action.payload.experiences,
        },
      };
    case "ADDCOURSES":
      return {
        ...state,
        template: {
          ...state.template,
          courses: [...state.template.courses, action.payload],
        },
      };
    case "ORDERCOURSES":
      return {
        ...state,
        template: {
          ...state.template,
          courses: action.payload.courses,
        },
      };
    case "ADDLANGUAGE":
      return {
        ...state,
        template: {
          ...state.template,
          languages: [...state.template.languages, action.payload],
        },
      };
    case "ORDERLANGUAGE":
      return {
        ...state,
        template: {
          ...state.template,
          languages: action.payload.languages,
        },
      };
    case "ADDMEMBERSHIP":
      return {
        ...state,
        template: {
          ...state.template,
          memberships: [...state.template.memberships, action.payload],
        },
      };
    case "ORDERMEMBERSHIP":
      return {
        ...state,
        template: {
          ...state.template,
          memberships: action.payload.memberships,
        },
      };
    case "ADDOTHERTRAINING":
      return {
        ...state,
        template: {
          ...state.template,
          othertraining: [...state.template.othertraining, action.payload],
        },
      };
    case "ORDEROTHERTRAINING":
      return {
        ...state,
        template: {
          ...state.template,
          othertraining: action.payload.othertraining,
        },
      };
    case "ADDTECHNICALSKILL":
      return {
        ...state,
        template: {
          ...state.template,
          technicalskills: [...state.template.technicalskills, action.payload],
        },
      };
    case "ORDERTECHNICALSKILL":
      return {
        ...state,
        template: {
          ...state.template,
          technicalskills: action.payload.technicalskills,
        },
      };
    case "ADDREFERENCE":
      return {
        ...state,
        template: {
          ...state.template,
          references: [...state.template.references, action.payload],
        },
      };
    case "ORDERREFERENCE":
      return {
        ...state,
        template: {
          ...state.template,
          references: action.payload.references,
        },
      };
    case "ADDSKILL":
      return {
        ...state,
        template: {
          ...state.template,
          skills: action.payload.skills,
        },
      };
    case "DELETEREFERENCE":
      var temp = state.template.references;
      temp = temp.filter((e) => e._id != action.payload.eference_id);
      return {
        ...state,
        template: {
          ...state.template,
          references: temp,
        },
      };
    case "DELETECOURSES":
      var temp = state.template.courses;
      temp = temp.filter((e) => e._id != action.payload.courses_id);
      return {
        ...state,
        template: {
          ...state.template,
          courses: temp,
        },
      };
    case "EDITREFERENCE":
      var temp = state.template.references;
      temp.map((e, i) => {
        if (e._id == action.payload._id) {
          e.Name = action.payload.Name;
        }
      });
      return {
        ...state,
        template: {
          ...state.template,
          references: temp,
        },
      };
    case "EDITCOURSES":
      var temp = state.template.courses;
      temp.map((e, i) => {
        if (e._id == action.payload._id) {
          e.Name = action.payload.Name;
        }
      });
      return {
        ...state,
        template: {
          ...state.template,
          courses: temp,
        },
      };
    case "COPYREFERENCE":
      return {
        ...state,
        template: {
          ...state.template,
          references: [...state.template.references, action.payload],
        },
      };
    case "COPYCOURSES":
      return {
        ...state,
        template: {
          ...state.template,
          courses: [...state.template.courses, action.payload],
        },
      };
    case "DELETECERTIFICATE":
      var temp = state.template.certificates;
      temp = temp.filter((e) => e._id != action.payload.certificate_id);
      return {
        ...state,
        template: {
          ...state.template,
          certificates: temp,
        },
      };
    case "EDITCERTIFICATE":
      var temp = state.template.certificates;
      temp.map((e, i) => {
        if (e._id == action.payload._id) {
          e.Name = action.payload.Name;
          e.Description = action.payload.Description;
          e.Year = action.payload.Year;
          e.NameAr = action.payload.NameAr;
          e.DescriptionAr = action.payload.DescriptionAr;
        }
      });
      return {
        ...state,
        template: {
          ...state.template,
          certificates: temp,
        },
      };
    case "COPYCERTIFICATE":
      return {
        ...state,
        template: {
          ...state.template,
          certificates: [...state.template.certificates, action.payload],
        },
      };
    case "DELETEEDUCATION":
      var temp = state.template.educations;
      temp = temp.filter((e) => e._id != action.payload.education_id);
      return {
        ...state,
        template: {
          ...state.template,
          educations: temp,
        },
      };
    case "EDITEDUCATION":
      var temp = state.template.educations;
      temp.map((e, i) => {
        if (e._id == action.payload._id) {
          e.Faculty = action.payload.Faculty;
          e.UniversityName = action.payload.UniversityName;
          e.City = action.payload.City;
          e.YearStart = action.payload.YearStart;
          e.YearEnd = action.payload.YearEnd;
          e.DegreeFrom100 = action.payload.DegreeFrom100;
          e.DegreeFrom5 = action.payload.DegreeFrom5;
          e.Grade = action.payload.Grade;
        }
      });
      return {
        ...state,
        template: {
          ...state.template,
          educations: temp,
        },
      };
    case "COPYEDUCATION":
      return {
        ...state,
        template: {
          ...state.template,
          educations: [...state.template.educations, action.payload],
        },
      };
    case "DELETEOTHERTRAINING":
      var temp = state.template.othertraining;
      temp = temp.filter((e) => e._id != action.payload.otherTraining_id);
      return {
        ...state,
        template: {
          ...state.template,
          othertraining: temp,
        },
      };
    case "EDITOTHERTRAINING":
      var temp = state.template.othertraining;
      temp.map((e, i) => {
        if (e._id == action.payload._id) {
          e.Name = action.payload.Name;
        }
      });
      return {
        ...state,
        template: {
          ...state.template,
          othertraining: temp,
        },
      };
    case "COPYOTHERTRAINING":
      return {
        ...state,
        template: {
          ...state.template,
          othertraining: [...state.template.othertraining, action.payload],
        },
      };
    case "EDITCAREEROBJECTIVE":
      return {
        ...state,
        template: {
          ...state.template,
          careerobjective: action.payload,
        },
      };
    case "DELETECAREEROBJECTIVE":
      return {
        ...state,
        template: {
          ...state.template,
          careerobjective: "",
        },
      };
    case "DELETELANGUAGE":
      var temp = state.template.languages;
      temp = temp.filter((e) => e._id != action.payload.language_id);
      return {
        ...state,
        template: {
          ...state.template,
          languages: temp,
        },
      };
    case "EDITLANGUAGE":
      var temp = state.template.languages;
      temp.map((e, i) => {
        if (e._id == action.payload._id) {
          e.Name = action.payload.Name;
          e.NameAr = action.payload.NameAr;
          e.Rate = action.payload.Rate;
        }
      });
      return {
        ...state,
        template: {
          ...state.template,
          languages: temp,
        },
      };
    case "COPYLANGUAGE":
      return {
        ...state,
        template: {
          ...state.template,
          languages: [...state.template.languages, action.payload],
        },
      };
    case "DELETEMEMBERSHIP":
      var temp = state.template.memberships;
      temp = temp.filter((e) => e._id != action.payload.membership_id);
      return {
        ...state,
        template: {
          ...state.template,
          memberships: temp,
        },
      };
    case "EDITMEMBERSHIP":
      var temp = state.template.memberships;
      temp.map((e, i) => {
        if (e._id == action.payload._id) {
          e.Name = action.payload.Name;
        }
      });
      return {
        ...state,
        template: {
          ...state.template,
          memberships: temp,
        },
      };
    case "COPYMEMBERSHIP":
      return {
        ...state,
        template: {
          ...state.template,
          memberships: [...state.template.memberships, action.payload],
        },
      };
    case "DELETEEXPERIENCE":
      var temp = state.template.experiences;
      temp = temp.filter((e) => e._id != action.payload.experience_id);
      return {
        ...state,
        template: {
          ...state.template,
          experiences: temp,
        },
      };
    case "EDITEXPERIENCE":
      var temp = state.template.experiences;
      temp.map((e, i) => {
        if (e._id == action.payload._id) {
          e.Name = action.payload.Name;
          e.Description = action.payload.Description;
          e.Start = action.payload.Start;
          e.End = action.payload.End;
          e.Project = action.payload.Project;
        }
      });
      return {
        ...state,
        template: {
          ...state.template,
          experiences: temp,
        },
      };
    case "COPYEXPERIENCE":
      return {
        ...state,
        template: {
          ...state.template,
          experiences: [...state.template.experiences, action.payload],
        },
      };
    case "DELETETECHNICALSKILL":
      var temp = state.template.technicalskills;
      temp = temp.filter((e) => e._id != action.payload.technicalSkill_id);
      return {
        ...state,
        template: {
          ...state.template,
          technicalskills: temp,
        },
      };
    case "EDITTECHNICALSKILL":
      var temp = state.template.technicalskills;
      temp.map((e, i) => {
        if (e._id == action.payload._id) {
          e.Name = action.payload.Name;
          e.RateFrom5 = action.payload.RateFrom5;
        }
      });
      return {
        ...state,
        template: {
          ...state.template,
          technicalskills: temp,
        },
      };
    case "COPYTECHNICALSKILL":
      return {
        ...state,
        template: {
          ...state.template,
          technicalskills: [...state.template.technicalskills, action.payload],
        },
      };
    case "ADDACHIEVEMENT":
      return {
        ...state,
        template: {
          ...state.template,
          achievements: [...state.template.achievements, action.payload],
        },
      };
    case "COPYACHIEVEMENT":
      return {
        ...state,
        template: {
          ...state.template,
          achievements: [...state.template.achievements, action.payload],
        },
      };
    case "EDITACHIEVEMENT":
      var temp = state.template.achievements;
      temp.map((e, i) => {
        if (e._id == action.payload._id) {
          e.Name = action.payload.Name;
          e.NameAr = action.payload.NameAr;
        }
      });
      return {
        ...state,
        template: {
          ...state.template,
          achievements: temp,
        },
      };
    case "DELETEACHIEVEMENT":
      var temp = state.template.achievements;
      temp = temp.filter((e) => e._id != action.payload.achievement_id);
      return {
        ...state,
        template: {
          ...state.template,
          achievements: temp,
        },
      };
    case "ORDERACHIEVEMENT":
      return {
        ...state,
        template: {
          ...state.template,
          achievements: action.payload.achievement,
        },
      };
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        firstName: action.payload.data.FirstName,
        lastName: action.payload.data.LastName,
        email: action.payload.data.Email,
        id: action.payload.data._id,
        toast: !state.toast,
        toastMessageEN: "login success",
        toastMessageAR: "تم تسجيل الدخول بنجاح",
        toastType: "success",
      };
    case "SIGNUP":
      return {
        ...state,
        token: action.payload.token,
        firstName: action.payload.data.FirstName,
        lastName: action.payload.data.LastName,
        email: action.payload.data.Email,
        id: action.payload.data._id,
        toast: !state.toast,
        toastMessageEN: "signup success",
        toastMessageAR: "تم إنشاء الحساب بنجاح",
        toastType: "success",
      };
    case "ERROR":
      return {
        ...state,
        toast: !state.toast,
        toastMessageEN: "sorry something went wrong",
        toastMessageAR: "عذراً حدث خطأ ما أعد المحاولة",
        toastType: "error",
      };
    case "SUCCESS":
      return {
        ...state,
        toast: !state.toast,
        toastMessageEN: "save success",
        toastMessageAR: "تم الحفظ بنجاح",
        toastType: "success",
      };
    case "HIDECERTIFICATE":
      return {
        ...state,
        isHide: { ...state.isHide, isCertificatesHidden: !state.isHide.isCertificatesHidden },
      };
    case "HIDEEDUCATION":
      return {
        ...state,
        isHide: { ...state.isHide, isEducationsHidden: !state.isHide.isEducationsHidden },
      };
    case "HIDEEXPERIENCE":
      return {
        ...state,
        isHide: { ...state.isHide, isExperiencesHidden: !state.isHide.isExperiencesHidden },
      };
    case "HIDELANGUAGE":
      return {
        ...state,
        isHide: { ...state.isHide, isLanguagesHidden: !state.isHide.isLanguagesHidden },
      };
    case "HIDEMEMBERSHIP":
      return {
        ...state,
        isHide: { ...state.isHide, isMembershipsHidden: !state.isHide.isMembershipsHidden },
      };
    case "HIDEOTHERTRAINING":
      return {
        ...state,
        isHide: { ...state.isHide, isOtherTrainingsHidden: !state.isHide.isOtherTrainingsHidden },
      };
    case "HIDETECHNICALSKILL":
      return {
        ...state,
        isHide: { ...state.isHide, isTechnicalSkillsHidden: !state.isHide.isTechnicalSkillsHidden },
      };
    case "HIDEREFERENCE":
      return {
        ...state,
        isHide: { ...state.isHide, isReferencesHidden: !state.isHide.isReferencesHidden },
      };
      case "HIDECOURSES":
        return {
          ...state,
          isHide: { ...state.isHide, isCoursesHidden: !state.isHide.isCoursesHidden },
        };
    default:
      return state;
  }
}
