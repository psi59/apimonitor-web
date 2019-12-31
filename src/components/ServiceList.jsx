import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames';
import Avatar from "./Avatar";
import {inject, observer} from "mobx-react";
import autobind from "autobind-decorator";

@inject("webServiceStore")
@observer
@autobind
class ServiceList extends React.Component {
    constructor(props) {
        super(props);
        const { webServiceStore } = this.props;
        webServiceStore.findAll();
    }

    render() {
        const { webServiceList } = this.props.webServiceStore;
        return (
            <section className="section">
                {webServiceList.items.map(webService => (
                    <ServiceListItem
                        key={`webService_${webService.id}`}
                        service_id={webService.id}
                        image={webService.favicon}
                        host={webService.host}
                        http_schema={webService.http_schema}
                        schedule={webService.schedule}
                        desc={webService.desc}
                    />
                ))}
            </section>
        );
    }
}

export default ServiceList;

function ServiceListItem(props) {
    return <div className="box">
        <div className="level">
            <div className="level-left">
                <Avatar
                    image={props.image}
                    host={props.host}
                />
                <div className="level-item">
                    <strong className="title is-4">
                        <a href={`/services/${props.service_id}`}>
                            {props.host}
                        </a>
                    </strong>
                </div>
            </div>
            <div className="level-right">
                <button className="button is-primary is-outlined">
                    <span>Run tests</span>
                    <span className="icon is-small">
                      <FontAwesomeIcon icon={faPlay}/>
                    </span>
                </button>
            </div>
        </div>
        <div className="section is-paddingless has-text-left">
            <div className="has-text-grey has-text-left">
                {props.desc}
            </div>
        </div>
        <div
            className="section is-paddingless has-text-left"
            style={{
                marginTop: "10px"
            }}
        >
            <span
                className={classNames("tag", "u-m-r-5", ((props.http_schema==="https" ? "is-success" : "is-danger")))}
            >
                {props.http_schema}
            </span>
            <span
                className={classNames("tag", "u-m-r-5", "is-warning")}
            >
                {`schedule: ${props.schedule}`}
            </span>
        </div>
    </div>
}
