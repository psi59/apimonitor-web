import React from "react";
import {inject, observer} from "mobx-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEdit, faPlus, faTimesCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames';
import shortid from 'shortid';
import {observable} from "mobx";

@inject("testStore")
@observer
class ParameterPanel extends React.Component {
    constructor(props) {
        super(props);
        const {header, parameterName} = this.props;
        console.log(`header: ${header}`);
        console.log(`parameterName: ${parameterName}`);
        this.state = {
            newParameters: [],
        }
    }

    updateParameter = (oldKey)  => (key, value) => {
        const { testStore, parameterName } = this.props;
        const { test } = testStore;
        const { parameters } = test;
        let parameter = parameters[parameterName];
        if (oldKey) {
            delete parameter[oldKey];
            console.log(`deleted k=${oldKey}: `, parameter);
        }
        parameter[key] = value;
        console.log(`added key=${key}: `, parameter);
        this.updateTestWithParameters(parameter);
    };

    deleteParameter = (oldKey) => () => {
        const { testStore, parameterName } = this.props;
        const { test } = testStore;
        const { parameters } = test;
        let parameter = parameters[parameterName];
        delete parameter[oldKey];
        this.updateTestWithParameters(parameter);
    };

    updateTestWithParameters = parameter => {
        console.log("updateTestWithParameters=1");
        const { testStore, parameterName } = this.props;
        const { test } = testStore;
        console.log("updateTestWithParameters=2");
        test.updateParameters(parameterName, parameter);
        console.log("newTest=", test);
        testStore.updateOne(test).then(isUpdated => {
            if (isUpdated)
                console.log("updated test")
        }).catch(reason => {
            console.log("reason: ", reason)
        });
    };

    deleteParameterInNewParameters = key => {
        console.log("deleted key=", key);
        let newParameter = this.state.newParameters;
        this.setState({
            newParameters: newParameter.filter(k => k !== key),
        });
    };

    render() {
        const { testStore, header, parameterName } = this.props;
        const { newParameters } = this.state;
        const { test } = testStore;
        const { parameters } = test;
        const parameter = parameters && parameters[parameterName];
        const properties = parameter && Object.entries(parameter);
        console.log("properties=", properties);
        console.log("parameter=", parameter);
        properties && console.log("properties.length= ", properties.length);
        console.log("newParameter.length= ", newParameters.length);
        console.log("newParameter= ", newParameters);

        return test && (
            <div className="card u-m-b-10">
                <div className="card-header">
                    <div className="card-header-title">{header}</div>
                </div>

                <div className="card-content">
                    {properties && <div className="container">
                        <p
                            className={
                                classNames(
                                    "has-text-centered",
                                    "has-text-grey",
                                    (!(properties.length === 0 && newParameters.length === 0) ? "is-hidden":"")
                                )
                            }
                        >
                            No parameters
                        </p>
                        {properties.map(([k, v]) =>
                            <KeyValueEditor
                                key={k}
                                k={k}
                                v={v}
                                onUpdate={this.updateParameter(k)}
                                onDelete={this.deleteParameter(k)}
                            />
                        )}
                        {newParameters.map((k, i) => (<KeyValueEditor
                            key={k}
                            k={""}
                            v={""}
                            onUpdate={(key, value) => {
                                const updateParameterFn = this.updateParameter("");
                                updateParameterFn(key, value);
                                this.deleteParameterInNewParameters(k)
                            }}
                            onCancel={() => {
                                this.deleteParameterInNewParameters(k);
                            }}
                            isEditable={true}
                        />))}
                    </div>}
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
                                const id = shortid.generate();
                                console.log("shortid=", id);
                                this.setState({
                                    newParameters: [
                                        ...newParameters,
                                        id,
                                    ]
                                });
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ParameterPanel;

class KeyValueEditor extends React.Component {
    constructor(props) {
        super(props);
        const { k, v, isEditable } = this.props;
        this.state = {
            propertyName: k,
            propertyValue: v,
            isInvalidPropertyName: false,
            isInvalidPropertyValue: false,
            isEditable: isEditable,
        };
    }

    updateParameter = () => {
        const { isEditable } = this.props;
        const { propertyName, propertyValue } = this.state;
        if (!propertyName) {
            this.setIsInvalidPropertyName(true);
        } else if (!propertyValue) {
            this.setIsInvalidPropertyValue(true);
        }
        if (!propertyValue || !propertyName) {
            return;
        }
        this.props.onUpdate(propertyName, propertyValue);
        if (!isEditable)
            this.setIsEditable(false);
    };

    cancelEdit = () => {
        const { onCancel } = this.props;
        const { propertyName, propertyValue } = this.state;
        if (onCancel) {
            console.log("propertyName=", propertyName);
            console.log("propertyValue=", propertyValue);
            onCancel();
        } else {
            console.log("cancel edit");
            this.setIsEditable(false);
        }
    };

    setIsEditable = b => this.setState({
       isEditable: b,
    });

    setIsInvalidPropertyName = b => this.setState({
        isInvalidPropertyName: b,
    });

    setIsInvalidPropertyValue = b => this.setState({
        isInvalidPropertyValue: b,
    });

    changePropertyName = e => {
        this.setState({
            propertyName: e.target.value,
            isInvalidPropertyName: false,
        });
    };

    changePropertyValue = e => {
        this.setState({
            propertyValue: e.target.value,
            isInvalidPropertyValue: false,
        });
    };

    render() {
        const { k, v, onDelete } = this.props;
        const { isEditable, propertyName, propertyValue, isInvalidPropertyName, isInvalidPropertyValue } = this.state;
        return (
            isEditable ? <div className="field has-addons has-addons-centered">
                <div className="control is-expanded">
                    <input
                        className={classNames("input", isInvalidPropertyName ? "is-danger": "")}
                        placeholder="Name" value={propertyName}
                        onChange={this.changePropertyName}
                    />
                </div>
                <div className="control is-expanded">
                    <input
                        className={classNames("input", isInvalidPropertyValue ? "is-danger": "")}
                        placeholder="Value"
                        value={propertyValue}
                        onChange={this.changePropertyValue}
                    />
                </div>
                <div className="control">
                    <a className="button is-success" onClick={this.updateParameter}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </a>
                </div>
                <div className="control">
                    <a className="button is-danger" onClick={this.cancelEdit}>
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
                            onClick={e => this.setIsEditable(true)}
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
        );
    }
}
