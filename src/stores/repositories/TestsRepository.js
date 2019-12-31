import axios from "axios";
import {getApiUrl} from "../../helpers/API";

class TestRepository {
    URL = "";

    constructor(url) {
        this.URL = url;
    }

    findOne(service_id, test_id) {
        return axios.get(`${this.URL}/${test_id}?web_service_id=${service_id}`)
    }

    findAll(service_id, params) {
        return axios.get(`${this.URL}?web_service_id=${service_id}`, { params })
    }

    deleteOne(service_id, test_id) {
        return axios.delete(`${this.URL}/${test_id}?web_service_id=${service_id}`)
    }
}

export default new TestRepository("http://localhost:1323/v1/tests");
