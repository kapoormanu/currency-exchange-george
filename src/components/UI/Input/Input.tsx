import React, { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};
function Input(props: InputProps) {
    return (
        <>
            {props.label && <label htmlFor={props.id}>{props.label}</label>}
            <input
                type={props.type}
                name={props.id}
                id={props.id}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </>
    );
}

export default Input;
