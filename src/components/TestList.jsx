import React from 'react'
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {getApiUrl} from "../helpers/API";
import {useDispatch, useSelector} from "react-redux";
import {updateTests} from "../store/modules/tests";

export default function TestList(props) {
    const { service_id, is_short } = props;
    const tests = useSelector(state => state.testReducer.tests, testReducer => (tests.length === testReducer.tests));
    console.log(tests);

    return <div>
        {tests ? tests.map(test => {
            console.log(test);
            return <TestListItem key={test.id} service_id={service_id} test={test} is_short={is_short} />
        }) : <div>No tests</div>}
    </div>
}

function TestListItem(props) {
    const { service_id, test, is_short } = props;
    const tests = useSelector(state => state.testReducer.tests);
    const dispatch = useDispatch();

    const getMethodColorClass = (method) => {
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

    const deleteTest = () => {
        axios.delete(getApiUrl(`v1/tests/${test.id}?web_service_id=${service_id}`), {
            withCredentials: true,
        }).then((res) => {
            console.log(res);
            const i = tests.indexOf(test);
            tests.splice(i, 1);
            dispatch(updateTests(tests))
        }).catch((e) => {
            console.log(e)
        });
    };

    return <div className="box">
        <div className="level">
            <div className="level-left">
                <span className={classNames("tag", "is-normal", "u-m-r-10", getMethodColorClass(test.http_method))}>
                    {test.http_method}
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
                    <button className="button is-text is-small has-text-danger" onClick={deleteTest}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            </div>
        </div>
        {is_short ? null : <div className="has-text-left">
            <p className="has-text-grey">{test.desc ? test.desc : "no description"}</p>
        </div> }
    </div>;
}
