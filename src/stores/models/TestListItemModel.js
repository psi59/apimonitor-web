import {observable} from "mobx";
import autobind from "autobind-decorator";

@autobind
class TestListItemModel {
    @observable id;
    @observable path;
    @observable url;
    @observable httpMethod;
    @observable desc;
    @observable created;
    @observable lastModified;

    constructor(data) {
        if (!data)
            return this;
        this.id = data.id;
        this.path = data.path;
        this.url = data.url;
        this.httpMethod = data.httpMethod;
        this.desc = data.desc;
        this.created = data.created;
        this.lastModified = data.lastModified;
    }
}

export default TestListItemModel;
