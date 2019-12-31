import {observable} from "mobx";
import {asyncAction} from "mobx-utils";
import resultStore from "./repositories/ResultRepository";
import autobind from "autobind-decorator";
import {ResultListItemModel, ResultListModel} from "./models/Result";

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

        this.resultList = {
            totalCount: result.total_count,
            totalPage: result.total_page,
            currentPage: result.current_page,
            hasNextPage: result.has_next_page,
            items: result.items.map(data => new ResultListItemModel(data)),
        };

        console.log("resultList=", this.resultList);
    }
}

export default new ResultStore();
