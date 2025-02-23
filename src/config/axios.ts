import axios from 'axios';
import { toast } from 'react-toastify';

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_DEV
});

console.log("Base URL:", import.meta.env.VITE_BASE_URL_DEV);

instance.interceptors.request.use(
    (config) => {
        let authState = window.sessionStorage.getItem("token");

        config.headers.Authorization = `Bearer ${authState}`;
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response.status === 401){
            sessionStorage.clear();
            toast("Session timed out.");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        if(response.status === 200){
            if(response.data.message === "" || response.data.message === undefined){
                console.log("");
            }
            else{
                toast(response.data.message);
            }
        }
        return response;
    },
    (error) => {
        if(!error?.response?.data){
            return;
        }
        if(error.response.status >= 300){
            return toast(
                !!error.response.data.error
                ?error.response.data.error
                : "check your internet connection"
            );
        }
        return Promise.reject(error);
    }
);