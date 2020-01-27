import React from 'react';
import {observer} from "mobx-react";
import shortid from "shortid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle, faPlus, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useStores} from "../stores/store";
import {observable} from "mobx";
import classNames from "classnames";

const AlertParameterPanel = observer(() => {
    const [ newParameters, setNewParameters ] = React.useState([]);
    const { testStore } = useStores();
    const { test } = testStore;
    const observableAlerts = observable.array(test.alerts);
    const removeKeyInNewParameters = (key) => () => {
        setNewParameters(newParameters.filter(k => k !== key))
    };

    const updateAlerts = (k) => (oldAlert, newAlert) => {
        console.log(1, testStore);
        let alerts = testStore.test.alerts ? testStore.test.alerts : [];
        if (oldAlert)
            alerts = alerts.filter(alert => alert.url !== oldAlert);
        if (newAlert)
            alerts.push({url: newAlert});
        console.log("oldAlert=", oldAlert, "newAlert=", newAlert);
        console.log(0, "alerts=", alerts);
        testStore.updateAlerts(alerts);
        console.log(0, "updated");
        testStore.updateOne(testStore.test).then(value => {
            console.log("ok=", value)
        }).catch(reason => {
            console.log("reason=", reason);
        });
        console.log(1, "updated");
        if (k)
            console.log("delete k=", k);
            const deleteParam = removeKeyInNewParameters(k);
            deleteParam();
    };

    const deleteAlerts = (url) => {
        let alerts = testStore.test.alerts ? testStore.test.alerts : [];
        alerts = alerts.filter(alert => alert.url !== url);
        testStore.updateAlerts(alerts);
        testStore.updateOne(testStore.test).then(value => {
            console.log("ok=", value)
        }).catch(reason => {
            console.log("reason=", reason);
        });
    };

    return test && <div
        className="card is-shadowless"
        style={{
            width: "100%"
        }}
    >
        <div
            className="card-header has-background-light"
        >
            <div className="card-header-title">Alerts</div>
        </div>

        <div className="card-content">
            { observableAlerts.length > 0 ?
                test.alerts.map(alert => <AlertEditorWrapper
                    key={shortid.generate()}
                    url={alert.url}
                    onUpdate={updateAlerts()}
                    onDelete={deleteAlerts}
                />) : <p
                    className={
                        classNames(
                            "has-text-centered",
                            "has-text-grey",
                            (!(observableAlerts.length === 0 && newParameters.length === 0) ? "is-hidden":"")
                        )
                    }
                >
                    No alerts
                </p>}
            {newParameters.map((k) => <AlertEditorWrapper
                key={k}
                url=""
                editable={true}
                onUpdate={updateAlerts(k)}
                onCancel={removeKeyInNewParameters(k)}
            />)}
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
                        setNewParameters([
                                ...newParameters,
                                id,
                        ]);
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    </div>
});

export default AlertParameterPanel;

const AlertEditorWrapper = ({url, editable , onUpdate, onDelete, onCancel}) => {
    const [ isEditable, setIsEditable ] = React.useState(editable);
    return isEditable ?
        <WebHookAlertEditor
            url={url}
            onUpdate={onUpdate}
            onCancel={onCancel ? onCancel : () => {setIsEditable(false)}}
        /> : <AlertEditorReadOnly
            url={url}
            onEdit={() => setIsEditable(true)}
            onDelete={() => { onDelete(url) }}
        />
};

const AlertEditorReadOnly = ({url, onEdit, onDelete}) => {
    return <div className="level">
        <div className="level-left">
            <div className="level-item">
                <label className="checkbox">
                    <input type="checkbox"/>
                </label>
            </div>
            <div className="level-item is-italic has-text-black is-bold">
                {url}
            </div>
        </div>
        <div className="level-right">
            <div className="level-item">
                <a
                    className="has-text-grey-dark"
                    style={{
                        fontSize: "13px"
                    }}
                    onClick={() => onEdit()}
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
};

const WebHookAlertEditor = ({ url, onUpdate, onCancel }) => {
    const [ webHookUrl, setWebHookUrl ] = React.useState(url);

    return <div className="field has-addons">
        <div className="control is-expanded">
            <input
                className="input is-fullwidth"
                type="text"
                placeholder="http://<your.mattermost.url>/webhook-url"
                onChange={e => setWebHookUrl(e.target.value)}
                value={webHookUrl}
            />
        </div>
        <div className="control">
            <button
                className="button is-success"
                onClick={e => {onUpdate(url, webHookUrl)}}
            >
                <FontAwesomeIcon icon={faCheckCircle} />
            </button>
        </div>
        <div className="control">
            <button
                className="button is-danger"
                onClick={onCancel}
            >
                <FontAwesomeIcon icon={faTimesCircle} />
            </button>
        </div>
    </div>
};