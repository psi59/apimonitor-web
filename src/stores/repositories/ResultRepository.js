import axios from "axios";

class ResultRepository {
    Host = "http://localhost:1323/v1";

    constructor(url) {
        this.Host = this.Host || url;
    }

    findByWebServiceId(webServiceId, params) {
        return axios.get(`${this.Host}/webservices/${webServiceId}/results`, params);
    }

    findByTestId(testId, params) {
        return axios.get(`${this.Host}/tests/${testId}/results`, params);
    }
}

export default new ResultRepository(process.env.AM_API_URL);
