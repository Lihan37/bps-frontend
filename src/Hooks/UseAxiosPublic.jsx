import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://app.bps.org.bd/', 
    withCredentials: true
})

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;