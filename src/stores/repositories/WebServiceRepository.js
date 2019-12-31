class WebServiceRepository {
    URL = `v1/webservices`;

    constructor(url) {
        this.URL = url || this.URL;
    }

    findAll(params) {
        return axios.get(this.URL, { params })
    }
}

const webServiceRepository = new WebServiceRepository();
export default webServiceRepository;
