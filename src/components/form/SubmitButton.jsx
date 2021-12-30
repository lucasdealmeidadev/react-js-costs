import { memo } from 'react';

import './SubmitButton.css';

function SubmitButton({ text }) {
    return (
        <div>
            <button className='btn'>{text}</button>
        </div>
    );
}

export default memo(SubmitButton);