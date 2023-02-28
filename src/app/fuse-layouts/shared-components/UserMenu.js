import React, {useState} from 'react';
import history from '@history';
import {Avatar, Button, Icon, ListItemIcon, ListItemText, Popover, MenuItem, Typography} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import {Link} from 'react-router-dom';
import { useToasts } from "react-toast-notifications";
import SetCookie from 'app/main/Hooks/SetCookie';
import GetCookie from 'app/main/Hooks/GetCookie';
import RemoveCookie from 'app/main/Hooks/RemoveCookie';
import Api from '../../main/Api';

function UserMenu(props)
{

//custom method
const { addToast } = useToasts();

const userName = GetCookie('Username');
const userEmail = GetCookie('Email');
const phoneNumber = GetCookie('Phone');

const logout = () => {
    const employeeName = GetCookie("Username");
    const userToken = GetCookie("Token");
    const logoutUrl = Api.AppBaseUrl + 'Logout/' + employeeName;
    fetch(logoutUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
        },
    })
        .then(res => res.json())
        .then((data) => {
          if (data.success === true) {

            RemoveCookie("Username");
            RemoveCookie("Email");
            RemoveCookie("Phone");
            RemoveCookie("Token");
            RemoveCookie("TenantId");
            SetCookie('IsLoggedIn', false);
            history.push({
                pathname: '/'
            });
            addToast(data.message, { appearance: 'success' }); 
        }else{
            addToast(data.message, { appearance: 'error' }); 
        }
        })
}

////end 


    const dispatch = useDispatch();
    const user = useSelector(({auth}) => auth.user);

    const [userMenu, setUserMenu] = useState(null);

    const userMenuClick = event => {
        setUserMenu(event.currentTarget);
    };

    const userMenuClose = () => {
        setUserMenu(null);
    };

    return (
        <React.Fragment>

            <Button className="h-64" onClick={userMenuClick}>
                {user.data.photoURL ?
                    (
                        <Avatar className="" alt="user photo" src={user.data.photoURL}/>
                    )
                    :
                    (
                        <Avatar className="">
                            {userName}
                        </Avatar>
                    )
                }

                <div className="hidden md:flex flex-col ml-12 items-start">
                    <Typography component="span" className="normal-case font-600 flex">
                        {userName}
                    </Typography>
                    <Typography className="text-11 capitalize" color="textSecondary">
                        {user.role.toString()}
                    </Typography>
                </div>

                <Icon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</Icon>
            </Button>

            <Popover
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={userMenuClose}
                anchorOrigin={{
                    vertical  : 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical  : 'top',
                    horizontal: 'center'
                }}
                classes={{
                    paper: "py-8"
                }}
            >
             
                    <React.Fragment>
                        <MenuItem component={Link} to="/pages/profile" onClick={userMenuClose}>
                            <ListItemIcon className="min-w-40">
                                <Icon>account_circle</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="My Profile"/>
                        </MenuItem>
                        <MenuItem component={Link} to="/apps/mail" onClick={userMenuClose}>
                            <ListItemIcon className="min-w-40">
                                <Icon>mail</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Inbox"/>
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                logout()
                                userMenuClose();
                            }}
                        >
                            <ListItemIcon className="min-w-40">
                                <Icon>exit_to_app</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Logout"/>
                        </MenuItem>
                    </React.Fragment>

            </Popover>
        </React.Fragment>
    );
}

export default UserMenu;
