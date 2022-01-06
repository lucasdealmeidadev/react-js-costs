import { useParams } from 'react-router-dom';
import { useState, useEffect, memo, Fragment } from 'react';
import { Container, Loading } from '../layout';

import './Project.css';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);

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

    return (
        <Fragment>
            {project.name ? (
                <div className='project-details'>
                    <Container customClass='column'>
                        <div className='details-container'>
                            <h1>Projeto: {project.name}</h1>
                            <button onClick={toggleProjectForm} className='btn'>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className='project-info'>
                                    <p>
                                        <span>Categoria: {project.category.name}</span>
                                    </p>
                                    <p>
                                        <span>Total do orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className='project-info'>
                                    <p>detalhes do projeto</p>
                                </div>
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