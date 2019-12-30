import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEdit, faPlus, faTimesCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames';
import {connect, useDispatch, useSelector} from "react-redux";
import {updateTest} from "../helpers/API";
import {updateTest as updateTestInStore} from "../store/modules/tests";

export default function TestSettingPanel() {
    const test = useSelector(state => (state.testReducer.test));
    console.log("test=", test);

    return <div>
        <ParameterPanel
            header="Header parameters"
            parameter={{
                type: "header",
                data: test.header ? test.header : {}
            }}
            test={test}
        />
        <ParameterPanel
            header="Query parameters"
            parameter={{
                type: "query_param",
                data: test.query_param ? test.query_param: {}
            }}
            test={test}
        />
        <ParameterPanel
            header="Request body"
            parameter={{
                type: "request_data",
                data: test.request_data ? test.request_data: {}
            }}
            test={test}
        />
    </div>
}

function ParameterPanel(props) {
    const { header, parameter, test } = props;
    const parameterType = parameter.type;
    console.log("parameterType=", parameterType);
    const parameterData = parameter.data;
    console.log("parameterData=", parameterData);
    const parameterEntries = parameterData ? Object.entries(parameterData) : [];
    console.log("parameterEntries=", parameterEntries);
    const [ parameterProperties, setParameterProperties ] = React.useState([...parameterEntries]);
    const [ parameterToAdd, setParameterToAdd ] = React.useState([]);
    const dispatch = useDispatch();

    const updateTestWithParameters = async (params) => {
        try {
            let newTest = test;
            delete newTest[parameterType];
            newTest[parameterType] = params;
            const res = await updateTest(newTest);
            console.log("newTest=", newTest);
            dispatch(updateTestInStore(newTest));
            setParameterProperties(Object.entries(params));
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteParameter = (key) => () => {
        let newParams = parameterData;
        delete newParams[key];
        updateTestWithParameters(newParams);
    };

    const updateParameter = (k)  => (key, value) => {
        let newParams = parameterData;
        if (k) {
            delete newParams[k];
            console.log(`deleted k=${k}: `, newParams);
        }
        newParams[key] = value;
        console.log(`added key=${key}: `, newParams);
        updateTestWithParameters(newParams);
    };

    const getEditorList = (parameter= []) => {
        console.log("parameter=", parameter);
        return parameter.map(([k, v]) => <KeyValueEditor
            key={k}
            k={k}
            v={v}
            onUpdate={updateParameter(k)}
            onDelete={deleteParameter(k)}
        />)
    };

    const getAddEditorList = (parameter = []) =>
        parameter.map((k, i) => (<KeyValueEditor
            key={`add_editor_${i}`}
            k={""}
            v={""}
            onUpdate={(key, value) => {
                const updateParameterFn = updateParameter("");
                updateParameterFn(key, value);
            }}
            isActive={true}
        />));

    return <div className="card u-m-b-10">
        <div className="card-header">
            <div className="card-header-title">{header}</div>
        </div>

        <div className="card-content">
            <div className="container">
                <p className={classNames("has-text-centered", "has-text-grey", (parameterProperties.length ? "is-hidden":""))}>No parameters</p>
                {getEditorList(parameterProperties)}
                <div className={parameterData ? "is-hidden":""}>

                </div>
                {getAddEditorList(Object.keys(parameterToAdd))}
            </div>
        </div>

        <div className="card-footer">
            <div className="card-footer-item">
                <button
                    className="button is-success is-small"
                    style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: '9999px',
                    }}
                    onClick={() => {
                        setParameterToAdd([...parameterToAdd, ""]);
                        console.log("parameterToAdd=", parameterToAdd);
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    </div>
}

function KeyValueEditor(props) {
    const { k, v, onUpdate, onDelete } = props;
    console.log(props);
    console.log(`k=${k},v=${v}`);
    const [ key, setKey ] = React.useState(k);
    const [ value, setValue ] = React.useState(v);
    console.log(`key=${key},value=${value}`);
    const [ active, setActive ] = React.useState(props.isActive ? props.isActive : false);
    const { test } = useSelector(
        state => ({test: state.testReducer.test}),
        testReducer => (testReducer.test === test));

    const changeKeyOnType = e => {
          setKey(e.target.value)
    };

    const changeValueOnType = e => {
        setValue(e.target.value)
    };

    const activeEditor = () => {
        setActive(true);
    };

    const deactivateEditor = () => {
        setActive(false);
    };

    const updateParameter = () => {
        onUpdate(key, value);
        deactivateEditor();
    };

    const cancel = () => {
        deactivateEditor();
    };

    return active ? <div className="field has-addons has-addons-centered">
            <div className="control is-expanded">
                <input className="input" placeholder="Name" value={key} onChange={changeKeyOnType} />
            </div>
            <div className="control is-expanded">
                <input className="input" placeholder="Value" value={value} onChange={changeValueOnType} />
            </div>
            <div className="control">
                <a className="button is-success" onClick={updateParameter}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                </a>
            </div>
            <div className="control">
                <a className="button is-danger" onClick={cancel}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </a>
            </div>
        </div> : <div className="level">
            <div className="level-left">
                <div className="level-item">
                    <label className="checkbox">
                        <input type="checkbox"/>
                    </label>
                </div>
                <div className="level-item is-italic has-text-black is-bold">
                    {`${k}: ${v}`}
                </div>
            </div>
            <div className="level-right">
                <div className="level-item">
                    <a
                        className="has-text-grey-dark"
                        style={{
                            fontSize: "13px"
                        }}
                        onClick={e => activeEditor()}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </a>
                </div>
                <div className="level-item">
                    <a
                        className="has-text-grey-dark"
                        style={{
                            fontSize: "13px"
                        }}
                        onClick={onDelete}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </a>
                </div>
            </div>
        </div>
}
