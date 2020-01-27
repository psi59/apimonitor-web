import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faCheckCircle, faSync} from "@fortawesome/free-solid-svg-icons";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import {observable} from "mobx";
import * as shortid from "shortid";
import {useStores} from "../stores/store";
import {observer} from "mobx-react";
import classNames from "classnames"
import SyntaxHighlighter from "react-syntax-highlighter";
import {idea} from "react-syntax-highlighter/dist/cjs/styles/hljs";

const ResultList = observer(({ listType }) => {
    const { resultStore, webServiceStore, testStore } = useStores();
    const { webService } = webServiceStore;
    const { test } = testStore;
    const { resultList } = resultStore;
    const { items } = resultList;

    const refreshList = () => {
        switch (listType) {
            case "overview":
                console.log(0, "overview");
                return resultStore.findByWebServiceId(webService.id);
            case "test":
                console.log(0, "test");
                return resultStore.findByTestId(test.id)
        }
        return null;
    };

    return <div>
        <div className="level is-marginless">
            <div className="level-left"> </div>
            <div className="level-right">
                <div className="level-item">
                    <a
                        className="card-header-icon"
                        aria-label="more options"
                        onClick={refreshList}
                    >
                        <FontAwesomeIcon icon={faSync} />
                    </a>
                </div>
            </div>
        </div>
        {observable.array(items).length > 0 ? items.map(result => (<ResultListItem key={shortid.generate()} result={result}/>)) : <div> No Results</div>}
    </div>
});

export default ResultList;

const ResultListItem = ({ result }) => {
    const [ isFold, setIsFold ] = React.useState(false);

    const toggleIsFold = () => setIsFold(!isFold);

    return <div className="card">
        <header className="card-header">
            <p className="card-header-title">
                <span className={classNames("tag", "u-m-r-10", result.isSuccess ? "is-success" : "is-danger")}>{result.statusCode}</span>
                {result.id}
            </p>
            <a
                className="card-header-icon"
                aria-label="more options"
                onClick={toggleIsFold}
            >
                <FontAwesomeIcon icon={faAngleDown} />
            </a>
        </header>
        <div className={classNames("card-content", isFold ? "" : "is-hidden")}>
            <div className="content">
                <p className="has-text-left">
                    <span className="has-text-weight-bold">Response time: </span>
                    <span>{result.responseTime}</span>ms
                </p>
                <p className="has-text-left">
                    <span className="has-text-weight-bold">Test date: </span>
                    <span>{result.testedAt}</span>
                </p>
                <div className="has-text-left">
                    <p className="has-text-weight-bold">Response</p>
                    <SyntaxHighlighter language="json" style={idea}>
                        {result.response}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    </div>
};

function ResultStatusIcon(props) {
    const { is_success } = props;

    if (is_success) {
        return <p className="image is-64x64 has-text-success">
            <FontAwesomeIcon  icon={faCheckCircle}/>
        </p>
    } else {
        return <p className="image is-64x64 has-text-danger">
            <FontAwesomeIcon  icon={faTimesCircle}/>
        </p>
    }
}
