import {observable} from "mobx";
import ResultListItemModel from "./ResultListItemModel";

class ResultListModel {
    @observable totalCount = 0;
    @observable totalPage = 0;
    @observable currentPage = 0;
    @observable hasNextPage = false;
    @observable items = [];

    constructor(data) {
        if (!data)
            return this;
        this.totalCount = data.total_count;
        this.totalPage = data.total_page;
        this.currentPage = data.current_page;
        this.hasNextPage = data.has_next_page;
        this.items = data.items.map(item => new ResultListItemModel(item));
    }
}

export default ResultListModel;
