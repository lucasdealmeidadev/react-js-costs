import { useLocation } from 'react-router-dom';
import { useEffect, memo } from 'react';
import { Message } from '../layout';

function Projects() {
    const location = useLocation();
    let type = '';
    let message = '';

    if (location.state) {
        type = location.state.type;
        message = location.state.message;
    }

    useEffect(() => {
        window.history.replaceState({}, document.title);
    }, []);

    return (
        <div>
            <h1>Meus Projetos</h1>
            {message && <Message type={type} message={message} />}
        </div>
    );
}

export default memo(Projects);