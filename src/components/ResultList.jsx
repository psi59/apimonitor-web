import React from 'react';
import {getApiUrl} from "../helpers/API";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";

export default function ResultList(props) {
    const { results } = props;

    return <div>
        { results.map(result => (<ResultListItem result={result}/>)) }
    </div>
}

function ResultListItem(props) {
    const { result, test_id } = props;

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
