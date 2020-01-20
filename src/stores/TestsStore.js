import {action, flow, observable} from "mobx";
import autobind from "autobind-decorator";
import {asyncAction} from "mobx-utils";
import testRepository from "./repositories/TestsRepository";
import TestListModel from "./models/TestListModel";
import TestModel from "./models/TestModel";
import {RepositoryResponseModel} from "./models/RepositoryResponseModel";

@autobind
class TestStore {
    @observable testList = new TestListModel();
    @observable test = new TestModel();

    constructor(rootStore) {
        this.rootStore = rootStore;
        console.log("created TestStore")
    }


    findAll = flow(function*(service_id) {
        try {
            const { data, status } = yield testRepository.findAll(service_id);
            console.log(data);
            const { success, result } = data;
            if (!success)
                console.log("API Error");
            else {
                this.testList = new TestListModel(result);
                console.log("testList=", this.testList);
            }
            return new RepositoryResponseModel(data, status);
        } catch (e) {
            console.log("API Error: ", e);
            const { data, status } = e.response;
            return new RepositoryResponseModel(data, status);
        }
    });

    deleteOne = flow(function*(service_id, test_id) {
        try {
            const { data, status } = yield testRepository.deleteOne(service_id, test_id);
            const { success, result } = data;
            if (!success) {
                console.log("API Error");
                return false;
            }
            return true;
        } catch (e) {
            console.log("API Error: ", e);
            return false;
        }
    });

    findById = flow(function*(testId, params) {
        try {
            const { data, status } = yield testRepository.findById(testId);
            const { success, result } = data;
            if (!success) {
                console.log("API Error");
                return null;
            }
            console.log(data);
            this.test = new TestModel(result);
            return this.test;
        } catch (e) {
            console.log("API Error: ", e);
            return null;
        }
    });

    updateOne = flow(function*(test) {
        try {
            const { data, status } = yield testRepository.updateOne(test);
            if (status !== 200) {
                console.log("API Error");
                return false;
            }
            const { success, result } = data;
            console.log("updateOne=", data);
            return true;
        } catch (e) {
            console.log("API Error: ", e);
            return false;
        }
    });

    createOne = flow(function * (serviceId, test) {
        try {
            const { data, status } = yield testRepository.createOne(serviceId, test);
            if (status !== 200) {
                console.log("API Error");
                return false;
            }
            const { success, result } = data;
            console.log("updateOne=", data);
            return new TestModel(result);
        } catch (e) {
            console.log("API Error: ", e);
            return null;
        }
    })

    @action removeTestsByTest(test) {
        this.testList.items.remove(test);
        this.testList = {
          ...this.testList,
        };
    }

    @action updateHttpMethod(httpMethod) {
        this.test = new TestModel({
            ...this.test,
            method: httpMethod,
        });
    }

    @action updatePath(path) {
        this.test = new TestModel({
            ...this.test,
            path: path,
        });
    }
}

export default new TestStore();
