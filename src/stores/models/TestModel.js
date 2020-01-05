import autobind from "autobind-decorator";
import {action, observable} from "mobx";
import WebServiceModel from "./WebServiceModel";

@autobind
class TestModel {
    @observable id;
    @observable webService;
    @observable path;
    @observable method;
    @observable contentType;
    @observable description;
    @observable parameters;
    @observable timeout;
    @observable assertion;
    @observable createdAt;
    @observable modifiedAt;

    constructor(data) {
        if (!data)
            return this;
        this.id = data.id;
        this.name = data.name;
        this.webService = new WebServiceModel(data.webService);
        this.path = data.path;
        this.method = data.method;
        this.contentType = data.contentType;
        this.description = data.description;
        this.parameters = data.parameters;
        this.timeout = data.timeout;
        this.assertion = data.assertion;
        this.createdAt = data.createdAt;
        this.modifiedAt = data.modifiedAt;
    }

    @action updateParameters(parameterName, parameterValue) {
        let parameters = this.parameters;
        switch (parameterName.toLowerCase()) {
            case "header":
                parameters.header = parameterValue;
                this.parameters = parameters;
                return;
            case "query":
                parameters.query = parameterValue;
                this.parameters = parameters;
                return;
            case "body":
                parameters.body = parameterValue;
                this.parameters = parameters;
                return;
        }
    }

    @action updateDescription(description) {
        this.description = description;
    }
}

export default TestModel;
