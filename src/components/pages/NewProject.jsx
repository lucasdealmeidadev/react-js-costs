import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { ProjectForm } from '../project';

import './NewProject.css';

function NewProject() {
    const navigate = useNavigate();
    
    const createPost = (project) => {
        // Initialize cost and services
        project.cost = 0;
        project.service = [];

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
                state: { type: 'success', message: 'Projeto criado com sucesso!' } 
            });
        })
        .catch((error) => console.log(error));
    }

    return (
        <div className='newProject-container'>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText='Criar projeto' />
        </div>
    );
}

export default memo(NewProject);