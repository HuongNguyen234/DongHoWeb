import axios from 'axios'
import queryString from 'querystring'

const token = '';
const axiosClient = axios.create({
    baseURL:process.env.REACT_APP_API,
    headers:{
        'content-type':'application/json'
    },
    paramsSerializer: params => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async(config)=>{
    config.headers['Authorization'] = 'Bearer ' + token;
    return config;
},error => Promise.reject(error))

axiosClient.interceptors.response.use((response)=>{
    if(response&&response.data){
        return response.data;
    }
    return response;
},error => {throw error})

export default axiosClient;