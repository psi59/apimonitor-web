import * as React from "react";
import ServiceContainer from "../containers/ServiceContainer";
import {Link} from "react-router-dom";

class Service extends React.Component{
    render() {
        return (
            <div>
                <section className="hero">
                    <div className="hero-body has-text-left">
                        <h2 className="title">Services</h2>
                        <h3 className="subtitle">test</h3>
                    </div>
                </section>
                <section className="section u-p-b-0 u-p-t-0">
                    <div className="level">
                        <div className="level-left"></div>
                        <div className="level-right">
                            <Link className="button is-success is-outlined" to="/service/new">New web service</Link>
                        </div>
                    </div>
                </section>
                <ServiceContainer />
            </div>
        )
    }

}

export default Service;
