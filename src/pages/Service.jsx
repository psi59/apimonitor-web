import React from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import Avatar from "../components/Avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPlus, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import TestList from "../components/TestList";
import classNames from "classnames";
import {inject, observer} from "mobx-react";
import queryString from "query-string";
import {getWebServiceId} from "../helpers/utils/path";
import ResultList from "../components/ResultList";

const tabs = {
    Overview: "Overview",
    Tests: "Tests",
};

@inject(
    "webServiceStore",
    "testStore"
)
@observer
class Service extends React.Component {
    constructor(props) {
        super(props);
        const { webServiceStore, testStore, location } = this.props;
        const webServiceId = getWebServiceId();
        webServiceStore.findOne(webServiceId);
        testStore.findAll(webServiceId);

        const query = queryString.parse(location.search);
        const tabName = query["tab"] ? query["tab"] : tabs.Overview;

        this.state = {
            isDeleted: false,
            activeTab: tabName,
        }
    }

    activeTabByTabName = (str) => {
        return (str.toLowerCase() === this.state.activeTab.toLowerCase()) ? "is-active" : ""
    };

    selectActiveTab = (tab) => {
        const { location } = this.props;
        return (event) => {
            const query = queryString.parse(location.search);
            const qs = queryString.stringify({
                ...query,
                tab: tab.toLowerCase(),
            });
            this.props.history.push(`${location.pathname}?${qs}`);
            console.log(`selected tab=${tab}`);
            this.setState({
                activeTab: tab,
            });
        };
    };

    deleteService = () => {
        const { webServiceStore } = this.props;
        const { webService } = webServiceStore;
        webServiceStore.deleteOne(webService.id).then(res => {
            console.log(res);
            this.setState({
                isDeleted: res.status === 200,
            });
        }).catch(reason => {
            console.log(reason);
        });
    };

    addTest = () => {
        const { testStore } = this.props;
        const webServiceId = getWebServiceId();
        testStore.createOne(webServiceId, {
            "method": "get",
            "schedule": "5m",
            "assertion": {},
            "contentType": "application/json",
            "timeout": 1,
            "path": "/",
            "description": "root test",
            "name": "OK",
            "parameters": {}
        }).then((test) => {
            console.log(test);
            window.location.replace(`/tests/${test.id}`);
        }).catch((e) => {
            console.log(e);
        })
    };

    execute = () => {
        const { webServiceStore } = this.props;
        const { webService } = webServiceStore;
        webServiceStore.executeOne(webService).then(() => {
            console.log(0, "OK");
        }).catch((e) => {
            console.log("error=", e);
        });
    };

    render() {
        const { webServiceStore } = this.props;
        const { webService } = webServiceStore;
        const { isDeleted, activeTab } = this.state;

        return isDeleted ? <Redirect to="/" /> :  <div>
            <section className="section">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><a href="/">WebServices</a></li>
                        <li className="is-active"><a href="#" aria-current="page">{webService.host}</a></li>
                    </ul>
                </nav>
                <div className="level">
                    <div className="level-left">
                        <Avatar
                            image={webService.image}
                            host={webService.host}
                        />
                        <div className="level-item">
                            <h3 className="title is-4">
                                {webService.host}
                            </h3>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <button className="button is-outlined is-info" onClick={this.addTest} >
                                <span className="icon is-small">
                                  <FontAwesomeIcon icon={faPlus} />
                                </span>
                            </button>
                        </div>
                        <div className="level-item">
                            <button className="button is-danger is-outlined" onClick={this.deleteService}>
                                <span className="icon is-small">
                                  <FontAwesomeIcon icon={faTrashAlt} />
                                </span>
                            </button>
                        </div>
                        <div className="level-item">
                            <button
                                className="button is-success is-outlined"
                                onClick={this.execute}
                            >
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
                        <li className={classNames(this.activeTabByTabName(tabs.Overview), this.activeTabByTabName(""))} onClick={this.selectActiveTab(tabs.Overview)}><a>Overview</a></li>
                        <li className={this.activeTabByTabName(tabs.Tests)} onClick={this.selectActiveTab(tabs.Tests)}><a>Tests</a></li>
                    </ul>
                </div>
                <TabContainer activeTab={activeTab}/>
            </section>
        </div>
    }
}

export default withRouter(Service);

class TabContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { activeTab } = this.props;
        switch (activeTab.toLowerCase()) {
            case tabs.Overview.toLowerCase():
                return <Overview />;
            case tabs.Tests.toLowerCase():
                return <Tests />;
            default:
                return <Overview />;
        }
    }
}

@inject(
    "webServiceStore",
    "testStore",
    "resultStore"
)
@observer
class Overview extends React.Component {
    constructor(props) {
        super(props);
        const { resultStore } = this.props;
        const webServiceId = getWebServiceId();
        resultStore.findByWebServiceId(webServiceId);
        setInterval(this.getResults, 30*1000);
    }

    getResults = () => {
        const { resultStore } = this.props;
        const webServiceId = getWebServiceId();
        resultStore.findByWebServiceId(webServiceId);
        console.log(0, "Tick");
    };

    render() {
        const { testList } = this.props.testStore;
        const { resultList } = this.props.resultStore;
        return (
            <div className="columns">
                <div className="column is-6">
                    <TestList tests={testList.items} isShort={true}/>
                </div>
                <div className="column is-6">
                    <ResultList results={resultList.items}/>
                </div>
            </div>
        );
    }
}

//
// export function Overview(props) {
//     const { service_id } = useParams();
//     // const dispatch = useDispatch();
//     // const { tests, results } = useSelector(
//     //     state => ({tests: state.testReducer.tests, results: state.resultReducer.results}),
//     //     testReducer => (testReducer.tests === tests));
//     // console.log(tests);
//     // console.log(results);
//
//     React.useEffect(() => {
//         axios.get(getApiUrl(`v1/webservices/${service_id}/tests`), {
//             withCredentials: true,
//         }).then((res) => {
//             const { items } = res.data.result;
//             // dispatch(updateTests(items));
//         }).catch((e) => {
//             console.log(e)
//         });
//
//         axios.get(getApiUrl(`v1/webservices/${service_id}/results`), {
//             withCredentials: true,
//         }).then((res) => {
//             const { items } = res.data.result;
//             console.log(items);
//             // dispatch(updateResults(items));
//         }).catch((e) => {
//             console.log(e)
//         });
//     }, [service_id]);
//
//     return <div className="columns">
//         <div className="column is-6">
//             {/*<TestList service_id={service_id} is_short={true}/>*/}
//         </div>
//         <div className="column is-6">
//             {/*<ResultList results={results}/>*/}
//         </div>
//     </div>
// }

@inject(
    "testStore",
)
@observer
class Tests extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { testList } = this.props.testStore;
        return (
            <TestList tests={testList.items} isShort={false}/>
        );
    }
}
