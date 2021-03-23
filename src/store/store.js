import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./reducers";

import thunk from "redux-thunk";

const initialState = {
  sections: {
    careerobjective: 1,
    certificates: 1,
    courses: 1,
    education: 1,
    experience: 1,
    language: 1,
    membership: 1,
    othertraining: 1,
    referenc: 1,
    technicalskill: 1,
    skills: 1,
    twolan: 1,
    achievement: 1,
    certificateslen: 1,
    courseslen: 1,
    educationlen: 1,
    experiencelen: 1,
    languagelen: 1,
    membershiplen: 1,
    othertraininglen: 1,
    referenclen: 1,
    technicalskilllen: 1,
    color: 1,
    achievementlen: 1,
  },
  template: {
    certificates: [],
    educations: [],
    experiences: [],
    languages: [],
    memberships: [],
    othertraining: [],
    technicalskills: [],
    achievements: [],
    references: [],
    skills: [],
    courses: [],
    personalInformation: {
      CityAr: "",
      CountryAr: "",
      Email: "",
      FirstName: "",
      FirstNameAr: "",
      LastName: "",
      LastNameAr: "",
      NationalityAr: "",
      Phone: "",
      SecondName: "",
      SecondNameAr: ""
    },
    careerobjective: {},
    careerObjectives_id: "",
    personalInformation_id: "",
  },
  isHide: {
    isAchievementsHidden: false,
    isCertificatesHidden: false,
    isCoursesHidden: false,
    isEducationsHidden: false,
    isExperiencesHidden: false,
    isLanguagesHidden: false,
    isMembershipsHidden: false,
    isOtherTrainingsHidden: false,
    isReferencesHidden: false,
    isTechnicalSkillsHidden: false,
  },
  MyTemplates: [],
  firstName: "",
  lastName: "",
  email: "",
  id: "",
  token: "",
  cvID: "",
  toast: false,
  toastMessageEN: "",
  toastMessageAR: "",
  toastType: "success",
  cvName: "",
  cvTemplate: "",
  cvLanguage: "",
};

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk)
     //, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
