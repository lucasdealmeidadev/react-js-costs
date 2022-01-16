import { parse, v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useState, useEffect, memo, Fragment } from 'react';
import { ServiceForm } from '../service';
import { ProjectForm } from '../project';
import { Container, Loading, Message } from '../layout';

import './Project.css';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
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

    const editPost = (project) => {
        //budget validation
        if (project.budget < project.cost) {
            setMessage({ type: 'error', message: 'O orçamento não pode ser menor que o custo do projeto!', hash: new Date() });
            return;
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
            setMessage({ type: 'success', message: 'Projeto atualizado com sucesso!', hash: new Date() });
        })
        .catch((error) => console.log(error));
    }

    const createService = (project) => {
        //last service
        const lastService = project.services[project.services.length - 1];
        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);
        
        //cost validation
        if (parseFloat(lastServiceCost) < 0) {
            setMessage({ type: 'error', message: 'O orçamento do serviço não pode ser menor que zero!', hash: new Date() });
            project.services.pop();
            return;
        }

        // maximum value validation
        if(newCost > parseFloat(project.budget)) {
            setMessage({ type: 'error', message: 'Orçamento ultrapassado, verifique o valor do serviço!', hash: new Date() });
            project.services.pop();
            return;
        }
        
        //add service cost to project total cost
        project.cost = newCost;

        //update project
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
            setShowServiceForm(false);
            setMessage({ type: 'success', message: 'Projeto atualizado com sucesso!', hash: new Date() });
        })
        .catch((error) => console.log(error));

    }

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm);
    }

    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm);
    }

    return (
        <Fragment>
            {project.name ? (
                <div className='project-details'>
                    <Container customClass='column'>
                        {message.hash && <Message
                            type={message.type}
                            message={message.message}
                            hash={message.hash}
                            setMessage={setMessage}
                        />}

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

                        <div className='service-form-container'>
                            <h2>Adicione um serviço:</h2>

                            <button onClick={toggleServiceForm} className='btn'>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                            </button>

                            <div className='project-info'>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText='Adicionar Serviço'
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>

                        <h1>Serviços</h1>

                        <Container customClass='start'>
                            <p>Itens do serviçofa-spin</p>
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </Fragment>
    )
}

export default memo(Project);