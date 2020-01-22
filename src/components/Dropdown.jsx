import React from 'react';
import classNames from "classnames";
import OutsideClick from "react-outsideclick";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({ items, width, setValue, value }) => {
    const [ isActive, setIsActive ] = React.useState(false);
    console.log(value);
    const [ selectedItem, setSelectedItem ] = React.useState(value ? value : items[0]);

    console.log(width);

    const setDropdownActive = (isActive) => () => {
        setIsActive(isActive);
    };

    const getActiveDropdownClass = (isActive) => {
        return isActive ? "is-active" : "";
    };

    const setDropdownSelectedItem = v => event => {
        setSelectedItem(v);
        setValue(v);
    };

    return <OutsideClick onClickOutside={setDropdownActive(false)}>
        <div
            className={classNames("dropdown", getActiveDropdownClass(isActive))}
            onClick={setDropdownActive(!isActive)}
        >
            <div
                className="dropdown-trigger"
                style={{
                    width: width
                }}
            >
                <button className="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu3">
                    <span>{selectedItem}</span>
                    <span className="icon is-small">
                        <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                <div className="dropdown-content">
                    {items.map(i => (
                        <a key={`item-${i}`} className="dropdown-item" onClick={setDropdownSelectedItem(i)}>
                            {i}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </OutsideClick>
};


export default Dropdown;