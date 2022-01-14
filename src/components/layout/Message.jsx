import { Fragment, useState, useEffect, memo } from 'react';
import './Message.css';

function Message({ type, message, hash, setMessage }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) {
            setVisible(false);
            return;
        }

        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
            setMessage({});
        }, 4000);

        return () => clearTimeout(timer);
    }, [hash]);

    return (
        <Fragment>
            {visible && (
                <div className={`message ${type}`}>
                    {message}
                </div>
            )}
        </Fragment>
    );
}

export default memo(Message);