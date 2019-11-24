import React, {Component} from 'react'
import {updateService} from "../store/modules/service";
import {connect} from "react-redux";
import axios from "axios";
import {getApiUrl} from "../helpers/API";
import Service from "../pages/Service";
import {getWebServiceId} from "../helpers/utils/path";

class ServiceContainer extends Component {
    constructor(props) {
        super(props);
        const { updateService } = this.props;
        const service_id = getWebServiceId();
        axios.get(getApiUrl(`v1/webservices/${service_id}`), {
            withCredentials: true,
        }).then((res) => {
            const service = res.data.result;
            updateService(service);
        }).catch((e) => {
            console.log(e)
        });
    }


    render() {
        const { service } = this.props;
        return <Service service={service} />
    }
}

const mapStateToProps = state => ({
   service: state.serviceReducer.service,
});

const mapDispatchToProps = dispatch => ({
   updateService: service => dispatch(updateService(service)),
});

// const mapDispatchToProps = dispatch => bindActionCreators({ services }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiceContainer);