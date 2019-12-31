import axios from "axios";
import {getApiUrl} from "../../helpers/API";

class WebServiceRepository {
    URL = `v1/webservices`;

    constructor(url) {
        this.URL = url || this.URL;
    }

    findOne(id) {
        return axios.get(`${this.URL}/${id}`)
    }

    findAll(params) {
        return axios.get(this.URL, { params })
    }

    deleteOne(id) {
        return axios.delete(`${this.URL}/${id}`)
    }
}

export default new WebServiceRepository("http://localhost:1323/v1/webservices");
