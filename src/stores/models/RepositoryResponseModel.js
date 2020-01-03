export class RepositoryResponseModel {
    data = null;
    status = 500;

    constructor(data, status) {
        this.data = data;
        this.status = status;
    }
}
