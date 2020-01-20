import React from "react";
import {inject, observer} from "mobx-react";
import Dropdown from "./Dropdown";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { idea } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CodeMirror from "react-codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/markdown/markdown";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/solarized.css";
import "codemirror/addon/edit/closebrackets.js"
import "codemirror/addon/edit/closetag.js"
import "codemirror/addon/edit/matchbrackets.js"
import 'codemirror-graphql/mode';

const parameterName = "body";
const formDataContentType = "multipart/form-data";
const formDataFormUrlEncodedContentType = "application/x-www-form-urlencoded";
const rawContentType = "raw";

const contentTypes = [
    formDataContentType,
    formDataFormUrlEncodedContentType,
    rawContentType,
];

const rawContentTypes = [
    "application/json",
    "application/graphql",
    "text/xml",
    "text/html",
    "text/plain",
];

@inject("testStore")
@observer
class BodyParameterPanel extends React.Component {
    constructor(props) {
        super(props);
        const {header, parameterName} = this.props;
        console.log(`header: ${header}`);
        console.log(`parameterName: ${parameterName}`);
        this.state = {
            newParameters: [],
            contentType: this.getContentType(),
            body: null,
        }
    }

    getContentType = () => {
        const { testStore } = this.props;
        const { test } = testStore;
        const { contentType } = test;
        switch (contentType) {
            case formDataFormUrlEncodedContentType:
                return formDataFormUrlEncodedContentType;
            case formDataContentType:
                return formDataContentType;
            default:
                return rawContentType;
        }
    };

    isContentTypeChecked = (typ) => {
        const { contentType } = this.state;
        return contentType === typ;
    };

    setContentType = (typ) => () => {
        this.setState({
           contentType: typ,
        });
    };

    renderBodyEditor = () => {
        const { testStore } = this.props;
        const { test } = testStore;
        const { parameters, contentType } = test;
        if (this.state.contentType === rawContentType && parameters) {
            // return <BodyEditor body={parameters.body} contentType={contentType} />
            return <BodyEditor body={{test: 1}} contentType={contentType} />
        } else {
            return <div>a</div>
        }
    };

    render() {
        const { header, testStore } = this.props;
        const { body } = this.state;
        const { test } = testStore;

        return (
            <div
                className="card is-shadowless"
                style={{
                    width: '100%',
                }}
            >
                <div
                    className="card-header has-background-light"
                >
                    <div className="card-header-title">{header}</div>
                </div>

                <div className="card-content">
                    <div className="control u-m-b-25">
                        <label className="radio">
                            <input
                                className="u-m-r-5"
                                type="radio"
                                name="answer"
                                checked={this.isContentTypeChecked(rawContentType)}
                                onClick={this.setContentType(rawContentType)}
                            /> Raw
                        </label>
                        <label className="radio">
                            <input
                                className="u-m-r-5"
                                type="radio"
                                name="answer"
                                checked={this.isContentTypeChecked(formDataFormUrlEncodedContentType)}
                                onClick={this.setContentType(formDataFormUrlEncodedContentType)}
                            /> x-www-form-urlencoded
                        </label>
                        <label className="radio">
                            <input
                                className="u-m-r-5"
                                type="radio"
                                name="answer"
                                checked={this.isContentTypeChecked(formDataContentType)}
                                onClick={this.setContentType(formDataContentType)}
                            /> multipart/form-data
                        </label>
                    </div>
                    <div className="u-m-b-25">
                        {this.renderBodyEditor()}
                    </div>
                </div>
            </div>
        );
    }
}

export default BodyParameterPanel;

class BodyEditor extends React.Component {
    constructor(props) {
        super(props);
        const { body, contentType } = this.props;
        this.state = {
            body: this.objectToString(body),
            selectedRawContentType: contentType,
            isEditMode: false,
        }
    }

    updateSelectedRawContentType = (contentType) => {
        console.log("selected rawContentType=", contentType);
        this.setState({
            selectedRawContentType: contentType,
        })
    };

    setIsEditMode = bool => () => {
        const { isEditMode } = this.state;
        this.setState({
            isEditMode: bool
        })
    };

    reset = () => {
        const { body } = this.props;
        this.setState({
            body: this.objectToString(body),
            isEditMode: false,
        })
    };

    objectToString = obj => {
        return JSON.stringify(obj, null, 2);
    };

    getCodeMirrorMode = () => {
        const { selectedRawContentType } = this.state;
        switch (selectedRawContentType) {
            case "application/json":
                return {
                    name: "javascript",
                    json: true,
                };
            case "application/graphql":
                return "graphql";
            case "text/xml":
                return "xml";
            case "text/html":
                return "xml";
            default:
                return "";
        }
    };

    render() {
        const { body, isEditMode } = this.state;
        return (
            <div>
                <div className="u-m-b-10">
                    <Dropdown
                        items={rawContentTypes}
                        setValue={this.updateSelectedRawContentType}
                    />
                </div>
                <div
                    className="u-m-b-10"
                    style={{
                    border: '1px solid #ededed',
                }}>
                    {isEditMode ? <CodeMirror
                        value={body}
                        options={{
                            mode: this.getCodeMirrorMode(),
                            theme: 'solarized',
                            autoCloseBrackets: true,
                            autoCloseTags:true,
                            findMatchingBracket: true,
                            lineNumbers: true,
                        }}
                    /> : <SyntaxHighlighter language="json" style={idea}>
                        {body}
                    </SyntaxHighlighter>}
                </div>
                {isEditMode ? <div className="level">
                    <div className="level-left">
                        <button
                            className="button"
                            onClick={this.reset}
                        >
                            <span className="has-text-weight-semibold">Cancel</span>
                        </button>
                    </div>
                    <div className="level-right">
                        <button className="button is-success">
                            <span className="has-text-weight-semibold">Save request body</span>
                        </button>
                    </div>
                </div> : <div className="level">
                    <div className="level-left">
                        <button
                            className="button is-link"
                            onClick={this.setIsEditMode(true)}
                        >
                            <span className="has-text-weight-semibold">Edit</span>
                        </button>
                    </div>
                </div>}
            </div>
        );
    }
}
