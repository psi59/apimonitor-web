import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import {observable} from "mobx";
import * as shortid from "shortid";
import {useStores} from "../stores/store";
import {observer} from "mobx-react";

const ResultList = observer(() => {
    const { resultStore } = useStores();
    const { resultList } = resultStore;
    const { items } = resultList;
    return <div>
        {observable.array(items).length > 0 ? items.map(result => (<ResultListItem key={shortid.generate()} result={result}/>)) : <div> No Results</div>}
    </div>
});

export default ResultList;

function ResultListItem(props) {
    const { result } = props;

    return <div className="box">
        <div className="media">
            <div className="media-left">
                <ResultStatusIcon is_success={result.is_success} />
            </div>
            <div className="media-content">
                <div>
                    {`StatusCode=${result.status_code}`}
                </div>
                <div>
                    {`ResponseTime=${result.response_time}`}
                </div>
                <div>
                    {`Tested_Date=${result.tested_at}`}
                </div>
            </div>
        </div>
    </div>
}

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
