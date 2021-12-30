import { memo } from 'react';
import { Input, Select, SubmitButton } from '../form';

import './ProjectForm.css';

function ProjectForm({ btnText }) {
    return (
        <form className='form'>
            <Input
                type='text'
                text='Nome do projeto'
                name='name'
                placeholder='Insira o nome do projeto'
            />
            <Input
                type='number'
                text='Orçamento do projeto'
                name='budget'
                placeholder='Insira o orçamento total'
            />
            <Select
                name='category_id'
                text='Selecione a categoria'
            />
            <SubmitButton text={btnText}/>
        </form>
    );
}

export default memo(ProjectForm);