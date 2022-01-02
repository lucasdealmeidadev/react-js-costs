import { useLocation } from 'react-router-dom';
import { useEffect, memo } from 'react';
import { Container, LinkButton, Message } from '../layout';

import './Projects.css';

function Projects() {
    const location = useLocation();
    let type = '';
    let message = '';

    if (location.state) {
        type = location.state.type;
        message = location.state.message;
    }

    useEffect(() => {
        if (location.state) {
            window.history.replaceState({}, document.title);
        }
    }, []);

    return (
        <div className='project-container'>
            <div className='title-conatiner'>
                <h1>Meus Projetos</h1>
                <LinkButton to='/new-project' text='Criar Projeto'/>
            </div>
            
            {message && <Message type={type} message={message} />}
            
            <Container customClass='start'>
                <p>Projetos...</p>
            </Container>
        </div>
    );
}

export default memo(Projects);