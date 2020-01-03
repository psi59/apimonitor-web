import axios from "axios";
import {getApiUrl} from "../../helpers/API";

class WebServiceRepository {
    URL = "http://localhost:1323/v1";

    constructor(url) {
        this.URL = url || this.URL;
    }

    findOne(id) {
        return axios.get(`${this.URL}/webservices/${id}`)
    }

    findAll(params) {
        return axios.get(`${this.URL}/webservices`, { params })
    }

    deleteOne(id) {
        return axios.delete(`${this.URL}/webservices/${id}`)
    }

    createOne(webService) {
        return axios.post(`${this.URL}/webservices`, webService)
    }
}

export default new WebServiceRepository();
