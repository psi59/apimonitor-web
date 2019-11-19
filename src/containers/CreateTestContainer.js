import React, {Component} from 'react'
import {connect} from "react-redux";
import CreateTest from "../pages/CreateTest";
import {updateService} from "../store/modules/service";
import {getWebServiceId} from "../helpers/utils/path";
import {getApiUrl} from "../helpers/API";
import axios from "axios";

class CreateTestContainer extends Component {
    constructor(props) {
        super(props);
        const { updateService } = this.props;
        const service_id = getWebServiceId();
        console.log(`service_id=${service_id}`);
        axios.get(getApiUrl(`v1/webservices/${service_id}`), {
            withCredentials: true,
        }).then((res) => {
            const service = res.data.result;
            console.log(service);
            updateService(service);
        }).catch((e) => {
            console.log(e)
        });
    }

    render() {
        const { service } = this.props;
        console.log(service);
        return <CreateTest service={service} />
    }
}

const mapStateToProps = state => ({
    service: state.serviceReducer.service,
});

const mapDispatchToProps = dispatch => ({
    updateService: service => dispatch(updateService(service)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateTestContainer)
