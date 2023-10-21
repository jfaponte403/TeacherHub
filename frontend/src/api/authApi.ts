import axios from "axios";
import { baseApiURL } from "../constants";

export const authEndpoints = {
    login: "/login",
    register: "/register",
    verifyCode: "/verifyCode",
    sendCode: "/generateCode",
    resetPassword: "/updatePassword",
}

export const authApi = axios.create({
    baseURL: `${baseApiURL}/auth`,
})