import { memo, useState } from 'react';
import { Input, Textarea, SubmitButton } from '../form';

import './ProjectForm.css';

function ContactForm({ handleSubmit, btnText, contactData }) {
    const [contact, setContact] = useState(contactData || {});

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(contact);
    }

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={submit} className='form'>
            <Input
                type='text'
                text='Nome completo'
                name='name'
                placeholder='Insira seu nome completo'
                handleOnChange={handleChange}
                value={contact.name || ''}
            />
            <Input
                type='email'
                text='Melhor e-mail'
                name='email'
                placeholder='Insira seu melhor e-mail'
                handleOnChange={handleChange}
                value={contact.email || ''}
            />
            <Input
                type='text'
                text='Assunto do contato'
                name='subject'
                placeholder='Insira o assunto desejado'
                handleOnChange={handleChange}
                value={contact.subject || ''}
            />
            <Textarea
                text='Mensagem de contato'
                name='message'
                placeholder='Digite sua mensagem aqui...'
                handleOnChange={handleChange}
                value={contact.message || ''}
                rows='8'
            />

            <SubmitButton text={btnText} />
        </form>
    );
}

export default memo(ContactForm);