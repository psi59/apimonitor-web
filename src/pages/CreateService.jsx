import React from 'react'
import {getApiUrl} from "../helpers/API";
import axios from "axios";
import {Redirect} from "react-router-dom";
import classNames from 'classnames';

export default function CreateService(props) {
    const [ host, setHost ] = React.useState("");
    const [ isCreated, setIsCreated ] = React.useState(false);
    const [ isError, setIsError ] = React.useState(false);

    const handleChange = (event) => {
        setIsError(false);
        const { value } = event.target;
        setHost(value);
    };

    const createService = () => {
        console.log(`host=${host}`);
        axios.post(getApiUrl("v1/webservices"), {
            host: host,
            schedule: "5m"
        }).then((res) => {
            console.log(res);
            setIsCreated(true);
        }).catch(error => {
            console.log(error.response);
            setIsError(true);
        });

        console.log("Created web service")
    };

    return isCreated ? <Redirect to="/" /> : <div className="section is-small">
        <div className="columns is-centered">
            <section className="column is-small is-8">
                <div className="has-text-left u-m-b-20">
                    <h3 className="title  u-m-b-5">Add a new web service</h3>
                    <h4 className="subtitle  u-m-b-10">Start by entering a URL for the API or website you want to test</h4>
                </div>
                <hr className="u-m-0 u-m-b-50"/>
                <section className="section is-paddingless has-text-left">
                    <div className="u-m-b-5">
                        <strong>Enter a URL</strong>
                    </div>
                    <div>
                        <div className="field has-addons">
                            <div className="control is-expanded is-fullwidth">
                                <input className={classNames("input", (isError ? "is-danger":""))} type="text" placeholder="https://example.com" onChange={handleChange} />
                            </div>
                            <div className="control">
                                <button className="button is-primary" onClick={createService}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    </div>
}
