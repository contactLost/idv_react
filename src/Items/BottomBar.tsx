import {useState} from 'react';

import Button from '@mui/material/Button';
import * as AxiosConfig from "../AxiosConfig.js";

import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function UserManagement(props) {

    const navigate = useNavigate();

    async function changePasswordHandler(){
        var newPass = prompt("New Password")

        var user = JSON.parse(sessionStorage.getItem("userinfo")!)

        const result = await AxiosConfig.default.post(
            "/user/updatePassword",
            {
                "id": user.id,
                "userName": user.userName,
                "password": newPass
            }).then(resp=> {
                sessionStorage.clear()
                navigate("/")})
    }

    async function logoutHandler(){
        sessionStorage.clear()
        navigate("/")
    }


    return (
        
        <>
        <Button sx={{"marginTop": "10px","marginLeft":"10px"}} variant="outlined" onClick={changePasswordHandler}>
            Change Password
        </Button>
        <Button sx={{"marginTop": "10px","marginLeft":"10px"}} variant="outlined" onClick={logoutHandler}>
            Logout
        </Button>
        </>
    );

}
