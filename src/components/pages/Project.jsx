import { useParams } from 'react-router-dom';
import { useState, useEffect, memo, Fragment } from 'react';
import { ProjectForm } from '../project';
import { Container, Loading, Message } from '../layout';

import './Project.css';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data);
        })
        .catch((error) => console.log(error));
    }, [id]);

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm);
    }
    
    const editPost = (project) => {
        setMessage({});
        //budget validation
        if(project.budget < project.cost) {
            setMessage({ type: 'error', message: 'O Orçamento não pode ser menor que o custo do projeto!' });
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data);
            setShowProjectForm(false);
            setMessage({ type: 'success', message: 'Projeto atualizado com sucesso!' });
        })
        .catch((error) => console.log(error));
    }

    return (
        <Fragment>
            {project.name ? (
                <div className='project-details'>
                    <Container customClass='column'>
                        {message && <Message type={message.type} message={message.message} />}
                        
                        <div className='details-container'>
                            <h1>Projeto: {project.name}</h1>
                            <button onClick={toggleProjectForm} className='btn'>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className='project-info'>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total do orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <ProjectForm 
                                    handleSubmit={editPost} 
                                    btnText='Concluir Edição' 
                                    projectData={project}
                                />
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </Fragment>
    )
}

export default memo(Project);