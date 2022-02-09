import { memo } from 'react';

import './Select.css';

function Select({ register, text, name, options, value, handleOnChange }) {
    return (
        <div className='form-control'>
            <label htmlFor={name}>{text}</label>
            <select
                {...register(name)}
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ''}
            >
                <option value=''>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    );
}

export default memo(Select);