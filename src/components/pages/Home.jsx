import { memo } from 'react';

import savings from '../../img/savings.svg'
import LinkButton from '../../layout/LinkButton';
import './Home.css';

function Home() {
    return (
        <section className='home-container'>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to='/new-project' text='Criar Projeto' />
            <img src={savings} alt='Costs' />
        </section>
    );
}

export default memo(Home);