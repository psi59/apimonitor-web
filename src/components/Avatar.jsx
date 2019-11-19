import React from 'react'
import {getFirstLetterOfDomain} from "../helpers/utils/string";

export default function Avatar(props) {
    return <p className="image is-24x24 has-background-grey-light u-m-r-5 has-text-white has-text-centered is-uppercase">
        {props.image ? <img src={props.image} className="level-item"  alt="favicon"/> : getFirstLetterOfDomain(props.host) }
    </p>
}
