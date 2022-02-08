import { memo } from 'react';
import { ErrorMessage as Message } from '@hookform/error-message';

import './ErrorMessage.css';

function ErrorMessage({ errors, name }) {
    return (
        <Message
            errors={errors}
            name={name}
            render={({ message }) => <p className='alert-danger'> {message} </p>}
        />
    );
}

export default memo(ErrorMessage);