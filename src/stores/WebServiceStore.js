import {computed, observable, reaction} from "mobx";
import {asyncAction} from "mobx-utils";
import webServiceRepository from "./repositories/WebServiceRepository";
import WebServiceModel, {WebServiceListModel} from "./models/WebService";
import autobind from "autobind-decorator";

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

        this.webServiceList = {
            totalCount: result.total_count,
            totalPage: result.total_page,
            currentPage: result.current_page,
            hasNextPage: result.has_next_page,
            items: result.items.map(data => new WebServiceModel(data)),
        };

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
