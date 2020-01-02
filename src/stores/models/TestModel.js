import autobind from "autobind-decorator";
import {action, observable} from "mobx";
import WebServiceModel from "./WebServiceModel";

@autobind
class TestModel {
    @observable id;
    @observable webService;
    @observable path;
    @observable httpMethod;
    @observable contentType;
    @observable desc;
    @observable requestData;
    @observable header;
    @observable queryParam;
    @observable timeout;
    @observable assertion;
    @observable created;
    @observable lastModified;

    constructor(data) {
        if (!data)
            return this;
        this.id = data.id;
        this.webService = new WebServiceModel(data.webService);
        this.path = data.path;
        this.httpMethod = data.httpMethod;
        this.contentType = data.contentType;
        this.desc = data.desc;
        this.requestData = data.requestData;
        this.header = data.header;
        this.queryParam = data.queryParam;
        this.timeout = data.timeout;
        this.assertion = data.assertion;
        this.created = data.created;
        this.lastModified = data.lastModified;
    }

    @action updateProperty(propertyName, propertyValue) {
        switch (propertyName.toLowerCase()) {
            case "header":
                this.header = propertyValue;
                return;
            case "queryParam":
                this.queryParam = propertyValue;
                return;
            case "requestData":
                this.requestData = propertyValue;
                return;
        }
    }
}

export default TestModel;
