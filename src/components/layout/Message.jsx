import { Fragment, useState, useEffect, memo } from 'react';
import './Message.css';

function Message({ type, message }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if(!message){
            setVisible(false);
            return;
        }

        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [message]);

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