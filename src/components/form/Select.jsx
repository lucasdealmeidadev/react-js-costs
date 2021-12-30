import { memo } from 'react';

import './Select.css';

function Select({ text, name, options, value, handleOnChange}) {
    return (
        <div className='form-control'>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name}>
                <option>Selecione uma opção</option>
            </select>
        </div>
    );
}

export default memo(Select);