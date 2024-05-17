import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}` 


export const login = (email, password) => {
    return axios.post(BASE_URL + '/login', {email: email, password: password})
}

export const getProducts = () => {
    return axios.get(BASE_URL + '/products')
}

export const getProductsByDateInterval = (startDate, endDate) => {
    return axios.get(BASE_URL + '/products_by_date_interval', {start_date: startDate, end_date: endDate})
}

export const getAnomalies = () => {
    return axios.get(BASE_URL + '/anomalies')
}

export const getAnomaliesByDateInterval = (startDate, endDate) => {
    return axios.get(BASE_URL + '/anomalies_by_date_interval', {start_date: startDate, end_date: endDate})
}