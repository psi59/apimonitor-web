import axios from "axios";
import {getApiUrl} from "../../helpers/API";
import TestModel from "../models/TestModel";

class TestRepository {
    Host = "http://localhost:1323/v1";

    constructor(host) {
        this.Host = this.Host || host;
    }

    findById(testId) {
        return axios.get(`${this.Host}/tests/${testId}`)
    }

    findAll(serviceId, params) {
        return axios.get(`${this.Host}/webservices/${serviceId}/tests`, { params })
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

    createOne(serviceId, test) {
        if (!test) {
            return {
                data: null,
                status: 400,
            }
        }
        return axios.post(`${this.Host}/webservices/${serviceId}/tests`, test)
    }

    executeOne(test) {
        if (!test) {
            return {
                data: null,
                status: 400,
            };
        }
        return axios.get(`${this.Host}/tests/${test.id}/execute`, test)
    }
}

export default new TestRepository();
