import React from "react";
import {inject, observer} from "mobx-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames';
import shortid from 'shortid';
import KeyValueEditor from "./KeyValueEditor";

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
            <div
                className="card is-shadowless"
                style={{
                    width: "100%"
                }}
            >
                <div
                    className="card-header has-background-light"
                >
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
