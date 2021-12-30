import { memo } from 'react';

import './Input.css';

function Input({ type, text, name, value, placeholder, handleOnChange }) {
    return (
        <div className='form-control'>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                placeholder={placeholder}
                onChange={handleOnChange}
            />
        </div>
    );
}

export default memo(Input);