import * as React from "react";
import {Link} from "react-router-dom";
import ServiceListContainer from "../containers/ServiceListContainer";

class Home extends React.Component{
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
                            <Link className="button is-success is-outlined" to="/services/new">New web service</Link>
                        </div>
                    </div>
                </section>
                <ServiceListContainer />
            </div>
        )
    }

}

export default Home;
