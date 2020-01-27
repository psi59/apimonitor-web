import {observable} from "mobx";
import autobind from "autobind-decorator";

@autobind
class ResultListItemModel {
    @observable id;
    @observable testId;
    @observable isSuccess;
    @observable statusCode;
    @observable responseTime;
    @observable testedAt;
    @observable response;

    constructor(data) {
        if (!data)
            return this;

        this.id = data.id;
        this.testId = data.testId;
        this.isSuccess = data.isSuccess;
        this.statusCode = data.statusCode;
        this.responseTime = data.responseTime;
        this.testedAt = data.testedAt;
        this.response = data.response;
    }
}

export default ResultListItemModel;
