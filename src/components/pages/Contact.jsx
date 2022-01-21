import { memo, useState, Fragment } from 'react';
import { ContactForm } from '../project';

import './Contact.css';

function Contact() {
    const createPost = (contact) => {
        console.log(contact);
    }

    return (
        <Fragment>
            <div className='contact-container'>
                <h1>Contato</h1>
                <p>Dúvidas? Entre em contato para solicitar mais informações.</p>
                <ContactForm handleSubmit={createPost} btnText='Enviar'/>
            </div>
        </Fragment>
    );
}

export default memo(Contact);