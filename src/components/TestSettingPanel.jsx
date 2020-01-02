import React from 'react';
import {inject, observer} from "mobx-react";
import autobind from "autobind-decorator";
import ParameterPanel from "./ParameterPanel";

@inject(
    "testStore"
)
@observer
@autobind
class TestSettingPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { testStore } = this.props;
        const { test } = testStore;
        return (
            test && <div>
                <ParameterPanel
                    header="Header parameters"
                    parameterName={"header"}
                />
                <ParameterPanel
                    header="Query parameters"
                    parameterName={"queryParam"}
                />
                <ParameterPanel
                    header="Request body"
                    parameterName={"requestData"}
                />
            </div>
        );
    }
}

export default TestSettingPanel;

