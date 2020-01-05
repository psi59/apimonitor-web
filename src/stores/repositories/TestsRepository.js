import axios from "axios";
import {getApiUrl} from "../../helpers/API";
import TestModel from "../models/TestModel";

class TestRepository {
    Host = "http://localhost:1323/v1";

    constructor(host) {
        this.Host = this.Host || host;
    }

    findById(test_id) {
        return axios.get(`${this.Host}/tests/${test_id}`)
    }

    findAll(service_id, params) {
        return axios.get(`${this.Host}/webservices/${service_id}/tests`, { params })
    }

    deleteOne(service_id, test_id) {
        return axios.delete(`${this.Host}/tests/${test_id}`)
    }

    updateOne(test) {
        if (!test) {
            return {
                data: null,
                status: 400,
            }
        }
        return axios.put(`${this.Host}/tests/${test.id}`, test)
    }
}

export default new TestRepository();
