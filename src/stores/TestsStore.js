import {action, flow, observable} from "mobx";
import autobind from "autobind-decorator";
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

    deleteOne = flow(function*(test_id) {
        try {
            const { data } = yield testRepository.deleteOne(test_id);
            const { success } = data;
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
            const { data } = yield testRepository.findById(testId);
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
            const { result } = data;
            console.log("updateOne=", data);
            return new TestModel(result);
        } catch (e) {
            console.log("API Error: ", e);
            return null;
        }
    });

    executeOne = flow(function * (test) {
        try {
            const { status } = yield testRepository.executeOne(test);
            if (status !== 200) {
                console.log("API Error");
                return
            }
            console.log("executeOne");
        } catch (e) {
            console.log("API Error: ", e);
        }
    });

    @action removeTestsByTest(test) {
        this.testList.items.remove(test);
        this.testList = {
          ...this.testList,
        };
    }

    @action updateMethod(method) {
        this.test = new TestModel({
            ...this.test,
            method: method,
        });
    }

    @action updatePath(path) {
        this.test = new TestModel({
            ...this.test,
            path: path,
        });
    }

    @action updateSchedule(schedule) {
        this.test = new TestModel({
            ...this.test,
            schedule: schedule,
        });
    }

    @action updateBodyInParameters(body) {
        this.test = new TestModel({
            ...this.test,
            parameters: {
                ...this.test.parameters,
                body: body,
            },
        });
    }

    @action updateAlerts(alerts) {
        console.log(1, this.test);
        this.test = new TestModel({
            ...this.test,
            alerts: alerts,
        });
    }
}

export default new TestStore();
