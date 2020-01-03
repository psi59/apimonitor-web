import {flow, observable} from "mobx";
import resultStore from "./repositories/ResultRepository";
import autobind from "autobind-decorator";
import ResultListModel from "./models/ResultListModel";
import {RepositoryResponseModel} from "./models/RepositoryResponseModel";

@autobind
class ResultStore {
    @observable
    resultList = new ResultListModel();

    constructor(rootStore) {
        this.rootStore = rootStore;
        console.log("created ResultStore")
    }

    findByWebServiceId = flow(function * (webServiceId, params) {
        try {
            const { data, status } = yield resultStore.findByWebServiceId(webServiceId, params);
            console.log(data);
            const { success, result } = data;
            if (!success) {
                console.log("API Error")
            }
            console.log("resultList=", data);
            this.resultList = new ResultListModel(result);
            return new RepositoryResponseModel(data, status);
        } catch (e) {
            const { data, status } = e.response;
            return new RepositoryResponseModel(data, status);
        }
    });

    findByTestId = flow(function*(testId, params) {
        try {
            const { data, status } = yield resultStore.findByTestId(testId, params);
            console.log("resultList=", data);
            const { success, result } = data;
            if (!success) {
                console.log("API Error")
            }
            this.resultList = new ResultListModel(result);
            return new RepositoryResponseModel(data, status);
        } catch (e) {
            const { data, status } = e.response;
            return new RepositoryResponseModel(data, status);
        }
    })
}

export default new ResultStore();
