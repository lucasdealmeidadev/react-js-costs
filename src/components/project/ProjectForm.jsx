import { useState, useEffect, memo } from 'react';
import { Input, Select, SubmitButton } from '../form';
import { ErrorMessage } from '../layout';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './ProjectForm.css';

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    let schema = yup.object().shape({
        category_id: yup.string()
            .ensure()
            .nullable()
            .required('O campo categoria é obrigatório.'),
        budget: yup.string()
            .trim()
            .required('O campo orçamento é obrigatório.')
            .matches(/^[0-9]+$/, 'Somente números positivos são permitidos no campo orçamento.'),
        name: yup.string()
            .trim()
            .required('O campo nome é obrigatório.')
            .min(3, 'O campo nome deve ter no mínimo 3 caracteres.')
    });

    const { register, handleSubmit: handleOnSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data);
        })
        .catch((error) => console.log(error));
    }, []);

    const submit = () => {
        handleSubmit(project);
    }

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    }

    const handleSelect = (e) => {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        });
    }

    return (
        <form onSubmit={handleOnSubmit(submit)} className='form'>
            <Input
                register={register}
                type='text'
                text='Nome do projeto'
                name='name'
                placeholder='Insira o nome do projeto'
                handleOnChange={handleChange}
                value={project.name || ''}
            />
            <ErrorMessage
                errors={errors}
                name='name'
            />

            <Input
                register={register}
                type='number'
                text='Orçamento do projeto'
                name='budget'
                placeholder='Insira o orçamento total'
                handleOnChange={handleChange}
                value={project.budget || ''}
            />
            <ErrorMessage
                errors={errors}
                name='budget'
            />

            <Select
                register={register}
                name='category_id'
                text='Selecione a categoria'
                options={categories}
                handleOnChange={handleSelect}
                value={project.category ? project.category.id : ''}
            />
            <ErrorMessage
                errors={errors}
                name='category_id'
            />

            <SubmitButton text={btnText} />
        </form>
    );
}

export default memo(ProjectForm);