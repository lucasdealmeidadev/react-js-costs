import { Fragment, useState, useEffect, memo } from 'react';
import './Message.css';

function Message({ type, message, setMessage }) {
    const [visible, setVisible] = useState(false);
   
    useEffect(() => {
        if(!message){
            setVisible(false);
            return;
        }

        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
            setMessage({});
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