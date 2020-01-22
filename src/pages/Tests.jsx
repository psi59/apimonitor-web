import React from 'react'
import {withRouter} from 'react-router-dom'
import Dropdown from "../components/Dropdown";
import Avatar from "../components/Avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {inject, observer} from "mobx-react";
import ResultList from "../components/ResultList";
import TestSettingPanel from "../components/TestSettingPanel";
import EditableText from "../components/EditableText";


export const methods = {
    get: "GET",
    put: "PUT",
    post: "POST",
    patch: "PATCH",
    delete: "DELETE",
    head: "HEAD"
};

export const methodValues = Object.values(methods);

@inject(
    "testStore",
    "resultStore"
)
@observer
class Test extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        const { testStore, resultStore } = this.props;
        const testId = props.match.params.testId;
        testStore.findById(testId);
        resultStore.findByTestId(testId)
    }

    updateTestDescription = (text) => {
        const { testStore } = this.props;
        const { test } = testStore;
        test.updateDescription(text);
        testStore.updateOne(test);
    };

    updateTestPath = () => {
        const { testStore } = this.props;
        const { test } = testStore;
        testStore.updateOne(test);
    };

    render() {
        const { testStore, resultStore } = this.props;
        const { test } = testStore;
        const { webService, description, method } = test;
        const { resultList } = resultStore;
         return (
            <div>
                {webService &&
                <section className="section">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><a href="/">WebServices</a></li>
                            <li><a href={`/services/${webService.id}`}>Tests</a></li>
                            <li className="is-active"><a href="#" aria-current="page">{`${test.name} (${test.id})`}</a></li>
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
                </section>}
                <section className="section">
                    <div className="has-text-left">
                        <h1 className="title">
                            {test.name}
                        </h1>
                        <h6
                            className="subtitle is-6 has-text-grey-dark"
                        >
                            {description &&
                                <EditableText
                                    text={ description }
                                    onUpdate={this.updateTestDescription}
                                    placeholder={"Add description"}
                                />}
                            {!description &&
                                <EditableText
                                    text={""}
                                    placeholder={"Add description"}
                                    onUpdate={this.updateTestDescription}
                                />}
                        </h6>
                    </div>
                </section>
                <section className="section has-text-left u-p-t-0">
                    <div className="columns is-variable is-1">
                        <div className="column is-11">
                            <div className="field has-addons">
                                <div className="control">
                                    {method && <Dropdown width="150px"
                                              items={methodValues}
                                              value={method}
                                              setValue={method => testStore.updateMethod(method)}
                                    />}
                                </div>
                                <div className="control is-expanded">
                                    {webService && <input
                                        className="input has-text-centered is-fullwidth"
                                        type="text"
                                        value={webService.address} readOnly
                                    />}
                                </div>
                                <div className="control is-expanded">
                                    <input
                                        className="input is-fullwidth"
                                        type="text"
                                        value={test.path}
                                        onChange={event => testStore.updatePath(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="column is-1">
                            <button
                                className="button is-primary is-fullwidth"
                                onClick={this.updateTestPath}
                            >
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
                            <ResultList results={resultList.items}/>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(Test);

