import axios from "axios";

class ResultRepository {
    URL = "http://localhost:1323/v1/results";

    constructor(url) {
        this.URL = this.URL || url;
    }

    findByWebServiceId(webServiceId, params) {
        return axios.get(`${this.URL}?web_service_id=${webServiceId}`, params);
    }
}

export default new ResultRepository();
