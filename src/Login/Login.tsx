import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import * as AxiosConfig from "../AxiosConfig.js";
import Cookies from 'universal-cookie';

export default function SignIn() {

    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const cookies = new Cookies()

        AxiosConfig.default.post("/auth/login",
            {
                "userName": data.get("username"),
                "password": data.get("password")
            }).then((response) => {

                //console.log("Login Successful. Fetching user data...")
                //console.log(response.data["token"])
                cookies.set("token", response.data["token"], { path: '/' })
                //sessionStorage.setItem("token", response.data["token"])

                AxiosConfig.default.get("/auth/userinfo")
                    .then(resp => {
                        sessionStorage.setItem("userinfo", JSON.stringify( resp.data))
                        navigate("items")
                    })
                    .catch(reason => {
                        console.log("Something went wrong", reason)
                    })

            }).catch(reason => {
                console.log("User auth failed.")
                setError(true)
            })

    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>{error ? "Bad Credentials" : null}
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => { navigate("sign-up")}}
                >
                    Sign Up
                </Button>
            </Box>
        </Container>
    );
}