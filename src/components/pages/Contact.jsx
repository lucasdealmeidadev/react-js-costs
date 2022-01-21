import { memo, useState, useEffect, Fragment } from 'react';
import { ContactForm } from '../project';
import { Message } from '../layout';

import './Contact.css';

function Contact() {
    const [message, setMessage] = useState({});
    const [removeLoading, setRemoveLoading] = useState(false);

    const createPost = (contact) => {
        setRemoveLoading(false);

        fetch(`http://localhost:5000/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setRemoveLoading(true);
                setMessage({ type: 'success', message: 'Contato enviado com sucesso!', hash: new Date() });
            })
            .catch((error) => console.log(error));
    }

    return (
        <Fragment>
            {message.hash && (
                <div className='contact project-container'>
                    <Message
                        type={message.type}
                        message={message.message}
                        hash={message.hash}
                        setMessage={setMessage}
                    />
                </div>
            )}

            <div className='contact-container'>
                <h1>Contato</h1>
                <p>Dúvidas? Entre em contato para solicitar mais informações.</p>
                
                <ContactForm handleSubmit={createPost} btnText='Enviar'/>
            </div>
        </Fragment>
    );
}

export default memo(Contact);