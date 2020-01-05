import React from 'react'
import {Redirect} from "react-router-dom";
import classNames from 'classnames';
import {inject, observer} from "mobx-react";

@inject("webServiceStore")
@observer
class CreateService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            host: "",
            isCreated: false,
            isError: false,
            errorMsg: "",
        }
    }

    changeHost = e => {
        this.setState({
            host: e.target.value,
            isError: false,
            errorMsg: "",
        })
    };

    createService = () => {
        const { webServiceStore } = this.props;
        const { host } = this.state;

        webServiceStore.createOne({
            host: host,
        }).then(res => {
            if (res.status === 200)
                this.setState({
                    isCreated: true,
                    errorMsg: "",
                });
            else
                console.log(res);
                this.setState({
                    isError: true,
                    errorMsg: res.data.all
                });
        }).catch(reason => {
            console.log("reason: ", reason)
        });
    };

    render() {
        const { isError, isCreated, errorMsg } = this.state;
        return (
            isCreated ? <Redirect to="/" /> : <div className="section is-small">
                <div className="columns is-centered">
                    <section className="column is-small is-8">
                        <div className="has-text-left u-m-b-20">
                            <h3 className="title  u-m-b-5">Add a new web service</h3>
                            <h4 className="subtitle  u-m-b-10">Start by entering a URL for the API or website you want to test</h4>
                        </div>
                        <hr className="u-m-0 u-m-b-50"/>
                        <section className="section is-paddingless has-text-left">
                            <div className="u-m-b-5">
                                <strong>Enter a URL</strong>
                            </div>
                            <div>
                                <div
                                    className="field has-addons"
                                    style={{
                                        marginBottom: '5px'
                                    }}
                                >
                                    <div className="control is-expanded is-fullwidth">
                                        <input
                                            className={classNames("input", (isError ? "is-danger":""))}
                                            type="text"
                                            placeholder="https://example.com"
                                            onChange={this.changeHost}
                                        />
                                    </div>
                                    <div className="control">
                                        <button className="button is-primary" onClick={this.createService}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                                <p className="has-text-left has-text-danger">
                                    {errorMsg}
                                </p>
                            </div>
                        </section>
                    </section>
                </div>
            </div>
        );
    }
}

export default CreateService;

// export default function CreateService(props) {
//     const [ host, setHost ] = React.useState("");
//     const [ isCreated, setIsCreated ] = React.useState(false);
//     const [ isError, setIsError ] = React.useState(false);
//
//     const handleChange = (event) => {
//         setIsError(false);
//         const { value } = event.target;
//         setHost(value);
//     };
//
//     const createService = () => {
//         console.log(`host=${host}`);
//         axios.post(getApiUrl("v1/webservices"), {
//             host: host,
//             schedule: "5m"
//         }).then((res) => {
//             console.log(res);
//             setIsCreated(true);
//         }).catch(error => {
//             console.log(error.response);
//             setIsError(true);
//         });
//
//         console.log("Created web service")
//     };
//
//     return isCreated ? <Redirect to="/" /> : <div className="section is-small">
//         <div className="columns is-centered">
//             <section className="column is-small is-8">
//                 <div className="has-text-left u-m-b-20">
//                     <h3 className="title  u-m-b-5">Add a new web service</h3>
//                     <h4 className="subtitle  u-m-b-10">Start by entering a URL for the API or website you want to test</h4>
//                 </div>
//                 <hr className="u-m-0 u-m-b-50"/>
//                 <section className="section is-paddingless has-text-left">
//                     <div className="u-m-b-5">
//                         <strong>Enter a URL</strong>
//                     </div>
//                     <div>
//                         <div className="field has-addons">
//                             <div className="control is-expanded is-fullwidth">
//                                 <input className={classNames("input", (isError ? "is-danger":""))} type="text" placeholder="https://example.com" onChange={handleChange} />
//                             </div>
//                             <div className="control">
//                                 <button className="button is-primary" onClick={createService}>
//                                     Submit
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </section>
//         </div>
//     </div>
// }
