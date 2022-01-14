import { useNavigate } from 'react-router-dom';
import { memo, useState, Fragment } from 'react';
import { ProjectForm } from '../project';
import { Message } from '../layout';

import './NewProject.css';

function NewProject() {
    const [message, setMessage] = useState({});
    const navigate = useNavigate();

    const createPost = (project) => {
        // Initialize cost and services
        project.cost = 0;
        project.service = [];

        //budget validation
        if (project.budget < 0) {
            setMessage({ type: 'error', message: 'O orçamento do projeto não pode ser menor que zero!', hash: new Date() });
            return;
        }

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            navigate('/projects', {
                state: { type: 'success', message: 'Projeto criado com sucesso!', hash: new Date() }
            });
        })
        .catch((error) => console.log(error));
    }

    return (
        <Fragment>
            {message.hash && (
                <div className='newProject project-container'>
                    <Message
                        type={message.type}
                        message={message.message}
                        hash={message.hash}
                        setMessage={setMessage}
                    />
                </div>
            )}

            <div className='newProject-container'>
                <h1>Criar Projeto</h1>
                <p>Crie seu projeto para depois adicionar os serviços</p>
                <ProjectForm handleSubmit={createPost} btnText='Criar projeto' />
            </div>
        </Fragment>
    );
}

export default memo(NewProject);