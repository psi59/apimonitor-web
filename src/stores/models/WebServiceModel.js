import {computed, observable} from "mobx";

class WebServiceModel {
    @observable id;
    @observable host;
    @observable httpSchema;
    @observable desc;
    @observable favicon;
    @observable schedule;
    @observable created;
    @observable lastModified;

    constructor(data) {
        if (!data)
            return;
        this.id = data.id;
        this.host = data.host;
        this.httpSchema = data.httpSchema;
        this.desc = data.desc;
        this.favicon = data.favicon;
        this.schedule = data.schedule;
        this.created = data.created;
        this.lastModified = data.lastModified;
    }

    @computed get address() {
        return `${this.httpSchema}://${this.host}`;
    }
}

export default WebServiceModel;
