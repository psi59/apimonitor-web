import React, {Component} from 'react'
import ServiceList from "../components/ServiceList";
import {updateServices} from "../store/modules/service";
import {connect} from "react-redux";
import axios from "axios";
import {getApiUrl} from "../helpers/API";

class ServiceListContainer extends Component {
    constructor(props) {
        super(props);
        const { updateServices } = this.props;
        axios.get(getApiUrl(`v1/webservices`), {
            withCredentials: true,
        }).then((res) => {
            const { items } = res.data.result;
            console.log(items);
            updateServices(items);
        }).catch((e) => {
            console.log(e)
        });
    }


    render() {
        const { services } = this.props;
        console.log(services);
        return <ServiceList services={services} />
    }
}

const mapStateToProps = state => ({
   services: state.serviceReducer.services,
});

const mapDispatchToProps = dispatch => ({
   updateServices: services => dispatch(updateServices(services)),
});

// const mapDispatchToProps = dispatch => bindActionCreators({ services }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiceListContainer);
