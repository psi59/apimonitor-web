import React from 'react';
import {inject, observer} from "mobx-react";
import ParameterPanel from "./ParameterPanel";
import {set} from "mobx";
import BodyParameterPanel from "./BodyParameterPanel";

const parameterTab = "parameter";
const assertionTab = "assertion";
const settingTab = "setting";
const tabs = [
    parameterTab,
    assertionTab,
    settingTab,
];

@inject(
    "testStore"
)
@observer
class TestSettingPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: parameterTab,
        }
    }

    selectTab = tab => e => {
        this.setState({
            selectedTab: tab
        })
    };

    getTabClass = tab => {
        const { selectedTab } = this.state;
        return (selectedTab === tab) ? "is-active" : "";
    };

    render() {
        const { testStore } = this.props;
        const { selectedTab } = this.state;
        const { test } = testStore;
        const panelStyle = {
          border: "1px solid #e5e5e5"
        };
        const panelBlockStyle = {
            padding: 0
        };
        return (
            test && <div className="panel is-shadowless" style={panelStyle}>
                <div className="panel-block">
                    <div className="tabs is-boxed">
                        <ul>
                            <li
                                className={this.getTabClass(parameterTab)}
                                onClick={this.selectTab(parameterTab)}
                            >
                                <a className="has-text-weight-bold has-text-link">Parameters</a>
                            </li>
                            <li
                                className={this.getTabClass(assertionTab)}
                                onClick={this.selectTab(assertionTab)}
                            >
                                <a className="has-text-weight-bold has-text-link">Assertions</a>
                            </li>
                            <li
                                className={this.getTabClass(settingTab)}
                                onClick={this.selectTab(settingTab)}
                            >
                                <a className="has-text-weight-bold has-text-link">Settings</a>
                            </li>
                        </ul>
                    </div>
                </div>
                {(selectedTab === parameterTab) && <div>
                    <div
                        className="panel-block"
                        style={panelBlockStyle}
                    >
                        <ParameterPanel
                            header="Header parameters"
                            parameterName={"header"}
                        />
                    </div>
                    <div
                        className="panel-block"
                        style={panelBlockStyle}
                    >
                        <ParameterPanel
                            header="Query parameters"
                            parameterName={"query"}
                        />
                    </div>
                    <div
                        className="panel-block"
                        style={panelBlockStyle}
                    >
                        <BodyParameterPanel
                            header="Request body"
                            parameterName={"body"}
                        />
                    </div>
                </div>}
            </div>
        );
    }
}

export default TestSettingPanel;

