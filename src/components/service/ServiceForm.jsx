import { memo, useState } from 'react';
import { Input, SubmitButton } from '../form';
import { ErrorMessage } from '../layout';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import '../project/ProjectForm.css';

function ServiceForm({ handleSubmit, btnText, projectData }) {
    const [service, setService] = useState({});

    let schema = yup.object().shape({
        description: yup.string()
            .trim()
            .required('O campo nome é obrigatório.')
            .min(3, 'O campo nome deve ter no mínimo 3 caracteres.'),
        cost: yup.number()
            .transform((value, originalValue) => originalValue === '' ? undefined : value)
            .typeError('Somente números positivos são permitidos no campo custo.')
            .required('O campo orçamento é obrigatório.'),
        name: yup.string()
            .trim()
            .required('O campo nome é obrigatório.')
            .min(3, 'O campo nome deve ter no mínimo 3 caracteres.')
    });

    const { register, handleSubmit: handleOnSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const submit = (e) => {
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    const handleChange = (e) => {
        setService({...service, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={handleOnSubmit(submit)} className='form'>
            <Input
                register={register}
                type='text'
                text='Nome do serviço'
                name='name'
                placeholder='Insira o nome do serviço'
                handleOnChange={handleChange}
            />
            <ErrorMessage
                errors={errors}
                name='name'
            />

            <Input
                register={register}
                type='text'
                text='Custo do serviço'
                name='cost'
                placeholder='Insira o valor total'
                handleOnChange={handleChange}
            />
            <ErrorMessage
                errors={errors}
                name='cost'
            />

            <Input
                register={register}
                type='text'
                text='Descrição do serviço'
                name='description'
                placeholder='Descreva o serviço'
                handleOnChange={handleChange}
            />
            <ErrorMessage
                errors={errors}
                name='description'
            />

            <SubmitButton text={btnText} />
        </form>
    );
}

export default memo(ServiceForm);