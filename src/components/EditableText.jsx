import React from "react";
import OutsideClick from "react-outsideclick";

export default class EditableText extends React.Component {
    constructor(props) {
        super(props);
        const { text } = this.props;
        this.state = {
            text: text,
            isEditMode: false,
        }
    }

    setIsEditMode = (bool) => () => {
        this.setState({
            isEditMode: bool
        });
    };

    changeText = (e) => {
        this.setState({
            text: e.target.value
        });
    };

    reset = () => {
        const { text } = this.props;
        this.setState({
            text: text,
            isEditMode: false,
        })
    };

    update = () => {
        const { onUpdate } = this.props;
        const { text } = this.state;
        onUpdate(text);
        this.setIsEditMode(false);
    };

    render() {
        const { placeholder } = this.props;
        const { text, isEditMode } = this.state;
        return (
            isEditMode ? <OutsideClick onClickOutside={this.reset}>
                <div className="field u-m-b-5">
                    <div className="control">
                        <textarea
                            className="textarea has-fixed-size"
                            placeholder={placeholder}
                            value={text}
                            onChange={this.changeText}
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-primary" onClick={this.update}>Save</button>
                    </div>
                </div>
            </OutsideClick> : <a className="has-text-grey-dark" onClick={this.setIsEditMode(true)}>
                { text !== "" ? text : placeholder }
            </a>
        );
    }
}
