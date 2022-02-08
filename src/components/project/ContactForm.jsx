import { memo, useState, useEffect } from 'react';
import { Input, Textarea, SubmitButton } from '../form';
import { ErrorMessage } from '../layout';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './ProjectForm.css';

function ContactForm({ handleSubmit, btnText, contactData, resetForm }) {

    useEffect(() => {
        if (resetForm) setContact({});
    }, [resetForm]);
    
    const [contact, setContact] = useState(contactData || {});

    let schema = yup.object().shape({
        message: yup.string()
                    .trim()
                    .required('O campo mensagem é obrigatório.')
                    .min(10, 'O campo mensagem deve ter no mínimo 10 caracteres.'),
        subject: yup.string()
                    .required('O campo assunto é obrigatório.'),
        email: yup.string()
                  .trim()
                  .email('E-mail inválido.')
                  .required('O campo e-mail é obrigatório.'),
        name: yup.string()
                 .trim()
                 .required('O campo nome é obrigatório.')
                 .min(3, 'O campo nome deve ter no mínimo 3 caracteres.')
    });

    const { register, handleSubmit: handleOnSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    
    const submit = () => {
        handleSubmit(contact);
    }

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={handleOnSubmit(submit)} className='form'>
            <Input
                register={register}
                type='text'
                text='Nome completo'
                name='name'
                placeholder='Insira seu nome completo'
                handleOnChange={handleChange}
                value={contact.name || ''}
            />
            <ErrorMessage
                errors={errors}
                name='name'
            />

            <Input
                register={register}
                type='text'
                text='Melhor e-mail'
                name='email'
                placeholder='Insira seu melhor e-mail'
                handleOnChange={handleChange}
                value={contact.email || ''}
            />
            <ErrorMessage
                errors={errors}
                name='email'
            />

            <Input
                register={register}
                type='text'
                text='Assunto do contato'
                name='subject'
                placeholder='Insira o assunto desejado'
                handleOnChange={handleChange}
                value={contact.subject || ''}
            />
            <ErrorMessage
                errors={errors}
                name='subject'
            />

            <Textarea
                register={register}
                text='Mensagem de contato'
                name='message'
                placeholder='Digite sua mensagem aqui...'
                handleOnChange={handleChange}
                value={contact.message || ''}
                rows='8'
            />
            <ErrorMessage
                errors={errors}
                name='message'
            />

            <SubmitButton text={btnText} />
        </form>
    );
}

export default memo(ContactForm);