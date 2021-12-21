import { memo } from 'react';
import './Container.css';

function Container({ children, customClass }) {
    return (
        <div className={`container ${customClass}`}>
            {children}
        </div>
    );
}

export default memo(Container);