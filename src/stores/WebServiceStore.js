import {flow, observable} from "mobx";
import {asyncAction} from "mobx-utils";
import webServiceRepository from "./repositories/WebServiceRepository";
import autobind from "autobind-decorator";
import {WebServiceListModel} from "./models/WebServiceListModel";
import WebServiceModel from "./models/WebServiceModel";
import {RepositoryResponseModel} from "./models/RepositoryResponseModel";

@autobind
class WebServiceStore {
    @observable
    webServiceList = new WebServiceListModel();

    @observable
    webService = new WebServiceModel();

    constructor(rootStore) {
        this.rootStore = rootStore;
        console.log("created WebServiceStore")
    }

    @asyncAction
    async *findOne(id) {
        const {data, status} = yield webServiceRepository.findOne(id);
        console.log(data);
        const { success, result } = data;
        if (!success) {
            console.log("API Error")
        }
        this.webService = new WebServiceModel(result);
    }

    @asyncAction
    async *findAll(params) {
        const { data, status } = yield webServiceRepository.findAll(params);
        console.log(data);
        const { success, result } = data;
        if (!success) {
            console.log("API Error")
        }
        this.webServiceList = new WebServiceListModel(result);

        console.log("webServiceList=", this.webServiceList);
    }

    @asyncAction
    async *deleteOne(id) {
        try {
            const {data, status} = yield webServiceRepository.deleteOne(id);
            console.log(data);
        } catch (e) {
            console.log('API Error:', e.response);
        }
    }

    createOne = flow(function * (webService) {
        try {
            const {data, status} = yield webServiceRepository.createOne(webService);
            console.log(data);
            return new RepositoryResponseModel(data, status);
        } catch (e) {
            console.log('API Error:', e.response);
            const { data, status } = e.response;
            return new RepositoryResponseModel(data, status);
        }
    })
}

export default new WebServiceStore();
