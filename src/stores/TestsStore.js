import {action, observable} from "mobx";
import autobind from "autobind-decorator";
import {asyncAction} from "mobx-utils";
import testRepository from "./repositories/TestsRepository";
import {TestListItemModel, TestListModel} from "./models/Tests";

@autobind
class TestStore {
    @observable testList = new TestListModel();

    constructor(rootStore) {
        this.rootStore = rootStore;
        console.log("created TestStore")
    }

    @asyncAction *findAll(service_id) {
        try {
            const { data, status } = yield testRepository.findAll(service_id);
            console.log(data);
            const { success, result } = data;
            if (!success)
                console.log("API Error");
            else {
                this.testList = {
                    totalCount: result.total_count,
                    totalPage: result.total_page,
                    currentPage: result.current_page,
                    hasNextPage: result.has_next_page,
                    items: result.items.map(data => new TestListItemModel(data)),
                };
                console.log("testList=", this.testList);
            }
        } catch (e) {
            console.log("API Error: ", e);
        }
    }

    @asyncAction *deleteOne(service_id, test_id) {
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
    }

    @action removeTestsByTest(test) {
        this.testList.items.remove(test);
        this.testList = {
          ...this.testList,
        };
    }
}

export default new TestStore();
