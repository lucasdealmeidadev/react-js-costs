import { useLocation } from 'react-router-dom';
import { useEffect, memo, useState } from 'react';
import { ProjectCard, ProjectSearch } from '../project';
import { Container, LinkButton, Message, Loading } from '../layout';

import './Projects.css';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [control, setControl] = useState();
    const [disableSearch, setDisableSearch] = useState();
    const [message, setMessage] = useState({});
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            const { type, message, hash } = location.state;

            setMessage({ type: type, message: message, hash: hash });
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
            setDisableSearch(data.length);
            setProjects(data);
            setRemoveLoading(true);
        })
        .catch((error) => console.log(error));
    }, []);

    const removeProject = (id) => {
        setRemoveLoading(false);

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then(() => {
            const data = projects.filter((project) => project.id !== id);
            setProjects(data);
            setDisableSearch(data.length);
            setRemoveLoading(true);
            setMessage({ type: 'success', message: 'Projeto removido com sucesso!', hash: new Date() });
        })
        .catch((error) => console.log(error));
    }

    const search = (value) => {
        setRemoveLoading(false);

        fetch(`http://localhost:5000/projects?q=${value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setControl(data.length);
            setProjects(data);
            setRemoveLoading(true);
        })
        .catch((error) => console.log(error));
    }

    return (
        <div className='project-container'>
            <div className='title-container'>
                <h1>Meus Projetos</h1>
                <LinkButton to='/new-project' text='Criar Projeto' />
            </div>

            {message.hash && <Message
                type={message.type}
                message={message.message}
                hash={message.hash}
                setMessage={setMessage}
            />}

            { disableSearch !== 0 && <ProjectSearch handleSubmit={search}/> } 

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
                {control !== 0 && removeLoading  && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}

                {control === 0 && (
                    <p>Nehum projeto foi encontrado, tente novamente!</p>
                )}
            </Container>
        </div>
    );
}

export default memo(Projects);