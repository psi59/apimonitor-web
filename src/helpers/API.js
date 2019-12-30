import axios from "axios";

const apiUrl = 'http://localhost:1323';

export const getApiUrl = (endpoint) => {
    return `${apiUrl}/${endpoint}`;
};

export const updateTest = (test) => {
    return  axios.put(getApiUrl(`v1/tests/${test.id}`), test);
};
