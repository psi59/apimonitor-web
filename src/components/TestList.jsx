import React from 'react'
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {inject, observer} from "mobx-react";
import {getWebServiceId} from "../helpers/utils/path";
import {observable} from "mobx";

class TestList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { tests, isShort } = this.props;
        console.log("tests=", tests);
        return (
             <div>
                 {observable.array(tests).length ? tests.map(test => {
                     return <TestListItem key={test.id} test={test} isShort={isShort} />
                 }) : <div>No tests</div>}
             </div>
        );
    }
}

export default TestList;

@inject("testStore")
@observer
class TestListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    getMethodColorClass = (method) => {
        switch (method) {
            case "GET":
                return "is-success";
            case "POST":
                return "is-warning";
            case "DELETE":
                return "is-danger";
            case "PUT":
                return "is-info";
            default:
                return "is-dark";
        }
    };

    deleteTest = () => {
        const { testStore, test } = this.props;
        const webServiceId = getWebServiceId();

        testStore.deleteOne(webServiceId, test.id).then(isDeleted => {
            if (isDeleted)
                testStore.removeTestsByTest(test);
        }).catch(reason => {
            console.log("reason:", reason);
        });
    };

    render() {
        const {test, isShort} = this.props;

        return (
            <div className="box">
                <div className="level">
                    <div className="level-left">
                <span className={classNames("tag", "is-normal", "u-m-r-10", this.getMethodColorClass(test.httpMethod))}>
                    {test.httpMethod}
                </span>
                        <span>
                    <strong><a href={`/tests/${test.id}`}>{test.path}</a></strong>
                </span>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <button className="button is-text is-small has-text-success">
                                <FontAwesomeIcon icon={faPlay} />
                            </button>
                        </div>
                        <div className="level-item">
                            <button className="button is-text is-small has-text-danger" onClick={this.deleteTest}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </div>
                    </div>
                </div>
                {isShort ? null : <div className="has-text-left">
                    <p className="has-text-grey">{test.desc ? test.desc : "no description"}</p>
                </div> }
            </div>
        );
    }
}
