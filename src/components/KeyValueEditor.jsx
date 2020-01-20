import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEdit, faTimesCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames';

export default class KeyValueEditor extends React.Component {
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
