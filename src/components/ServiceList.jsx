import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames';
import Avatar from "./Avatar";
import {inject, observer} from "mobx-react";
import * as shortid from "shortid";

@inject("webServiceStore")
@observer
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
                        key={shortid.generate()}
                        webService={webService}
                    />
                ))}
            </section>
        );
    }
}

export default ServiceList;

function ServiceListItem(props) {
    const { webService } = props;
    return <div className="box">
        <div className="level">
            <div className="level-left">
                <Avatar
                    // image={webService.favicon}
                    host={webService.host}
                />
                <div className="level-item">
                    <strong className="title is-4">
                        <a href={`/services/${webService.id}`}>
                            {webService.host}
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
                {webService.description}
            </div>
        </div>
        <div
            className="section is-paddingless has-text-left"
            style={{
                marginTop: "10px"
            }}
        >
            <span
                className={classNames(
                    "tag",
                    "u-m-r-5",
                    ((webService.schema==="https" ? "is-success" : "is-danger"))
                )}
            >
                {webService.schema}
            </span>
        </div>
    </div>
}
