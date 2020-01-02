import {observable} from "mobx";
import {asyncAction} from "mobx-utils";
import resultStore from "./repositories/ResultRepository";
import autobind from "autobind-decorator";
import ResultListModel from "./models/ResultListModel";

@autobind
class ResultStore {
    @observable
    resultList = new ResultListModel();

    constructor(rootStore) {
        this.rootStore = rootStore;
        console.log("created ResultStore")
    }

    @asyncAction
    async *findByWebServiceId(webServiceId, params) {
        const { data, status } = yield resultStore.findByWebServiceId(webServiceId, params);
        console.log(data);
        const { success, result } = data;
        if (!success) {
            console.log("API Error")
        }
        console.log("resultList=", data);
        this.resultList = new ResultListModel(result);
    }

    @asyncAction
    async *findByTestId(testId, params) {
        const { data, status } = yield resultStore.findByTestId(testId, params);
        console.log("resultList=", data);
        const { success, result } = data;
        if (!success) {
            console.log("API Error")
        }
        this.resultList = new ResultListModel(result);
    }
}

export default new ResultStore();
