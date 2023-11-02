import axios from "axios";
import { baseApiURL } from "../constants";

export const axiosInstance = axios.create({
    baseURL: baseApiURL,
    timeout: 10000,
});

/**
 * headers: {
        "Content-Type": "application/json",
    },
 * 
 */


export { authEndpoints } from "./authApi";
export { postData, getData, putData, deleteData } from "./methods";

