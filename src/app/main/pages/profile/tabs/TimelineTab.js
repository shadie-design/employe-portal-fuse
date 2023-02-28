import React, { useEffect, useState, useRef } from 'react';
import {
    AppBar,
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Icon,
    IconButton,
    Input,
    List,
    ListItem,
    ListItemText,
    Paper,
    Toolbar,
    Typography
} from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Grid, FormControlLabel,
    TextField,
    RadioGroup,
    FormLabel, MenuItem, Radio } from '@material-ui/core';
import { TextFieldFormsy, CheckboxFormsy, RadioGroupFormsy, SelectFormsy } from '@fuse';
import Formsy from 'formsy-react';
import Api from 'app/main/Api';
import GetCookie from 'app/main/Hooks/GetCookie';
import SetCookie from 'app/main/Hooks/SetCookie';
import RemoveCookie from 'app/main/Hooks/RemoveCookie';
import { useToasts } from 'react-toast-notifications';


function TimelineTab() {
    //custom code 

    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);
    
    const { addToast } = useToasts();
    const userName = GetCookie('Username');
    const userEmail = GetCookie('Email');
    const phoneNumber = GetCookie('Phone');

    //--form fields start
  //security info
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [userRole, setUserRole] = useState(false);
  const [dateLastLoggedIn, setDateLastLoggedIn] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //employment details
  const [departmentName, setDepartmentName] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState(false);
  const [jobTitleName, setJobTitleName] = useState("");
  const [managerJobTitleName, setManagerJobTitleName] = useState("");
  const [natureOfEmploymentName, setNatureOfEmploymentName] = useState("");
  const [subDepartmentName, setSubDepartmentName] = useState("");
  const [employmentDate, setEmploymentDate] = useState("");
  const [reportToName, setReportToName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [number, setNumber] = useState("");
  const [managerName, setManagerName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [religionName, setReligionName] = useState("");
  const [email, setEmail] = useState("");
  const [personalPhoneNumber, setPersonalPhoneNumber] = useState("");
  const [identityDocumentNumber, setIdentityDocumentNumber] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [postalAddress, setPostalAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  //--form fields end
  useEffect(() => {
    GetEmployeeData();
    GetEmployeeUserInfo();
}, []);

  const GetEmployeeData = () => {
    const employeeDataUrl = Api.AppBaseUrl + 'EmployeePortal/Employee/GetEmployeeData/' + userName;
    fetch(employeeDataUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GetCookie("Token")}`,
      },
    })
      .then(res => res.json())
      .then((data) => {
        //console.log(data);
        if (data.success === true) {
          SetCookie('IsLoggedIn', true);
          //employment details

          setDepartmentName(data.data.departmentName);

          setEmployeeStatus(data.data.employeeStatus);
          setEmploymentDate(data.data.employmentDate);
          setJobTitleName(data.data.jobTitleName);
          setManagerJobTitleName(data.data.managerJobTitleName);
          setNatureOfEmploymentName(data.data.natureOfEmploymentName);
          setNumber(data.data.number);
          setSubDepartmentName(data.data.subDepartmentName)
          setReportToName(data.data.reportToName);
          setStartDate(data.data.startDate);
          setManagerName(data.data.managerName)
          //bio data
          setFirstName(data.data.firstName)
          setSurName(data.data.surName)
          setOtherNames(data.data.otherNames);
          setDateOfBirth(data.data.dateOfBirth);
          setGender(data.data.gender);
          setFullName(data.data.fullName);
          setMaritalStatus(data.data.maritalStatus);
          setReligionName(data.data.religionName);
          setEmail(data.data.email);
          setPersonalPhoneNumber(data.data.personalPhoneNumber);
          setIdentityDocumentNumber(data.data.identityDocumentNumber)
          setPhysicalAddress(data.data.physicalAddress)
          setPostalAddress(data.data.postalAddress)
          setPostalCode(data.data.postalCode);

        } else {
          SetCookie('IsLoggedIn', false);
          addToast(data.errorMessage, { appearance: 'error' });
        }

      });
  }

  const GetEmployeeUserInfo = () => {
    const employeeDataUrl = Api.AppBaseUrl + 'EmployeePortal/Employee/GetEmployeeUserInfoByName/' + userName;
    fetch(employeeDataUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GetCookie("Token")}`,
      },
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          SetCookie('IsLoggedIn', true);
          //employment details

          setEmailVerified(data.data.emailConfirmed);
          setPhoneVerified(data.data.phoneNumberConfirmed);
          setUserRole(data.data.selectedRolesStr)
          setDateLastLoggedIn(data.data.datelastModified);

        } else {
          addToast(data.errorMessage, { appearance: 'error' });
        }

      });
  }




    //
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/api/profile/timeline').then(res => {
            setData(res.data);
        });
    }, []);

    if (!data) {
        return null;
    }

    return (
        <div className="md:flex max-w-2xl">

            <div className="flex flex-col md:w-320 md:pr-32">
                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    <Card className="w-full">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Profile summary
                                </Typography>
                                <Button color="inherit" size="small">Edit</Button>
                            </Toolbar>
                        </AppBar>
                        <CardContent className="p-0">
                            <List>

                            </List>
                        </CardContent>
                    </Card>
                </FuseAnimateGroup>
            </div>


            <div className="flex flex-col flex-1  md:pr-32">

                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >

                    <Formsy

                        className="flex flex-col justify-center"
                    >

<Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  className="mb-4 w-full"
                                  label="First name"
                                  disabled={true}
                                  type="text"
                                  name="firstname"
                                  variant="standard"
                                  value={firstName || ''}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  className="mb-4 w-full"
                                  label="Sur name"
                                  disabled={true}
                                  type="text"
                                  name="surname"
                                  value={surName || ''}

                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  className="mb-4 w-full"
                                  label="Other names"
                                  disabled={true}
                                  type="text"
                                  name="othername"
                                  value={otherNames || ''}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  className="mb-4 w-full"
                                  label="Full name"
                                  disabled={true}
                                  type="text"
                                  name="fullname"
                                  value={fullName || ''}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  className="mb-4 w-full"
                                  label="Marital status"
                                  disabled={true}
                                  type="text"
                                  name="maritalstatus"
                                  value={maritalStatus || ''}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  className="mb-4 w-full"
                                  label="Religion"
                                  disabled={true}
                                  type="text"
                                  name="religion"
                                  value={religionName || ''}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  className="mb-4 w-full"
                                  label="Phone Number"
                                  disabled={true}
                                  type="text"
                                  name="mobile"
                                  value={personalPhoneNumber || ''}
                                  validators={['required']}
                                  errorMessages={['this field is required']}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  className="mb-4 w-full"
                                  label="Email"
                                  disabled={true}
                                  type="email"
                                  name="email"
                                  value={email || ''}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  className="mb-4 w-full"
                                  label="ID number"
                                  disabled={true}
                                  type="text"
                                  name="idnumber"
                                  value={identityDocumentNumber || ''}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  className="mb-4 w-full"
                                  label="Employee number"
                                  disabled={true}
                                  type="text"
                                  name="employeenumber"
                                  value={number || ''}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormLabel >Gender</FormLabel>
                                <RadioGroup
                                  className="mb-4"
                                  value={gender || ''}
                                  name="gender"
                                  row
                                >
                                  <FormControlLabel
                                    value="Male"
                                    control={<Radio disabled={true} checked={gender === "Male"} color='default' disableRipple />}
                                    label={<Typography >Male</Typography>}
                                    labelPlacement="end"
                                  />
                                  <FormControlLabel
                                    value="Female"
                                    control={<Radio disabled={true} checked={gender === "Female"} color='default' disableRipple />}
                                    label={<Typography >Female</Typography>}
                                    labelPlacement="end"
                                  />
                                  <FormControlLabel
                                    value="Others"
                                    control={<Radio disabled={true} checked={gender === "Other"} color='default' disableRipple  />}
                                    label={<Typography>Other</Typography>}
                                    labelPlacement="end"
                                  />
                                </RadioGroup>



                              </Grid>

                            </Grid>
                       

                       


                    </Formsy>
                </FuseAnimateGroup>

            </div>








        </div>
    );
}

export default TimelineTab;
