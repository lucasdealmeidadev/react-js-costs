import { useLocation } from 'react-router-dom';
import { useEffect, memo, useState } from 'react';
import { ProjectCard } from '../project';
import { Container, LinkButton, Message, Loading } from '../layout';

import './Projects.css';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    
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

        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjects(data);
            setRemoveLoading(true);
        })
        .catch((error) => console.log(error));
    }, []);

    return (
        <div className='project-container'>
            <div className='title-container'>
                <h1>Meus Projetos</h1>
                <LinkButton to='/new-project' text='Criar Projeto'/>
            </div>
            
            {message && <Message type={type} message={message} />}
            
            <Container customClass='start'>
                {
                    projects.length > 0 && projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                        />
                    )) 
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    );
}

export default memo(Projects);