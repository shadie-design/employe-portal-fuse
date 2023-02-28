import React, {useEffect, useRef, useState} from 'react';
import {Button, Divider, Typography, InputAdornment, Icon} from '@material-ui/core';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import * as authActions from 'app/auth/store/actions';
import {useDispatch, useSelector} from 'react-redux';
import Api from '../../Api'
import SetCookie from '../../Hooks/SetCookie';
import GetCookie from '../../Hooks/GetCookie';
import RemoveCookie from '../../Hooks/RemoveCookie';
import { Redirect    } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

function JWTLoginTab(props)
{
   //login to server start
   const [emailNumberval, setemailval] = useState("");
   const [passval, setpassval] = useState("");
   const [isLoginSuccesful, setIsLoginSuccesful] = useState(false);
   const [isLoginInProgress, setIsLoginInProgress] = useState(false);
   const { addToast } = useToasts();
  
   const handleFormSubmit = () => {
   // event.preventDefault();        
    setIsLoginInProgress(true); 
   // fetch method
   const LoginUrl = Api.AppBaseUrl + 'EmployeePortal/Employee/ConfirmEmployeeExists/' + emailNumberval;
 fetch(LoginUrl, {
    method: 'GET',
    headers: { 
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
       },
  })
.then(res => res.json())
.then((data) => {
 if (data.success === true) {      
    loginToServer();

       
    
}else{
    addToast(data.errorMessage, { appearance: 'error' }); 
    setIsLoginInProgress(false);
}

});
}


const loginToServer = () => {       
    setIsLoginInProgress(true); 
   // fetch method
   const LoginUrl = Api.AppBaseUrl + 'Login';
   const username = emailNumberval;
   const password = passval;
   const sourceSystem = "employee portal";
   const user = { username, password,sourceSystem };

   fetch(LoginUrl, {
    method: 'POST',
    headers: { 
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
       },
    body: JSON.stringify(user)
  })
.then(res => res.json())
.then((data) => {
 if (data.success === true) {
         
        //set cookies
        SetCookie('Username', data.data.userName);
        SetCookie('Email', data.data.email);
        SetCookie('Phone', data.data.phoneNumber);
        SetCookie('TenantId', data.data.tenantId);
        SetCookie('Id', data.data.id);
        SetCookie('Token', data.data.token);
        SetCookie('IsLoggedIn', true);

        setIsLoginInProgress(false);
        addToast(data.message, { appearance: 'success' });
        setIsLoginSuccesful(true); 
       
    
}else{
    setTimeout(() => {
    setIsLoginSuccesful(false);
    addToast(data.message, { appearance: 'error' }); 
    setIsLoginInProgress(false);
}, 1000)
}

});

   
    

}



   ////end





    const dispatch = useDispatch();
    const login = useSelector(({auth}) => auth.login);

    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        if ( login.error && (login.error.email || login.error.password) )
        {
            formRef.current.updateInputsWithError({
                ...login.error
            });
            disableButton();
        }
    }, [login.error]);

    function disableButton()
    {
        setIsFormValid(false);
    }

    function enableButton()
    {
        setIsFormValid(true);
    }

    function handleSubmit(model)
    {
        dispatch(authActions.submitLogin(model));
    }

    if(isLoginSuccesful === true){
        return <Redirect to="/apps/dashboards/analytics" />;
    }else{

    return (
        <div className="w-full">
            <Formsy
                onValidSubmit={handleFormSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col justify-center w-full"
            >
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="email"
                    label="Username/Email"
                    validations={{
                        minLength: 4
                    }}
                    value={emailNumberval}
                    onChange={(e) => { setemailval(e.target.value) }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="password"
                    name="password"
                    label="Password"
                    validations={{
                        minLength: 4
                    }}
                    value={passval} 
                    onChange={(e) => { setpassval(e.target.value) }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16 normal-case"
                    aria-label="LOG IN"
                    disabled={!isFormValid}
                    value="legacy"
                >
                    Login
                </Button>

            </Formsy>


        </div>
    );
}


}

export default JWTLoginTab;
