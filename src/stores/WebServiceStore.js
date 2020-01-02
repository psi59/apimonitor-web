import {observable} from "mobx";
import {asyncAction} from "mobx-utils";
import webServiceRepository from "./repositories/WebServiceRepository";
import autobind from "autobind-decorator";
import {WebServiceListModel} from "./models/WebServiceListModel";
import WebServiceModel from "./models/WebServiceModel";

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
            return status === 200;
        } catch (e) {
            console.log('API Error:', e);
            return false
        }
    }
}

export default new WebServiceStore();
