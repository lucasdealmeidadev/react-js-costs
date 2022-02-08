import { memo } from 'react';

import './Input.css';


const Input = ({ register, type, text, name, value, placeholder, handleOnChange }) => {
    return (
        <div className='form-control'>
            {text && <label htmlFor={name}>{text}</label>}
            <input
                {...register(name)}
                type={type}
                name={name}
                id={name}
                value={value}
                placeholder={placeholder}
                onChange={handleOnChange}
            />
        </div>
    );
};

export default memo(Input);