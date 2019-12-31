import {extendObservable} from "mobx";

class WebServiceModel {
    constructor(data) {
        extendObservable(this, data);
    }
}

export default WebServiceModel;

export class WebServiceListModel {
    totalCount = 0;
    totalPage = 0;
    currentPage = 0;
    hasNextPage = false;
    items = [];

    constructor(data) {
        extendObservable(this, data);
    }
}
