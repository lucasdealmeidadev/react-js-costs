import { memo } from 'react';

import './Input.css';
import './Textarea.css';

function Textarea({ text, name, value,  placeholder, handleOnChange, rows }) {
    return (
        <div className='form-control'>
            {text && <label htmlFor={name}>{text}</label>}

            <textarea
                name={name}
                value={value}
                placeholder={ placeholder}
                onChange={handleOnChange}
                rows={rows}
            />
        </div>
    );
}

export default memo(Textarea);