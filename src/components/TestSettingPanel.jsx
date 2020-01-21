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
    }

    render() {
        const { testStore } = this.props;
        const { test } = testStore;
        const panelStyle = {
          border: "1px solid #e5e5e5"
        };
        const panelBlockStyle = {
            padding: 0
        };
        return (
            test && <div className="panel is-shadowless" style={panelStyle}>
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
            </div>
        );
    }
}

export default TestSettingPanel;

