import React from 'react'
import Dropdown from "../components/Dropdown";
import ParameterEditor from "../components/ParameterEditor";
import {Link, useHistory} from "react-router-dom";
import {getApiUrl} from "../helpers/API";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getWebServiceId} from "../helpers/utils/path";
import {updateService} from "../store/modules/service";

const methods = {
    get: "GET",
    put: "PUT",
    post: "POST",
    patch: "PATCH",
    delete: "DELETE",
    head: "HEAD"
};

const methodValues = Object.values(methods);

export default function CreateTest(props) {
    const service_id = getWebServiceId();
    const service = useSelector(state => state.serviceReducer.service);
    const [ method, setMethod ] = React.useState(methods.get);
    const [ path, setPath ] = React.useState("/");
    const [ queryParams, setQueryParams ] = React.useState(service.query_param);
    const history = useHistory();
    const dispatch = useDispatch();

    React.useEffect(() => {
        axios.get(getApiUrl(`v1/webservices/${service_id}`), {
            withCredentials: true,
        }).then((res) => {
            const service = res.data.result;
            console.log(service);
            dispatch(updateService(service));
        }).catch((e) => {
            console.log(e)
        });
    }, [service_id]);


    const createTest = () => {
        axios.post(getApiUrl(`v1/webservices/${service.id}/tests`), {
            path: path,
            http_method: method,
            content_type: "application/json",
        }).then((res) => {
            console.log(res);
            history.push(`/services/${service.id}`);
        }).catch(error => {
            console.log(error.response);
        });

        console.log("Created web service")
    };

    return <div className="section is-small">
        <div className="columns is-centered">
            <section className="column is-small is-8">
                <div className="has-text-left u-m-b-20">
                    <h3 className="title  u-m-b-5">Add a new test</h3>
                </div>
                <hr className="u-m-0 u-m-b-50"/>
                <section className="section is-paddingless has-text-left">
                    <div className="field has-addons">
                        <div className="control">
                            <Dropdown width="100px" items={methodValues} setValue={setMethod}/>
                        </div>
                        <div className="control is-expanded">
                            <input className="input has-text-centered is-fullwidth" type="text" value={`${service.http_schema}://${service.host}`} readOnly/>
                        </div>
                        <div className="control is-expanded">
                            <input className="input is-fullwidth" type="text" value={path} onChange={event => setPath(event.target.value)}/>
                        </div>
                    </div>
                </section>
                <section className="section is-paddingless u-m-t-20">
                    <ParameterEditor title="Query parameters" parameters={queryParams} setParametersFunc={setQueryParams}/>
                </section>
                <section className="section is-paddingless u-m-t-20">
                    <ParameterEditor title="Request headers"/>
                </section>
                <section className="section is-paddingless u-m-t-20">
                    <ParameterEditor title="Request body"/>
                </section>
                <section className="section is-paddingless u-m-t-30">
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="button is-success" onClick={createTest}>Submit</button>
                        </div>
                        <div className="control">
                            <Link to={`/services/${service.id}`} className="button is-danger">Cancel</Link>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    </div>
}
