import axios from "axios";

export const axiosSexure = axios.create({
    baseURL: 'http://localhost:5000'
})

const UseAxiosSecure = () => {
    return axiosSexure;
}

export default UseAxiosSecure;