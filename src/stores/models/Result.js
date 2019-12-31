import {extendObservable} from "mobx";

export class ResultListModel {
    totalCount = 0;
    totalPage = 0;
    currentPage = 0;
    hasNextPage = false;
    items = [];

    constructor(data) {
        extendObservable(this, data);
    }
}

export class ResultListItemModel {
    constructor(data) {
        extendObservable(this, data);
    }
}
