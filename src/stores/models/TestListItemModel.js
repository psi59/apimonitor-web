import {observable} from "mobx";
import autobind from "autobind-decorator";

@autobind
class TestListItemModel {
    @observable id;
    @observable path;
    @observable url;
    @observable method;
    @observable description;
    @observable createdAt;
    @observable modifiedAt;

    constructor(data) {
        if (!data)
            return this;
        this.id = data.id;
        this.path = data.path;
        this.url = data.url;
        this.method = data.method;
        this.description = data.description;
        this.createdAt = data.createdAt;
        this.modifiedAt = data.modifiedAt;
    }
}

export default TestListItemModel;
