const apiUrl = 'http://localhost:1323';

export const getApiUrl = (endpoint) => {
    return `${apiUrl}/${endpoint}`;
};
