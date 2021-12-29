import { memo } from 'react';
import { ProjectForm } from '../project';

import './NewProject.css';

function NewProject() {
    return (
        <div className='newproject-container '>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm />
        </div>
    );
}

export default memo(NewProject);