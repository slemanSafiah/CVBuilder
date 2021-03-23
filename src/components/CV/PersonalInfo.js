import React, { useState, useEffect } from "react";
import { Button, Paper, Grid, Avatar, TextField } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useTranslation } from "react-i18next";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router-dom";
import defaultImg from "./../../img/stylingcv-default.jpg";
import { PeraonalInfoAction } from "./../../store/action/action";
import { useSelector, useDispatch } from "react-redux";

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/cvbuilder/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'm8k5pnic';

export default function PersonalInfo() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  let history = useHistory();
  const id = useSelector((state) => state.template.personalInformation_id);
  const personalData = useSelector((state) => state.template.personalInformation);
  const [firstName, setFirstName] = useState(personalData ? personalData.FirstName : '');
  const [lastName, setLastName] = useState(personalData ? personalData.LastName : '');
  const [email, setEmail] = useState(personalData ? personalData.Email : '');
  const [linkedIn, setLinkedIn] = useState(personalData ? personalData.LinkedIn : '');
  const [birth, setBirth] = useState(personalData ? personalData.Birth : new Date());
  const [city, setCity] = useState(personalData ? personalData.City : '');
  const [country, setCountry] = useState(personalData ? personalData.Country : '');
  const [nationality, setNationality] = useState(personalData ? personalData.Nationality : '');
  const [maritalStatus, setMaritalStatus] = useState(personalData ? personalData.MaritalStatus : 1);
  const [phone, setPhone] = useState(personalData ? personalData.Phone : '');
  const [imageURL, setImageURL] = useState(personalData ? personalData.Image : defaultImg);
  const [firstNameAr, setFirstNameAr] = useState(personalData ? personalData.FirstNameAr : '');
  const [lastNameAr, setLastNameAr] = useState(personalData ? personalData.LastNameAr : '');
  const [cityAr, setCityAr] = useState(personalData ? personalData.CityAr : '');
  const [countryAr, setCountryAr] = useState(personalData ? personalData.CountryAr : '');
  const [nationalityAr, setNationalityAr] = useState(personalData ? personalData.nationalityAr : '');
  const lan = useSelector((state) => state.sections.twolan);
  const [secondName, setSecondName] = useState(personalData ? personalData.SecondName : '');
  const [secondNameAr, setSecondNameAr] = useState(personalData ? personalData.SecondNameAr : '');

  const send = () => {
    if (email == undefined || lastName == undefined || firstName == undefined) {
      alert("please fill all fields")
    }
    else {
      const data = {
        _id: id,
        FirstName: firstName,
        LastName: lastName,
        SecondName: secondName,
        LinkedIn: linkedIn,
        Email: email,
        Phone: phone,
        Birth: birth,
        City: city,
        Country: country,
        Nationality: nationality,
        MaritalStatus: maritalStatus,
        Image: imageURL,
        FirstNameAr: firstNameAr,
        LastNameAr: lastNameAr,
        SecondNameAr: secondNameAr,
        CityAr: cityAr,
        CountryAr: countryAr,
        NationalityAr: nationalityAr,
      };
      dispatch(PeraonalInfoAction(data));
      history.push("/buildcv/careerobjectives");
    }
  };


  const encodeImageFileAsURL = (file) => {
    var reader = new FileReader();
    reader.onloadend = function () {
      const imgData = reader.result;
      // console.log('RESULT', imgData);
      uploadToCloudinary(imgData)
    }
    reader.readAsDataURL(file);
  }

  const uploadToCloudinary = (imgData) => {
    if (imgData) {
      const formImageData = new FormData();
      formImageData.append('file', imgData);
      formImageData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formImageData,
      })
        .then(response => response.json())
        .then((data) => {
          if (data.secure_url !== '') {
            const uploadedFileUrl = data.secure_url;
            // console.log(uploadedFileUrl);
            setImageURL(uploadedFileUrl)
          }
        })
        .catch(err => console.error(err));
    }
  }

  return (
    <Paper
      elevation={3}
      className="buildcvbar"
      style={{ width: "100%" }}
      data-aos="fade-up-left"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1000"
    >
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        spacing={8}
      >
        <Grid item xs={12}>
          <h3>{t("PersonalInfo")}</h3> <hr />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid item xs={12}>
              <Avatar alt="Remy Sharp" src={defaultImg} className="avatar" />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}
                className="mt-3"
              >
                <input
                  type="file"
                  name="file"
                  placeholder={t("Upload")}
                  className="input1"
                  onChange={(e) => {
                    const files = e.target.files;
                    encodeImageFileAsURL(files[0]);
                  }}
                />
              </Button>
            </Grid>{" "}
          </Grid>{" "}
        </Grid>
        <Grid
          item
          xs={12}
          container
          spacing={3}
          alignItems="center"
          justify="center"
          style={{ textAlign: "center" }}
        >
          <Grid item xs={12} sm={4}>
            <TextField
              style={{ width: '100%' }}
              label={t("FirstName")}
              variant="filled"
              color="primary"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              style={{ width: '100%' }}
              label={t("SecondName")}
              variant="filled"
              color="primary"
              onChange={(e) => {
                setSecondName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              style={{ width: '100%' }}
              label={t("LastName")}
              variant="filled"
              color="primary"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4} className={lan === 0 ? "arhide" : ""}>
            <TextField
              style={{ width: '100%' }}
              label={t("FirstNameAr")}
              variant="filled"
              color="primary"
              onChange={(e) => {
                setFirstNameAr(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} className={lan === 0 ? "arhide" : ""}>
            <TextField
              style={{ width: '100%' }}
              label={t("SecondNameAr")}
              variant="filled"
              color="primary"
              onChange={(e) => {
                setSecondNameAr(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} className={lan === 0 ? "arhide" : ""}>
            <TextField
              style={{ width: '100%' }}
              label={t("LastNameAr")}
              variant="filled"
              color="primary"
              onChange={(e) => setLastNameAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              style={{ width: '100%' }}
              label={t("LinkedInAccount")}
              variant="filled"
              color="primary"
              onChange={(e) => setLinkedIn(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              style={{ width: '100%' }}
              label={t("Email")}
              variant="filled"
              color="primary"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              style={{ width: '100%' }}
              label={t("PhoneNumber")}
              variant="filled"
              color="primary"
              type="number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              style={{ width: '100%' }}
              label={t("Date Of Birth")}
              variant="filled"
              color="primary"
              type="date"
              onChange={(e) => setBirth(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              style={{ width: '100%' }}
              label={t("City")}
              variant="filled"
              color="primary"
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              style={{ width: '100%' }}
              label={t("Country")}
              variant="filled"
              color="primary"
              onChange={(e) => setCountry(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4} className={lan === 0 ? "arhide" : ""}>
            <TextField
              style={{ width: '100%' }}
              label={t("CityAr")}
              variant="filled"
              color="primary"
              onChange={(e) => setCityAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4} className={lan === 0 ? "arhide" : ""}>
            <TextField
              style={{ width: '100%' }}
              label={t("CountryAr")}
              variant="filled"
              color="primary"
              onChange={(e) => setCountryAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              style={{ width: '100%' }}
              label={t("Nationality")}
              variant="filled"
              color="primary"
              onChange={(e) => setNationality(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4} className={lan === 0 ? "arhide" : ""}>
            <TextField
              style={{ width: '100%' }}
              label={t("NationalityAr")}
              variant="filled"
              color="primary"
              onChange={(e) => setNationalityAr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              style={{ width: '100%' }}>
              <InputLabel id="demo-simple-select-label">
                {t("Marital Status")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              >
                <MenuItem value={1}>{t("Married")}</MenuItem>
                <MenuItem value={2}>{t("Single")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}></Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              className="save mt-3"
              style={{ float: "right" }}
              onClick={() => send()}
            >
              {t("next")}
            </Button>
          </Grid>
        </Grid>
      </Grid>{" "}
    </Paper>
  );
}
