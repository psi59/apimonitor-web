import React from 'react'
import {useParams} from 'react-router-dom'
import {getApiUrl} from "../helpers/API";
import axios from "axios";
import Dropdown from "../components/Dropdown";
import {methodValues} from "./CreateTest";
import Avatar from "../components/Avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import ResultList from "../components/ResultList";
import TestSettingPanel from "../components/TestSettingPanel";
import {useDispatch} from "react-redux";
import {updateTest as updateTestInStore} from "../store/modules/tests";

export default function Test() {
    const dispatch = useDispatch();
    const [ test, setTest ] = React.useState({});
    const [ results, setResults ] = React.useState([]);
    const [ service, setService ] = React.useState({});
    const { test_id } = useParams();

    console.log("test");

    const updateTest = async () => {
        console.log(test);
        try {
            const res = await axios.put(getApiUrl(`v1/tests/${test.id}`), test);
            await dispatch(updateTestInStore(test));
            console.log(res);
        } catch (error) {
            console.log(error.response);
        }
    };

    const init = async () => {
        const testsRes = await axios.get(getApiUrl(`v1/tests/${test_id}`), {
            withCredentials: true,
        });
        console.log(testsRes);
        const test = testsRes.data.result;
        const { web_service } = test;
        console.log(test);
        setTest(test);
        dispatch(updateTestInStore(test));
        setService(web_service);

        const resultsRes = await axios.get(getApiUrl(`v1/tests/${test_id}/results?web_service_id=${service.id}`), {
            withCredentials: true,
        });
        console.log(resultsRes);
        const { items } = resultsRes.data.result;
        setResults(items);
    };

    React.useEffect( () => {
        init();
    }, []);

    return <div>
        <section className="section">
            <div className="level">
                <div className="level-left">
                    <Avatar
                        image={service.image}
                        host={service.host}
                    />
                    <div className="level-item">
                        <h3 className="title is-4">
                            {service.host}
                        </h3>
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item">
                        <button className="button is-danger is-outlined" >
                            <span className="icon is-small">
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </span>
                        </button>
                    </div>
                    <div className="level-item">
                        <button className="button is-success is-outlined">
                            <span className="icon is-small">
                              <FontAwesomeIcon icon={faPlay} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <section className="section has-text-left u-p-t-0">
            <div className="columns is-variable is-1">
                <div className="column is-11">
                    <div className="field has-addons">
                        <div className="control">
                            <Dropdown width="100px" items={methodValues} value={test.http_method} setValue={method => (setTest({...test, http_method: method}))}/>
                        </div>
                        <div className="control is-expanded">
                            <input className="input has-text-centered is-fullwidth" type="text" value={`${service.http_schema}://${service.host}`} readOnly/>
                        </div>
                        <div className="control is-expanded">
                            <input className="input is-fullwidth" type="text" value={test.path} onChange={event => setTest({...test, path: event.target.value})}/>
                        </div>
                    </div>
                </div>
                <div className="column is-1">
                    <button className="button is-primary is-fullwidth" onClick={updateTest}>
                        Save
                    </button>
                </div>
            </div>
        </section>
        <section className="section u-p-t-0 u-p-b-20">
            <div className="columns">
                <div className="column is-6 has-text-left">
                    <TestSettingPanel test={test}/>
                </div>
                <div className="column is-6">
                    <ResultList results={results}/>
                </div>
            </div>
        </section>
    </div>
}
