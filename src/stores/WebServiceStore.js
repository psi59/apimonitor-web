import {observable} from "mobx";
import {asyncAction} from "mobx-utils";
import {autobind} from "core-decorators";
import { webServiceRepository } from "./repositories/WebServiceRepository";

@autobind
class WebServiceStore {
    @observable list = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
        console.log("created WebServiceStore")
    }

    @asyncAction async *findAll(params) {
        const { data, status } = yield webServiceRepository.findAll(params);
        console.log(data);
    }
}

const webServiceStore = new WebServiceStore();
export default webServiceStore;
