import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames';
import Avatar from "./Avatar";

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

export default function ServiceList({ services }) {
    return <section className="section">
        {services.map(service => (
            <ServiceListItem
                key={`service_${service.id}`}
                service_id={service.id}
                image={service.favicon}
                host={service.host}
                http_schema={service.http_schema}
                schedule={service.schedule}
                desc={service.desc}
            />
        ))}
    </section>
}