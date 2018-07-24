import React from 'react';
import './T9button.css';

const button = (props) => {
    return (
        <div>
            <button
                onClick={props.onClick}
                disabled={props.disabled}
                className={resolveClassname(props.text)}
            >
                {props.text}
            </button>
        </div>
    );
};

function resolveClassname(buttonType) {
    switch (buttonType) {
        case 'cycle':
        case 'delete':
            return "btn btn-primary btn-T9";
        default:
            return "btn btn-default btn-T9";
    }
};

export default button;