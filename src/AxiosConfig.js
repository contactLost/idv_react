import React from 'react';
import axios from 'axios';
import Cookies from "universal-cookie"
const AXIOS = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    params: {} // do not remove this, its added to add params later in the config
});

axios.defaults.headers.post['Content-Type'] = 'application/json';

AXIOS.interceptors.request.use(function (config) {

    const cookies = new Cookies()
    var token = cookies.get("token")
    console.log(token)
    if (token != "") {

        config.headers = {
            Authorization: `Bearer ${token}`
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

//In hindsight this was a bad idea
// // Response interceptor for API calls
// AXIOS.interceptors.response.use((response) => {
//     return response
// }, async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 403 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         const access_token = await refreshAccessToken();
//         console.log(access_token)
//         axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
//         return AXIOS(originalRequest);
//     }
//     return Promise.reject(error);
// });

// function refreshAccessToken(){

//     return AXIOS.post("/auth/login",
//             {
//                 "userName": sessionStorage.getItem("username"),
//                 "password": sessionStorage.getItem("password")
//             }).then(resp => resp.data["token"])
// }

export default AXIOS;