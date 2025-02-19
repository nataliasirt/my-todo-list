import { useEffect, useRef } from "react";

import PropTypes from 'prop-types';
import styles from './InputWithLabel.module.css';

const InputWithLabel = ({id, type, name, value, onChange, placeholder, children}) => {
    const inputRef = useRef();
    useEffect(()=> {
        inputRef.current.focus();
    },[])

    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input
                ref={inputRef}
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </>
    );
};

InputWithLabel.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.object,
    placeholder: PropTypes.string
};

export default InputWithLabel;
