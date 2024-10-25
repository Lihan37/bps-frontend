import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://bps-server.vercel.app/', 
    withCredentials: true
})

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;