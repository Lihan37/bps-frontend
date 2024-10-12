import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000/', 
    withCredentials: true
})

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;