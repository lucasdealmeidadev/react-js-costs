import { useLocation } from 'react-router-dom';
import { useEffect, memo, useState } from 'react';
import { ProjectCard } from '../project';
import { Container, LinkButton, Message, Loading } from '../layout';

import './Projects.css';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [message, setMessage] = useState({});
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            const {type, message } = location.state;

            setMessage({ type: type, message: message });
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

    const removeProject = (id) => {
        setRemoveLoading(false);
        setMessage({});

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjects(projects.filter((project) => project.id !== id));
            setRemoveLoading(true);
            setMessage({ type: 'success', message: 'Projeto removido com sucesso!' });
        })
        .catch((error) => console.log(error));
    }

    return (
        <div className='project-container'>
            <div className='title-container'>
                <h1>Meus Projetos</h1>
                <LinkButton to='/new-project' text='Criar Projeto'/>
            </div>
            
            {message && <Message type={message.type} message={message.message} />}

            <Container customClass='start'>
                {
                    projects.length > 0 && projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            handleRemove={removeProject}
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