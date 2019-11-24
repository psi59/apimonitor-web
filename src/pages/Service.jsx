import React from 'react'
import {Redirect, useParams, useLocation, useHistory, Link} from 'react-router-dom'
import {getApiUrl} from "../helpers/API";
import axios from 'axios';
import Avatar from "../components/Avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPlus, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import TestList from "../components/TestList";
import classNames from "classnames";
import {updateTests} from "../store/modules/tests";
import {useDispatch, useSelector} from "react-redux";
import ResultList from "../components/ResultList";
import {updateResults} from "../store/modules/result";

const tabs = {
    Overview: "Overview",
    Tests: "Tests",
};

export default function Service(props) {
    const { service } = props;
    const [ isDeleted, setIsDeleted ] = React.useState(false);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const history = useHistory();
    const tabName = query.get("tab") ? query.get("tab") : tabs.Overview;
    const [ activeTab, setActiveTab ] = React.useState(tabName);

    const activeTabByTabName = (str) => {
        return (str.toLowerCase() === activeTab.toLowerCase()) ? "is-active" : ""
    };

    const selectActiveTab = (tab) => {
        return (event) => {
            query.set("tab", tab.toLowerCase());
            history.push(`${location.pathname}?${query.toString()}`);
            console.log(`selected tab=${tab}`);
            setActiveTab(tab);
        };
    };

    const deleteService = () => {
        axios.delete(getApiUrl(`v1/webservices/${service.id}`), {
            withCredentials: true,
        }).then((res) => {
            console.log(res);
            setIsDeleted(true);
        }).catch((e) => {
            console.log(e)
        });
    };

    return isDeleted ? <Redirect to="/" /> :  <div>
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
                        <Link to={`/services/${service.id}/tests/new`} className="button is-info is-outlined">
                            <span className="icon is-small">
                              <FontAwesomeIcon icon={faPlus} />
                            </span>
                        </Link>
                    </div>
                    <div className="level-item">
                        <button className="button is-danger is-outlined" onClick={deleteService}>
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
        <section className="section u-p-t-20">
            <div className="tabs is-medium">
                <ul>
                    <li className={classNames(activeTabByTabName(tabs.Overview), activeTabByTabName(""))} onClick={selectActiveTab(tabs.Overview)}><a>Overview</a></li>
                    <li className={activeTabByTabName(tabs.Tests)} onClick={selectActiveTab(tabs.Tests)}><a>Tests</a></li>
                </ul>
            </div>
            <TabContainer activeTab={activeTab}/>
        </section>
    </div>
}

function TabContainer(props) {
    switch (props.activeTab.toLowerCase()) {
        case tabs.Overview.toLowerCase():
            return <Overview />;
        case tabs.Tests.toLowerCase():
            return <Tests />;
        default:
            return <Overview />;
    }
}

export function Overview(props) {
    const { service_id } = useParams();
    const dispatch = useDispatch();
    const { tests, results } = useSelector(
        state => ({tests: state.testReducer.tests, results: state.resultReducer.results}),
        testReducer => (testReducer.tests === tests));
    console.log(tests);
    console.log(results);

    React.useEffect(() => {
        axios.get(getApiUrl(`v1/webservices/${service_id}/tests`), {
            withCredentials: true,
        }).then((res) => {
            const { items } = res.data.result;
            dispatch(updateTests(items));
        }).catch((e) => {
            console.log(e)
        });

        axios.get(getApiUrl(`v1/webservices/${service_id}/results`), {
            withCredentials: true,
        }).then((res) => {
            const { items } = res.data.result;
            console.log(items);
            dispatch(updateResults(items));
        }).catch((e) => {
            console.log(e)
        });
    }, [service_id]);

    return <div className="columns">
        <div className="column is-6">
            <TestList service_id={service_id} is_short={true}/>
        </div>
        <div className="column is-6">
            <ResultList results={results}/>
        </div>
    </div>
}

function Tests(props) {
    const { service_id } = useParams();
    const { tests } = useSelector(state => ({ tests: state.testReducer.tests }), []);
    const dispatch = useDispatch();


    React.useEffect(() => {
        axios.get(getApiUrl(`v1/webservices/${service_id}/tests`), {
            withCredentials: true,
        }).then((res) => {
            const { items } = res.data.result;
            dispatch(updateTests(items));
        }).catch((e) => {
            console.log(e)
        });
    }, [service_id]);

    return <TestList service_id={service_id} tests={tests} is_short={false}/>
}
