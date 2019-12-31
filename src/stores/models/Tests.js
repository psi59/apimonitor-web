import {extendObservable} from "mobx";

export class TestListItemModel {
    constructor(data) {
        extendObservable(this, data);
    }
}

export class TestListModel {
    totalCount = 0;
    totalPage = 0;
    currentPage = 0;
    hasNextPage = false;
    items = [];

    constructor(data) {
        extendObservable(this, data);
    }
}
