import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEdit, faPlus, faTimesCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames';
import {useDispatch, useSelector} from "react-redux";


export default function TestSettingPanel(props) {
    const { test } = props;
    return <div>
        <ParameterPanel header="Header parameters" parameters={{
            "test1": "value1",
            "test2": "value2"
        }} />
        <ParameterPanel header="Query parameters" />
        <ParameterPanel header="Request body" />
    </div>
}

function ParameterPanel(props) {
    const {header} = props;
    const [ parameters, setParameters] = React.useState(props.parameters ? props.parameters : {});

    return <div className="card u-m-b-10">
        <div className="card-header">
            <div className="card-header-title">{header}</div>
        </div>

        <div className="card-content">
            <Parameters parameters={parameters} />
        </div>

        <div className="card-footer">
            <div className="card-footer-item">
                <button className="button is-success is-small" style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: '9999px',
                }}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    </div>
}

function Parameters(props) {
    const [ parameters, setParameters ] = React.useState(props.parameters ? props.parameters : {});
    const parameterKeys = Object.keys(parameters);
    console.log(parameterKeys);

    return <div>
        <div className="container">
            <p className={classNames("has-text-centered", "has-text-grey", (parameterKeys.length > 0 ? "is-hidden":""))}>No parameters</p>
            {parameterKeys.map(key => <KeyValueEditor k={key} v={parameters[key]} />)}
        </div>
    </div>
}

function KeyValueEditor(props) {
    const { k, v } = props;
    const [ key, setKey ] = React.useState(k);
    const [ value, setValue ] = React.useState(v);
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

    const onCancel = () => {
        setKey(k);
        setValue(v);
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
                <a className="button is-success">
                    <FontAwesomeIcon icon={faCheckCircle} />
                </a>
            </div>
            <div className="control">
                <a className="button is-danger" onClick={onCancel}>
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
                    {`${key}: ${value}`}
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
                    <a className="has-text-grey-dark" style={{
                        fontSize: "13px"
                    }}>
                        <FontAwesomeIcon icon={faTrash} />
                    </a>
                </div>
            </div>
        </div>
}
