import React from 'react';
import {inject, observer} from "mobx-react";
import ParameterPanel from "./ParameterPanel";
import BodyParameterPanel from "./BodyParameterPanel";
import Dropdown from "./Dropdown";
import AlertParameterPanel from "./AlertParameterPanel";
const schedules = [
    "1m",
    "5m",
    "15m",
    "30m",
    "1h",
    "1d"
];

@inject(
    "testStore"
)
@observer
class TestSettingPanel extends React.Component {
    updateSchedule = (schedule) => {
        const { testStore } = this.props;
        testStore.updateSchedule(schedule);
        const { test } = testStore;
        testStore.updateOne(test);
    };

    render() {
        const { testStore } = this.props;
        const { test } = testStore;
        const { schedule } = test;
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
                    <div
                        className="card is-shadowless"
                        style={{
                            width: '100%',
                        }}
                    >
                        <div
                            className="card-header has-background-light"
                        >
                            <div className="card-header-title">Schedule</div>
                        </div>
                        <div className="card-content">
                            {schedule && <Dropdown
                                width="100px"
                                items={schedules}
                                value={schedule}
                                setValue={this.updateSchedule}
                            />}
                        </div>
                    </div>
                </div>
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
                    <AlertParameterPanel />
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

