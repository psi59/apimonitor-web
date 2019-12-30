import React from 'react';

export default function ParameterEditor(props) {
    const { title, parameters, setParametersFunc } = props;
    const [ params, setParams ] = React.useState(parameters);

    const addParameter = () => {
        console.log("test");
        setParams({
            ...params,
            "": "",
        })
    };

    return <div className="card">
        <div className="card-header">
            <div className="card-header-title">{title}</div>
        </div>
        <div className="card-content">
            <div className="has-text-centered has-text-grey">No parameters</div>
            {/*{params ?*/}
            {/*    Object.keys(params).map(k => <ParameterInput name={k} value={params[k]} setParamFunc={} />)*/}
            {/*    : <div className="has-text-centered has-text-grey">No parameters</div>}*/}
        </div>
        <div className="card-footer">
            <a href="#" className="card-footer-item" onClick={addParameter}>Add Parameters</a>
        </div>
    </div>
}

// function ParameterInput(props) {
//     const { name, value, setParamFunc } = props;
//     const {editedName, setEditedName} = React.useState(name);
//     const {editedValue, setEditedValue} = React.useState(value);
//
//     const onChange = (setFunc, setEditedFunc) => event => {
//         setFunc(event.target.value);
//         setEditedFunc(event.target.value);
//     };
//
//     return <div className="field has-addons">
//         <div className="control">
//             <input
//                 className="input"
//                 placeholder="Name"
//                 value={editedName}
//                 onChange={onChange(setNameFunc, setEditedName)}
//             />
//         </div>
//         <div className="control is-expanded">
//             <input
//                 className="input is-fullwidth"
//                 placeholder="Value"
//                 value={editedValue}
//                 onChange={onChange(setValueFunc, setEditedValue)}
//             />
//         </div>
//         <div className="control">
//             <button className="button is-success">
//                 <FontAwesomeIcon icon={faCheck}/>
//             </button>
//         </div>
//         <div className="control">
//             <button className="button is-danger">
//                 <FontAwesomeIcon icon={faTrashAlt}/>
//             </button>
//         </div>
//     </div>
// }
