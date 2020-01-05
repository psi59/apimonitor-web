import {computed, observable} from "mobx";

class WebServiceModel {
    @observable id;
    @observable host;
    @observable httpSchema;
    @observable description;
    @observable createdAt;
    @observable modifiedAt;

    constructor(data) {
        if (!data)
            return;
        this.id = data.id;
        this.host = data.host;
        this.schema = data.schema;
        this.description = data.description;
        this.createdAt = data.createdAt;
        this.modified = data.modifiedAt;
    }

    @computed get address() {
        return `${this.schema}://${this.host}`;
    }

    @computed get favicon() {
        return `https://s2.googleusercontent.com/s2/favicons?domain_url=${this.schema}://${this.host}`
    }
}

export default WebServiceModel;
