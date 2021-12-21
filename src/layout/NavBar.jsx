import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../layout';

import logo from '../../src/img/costs_logo.png';
import './NavBar.css';

function NavBar() {
    return (
        <div className='navbar'>
            <Container>
                <Link to='/'>
                    <img src={logo} alt='Costs' />
                </Link>
                <ul className='list'>
                    <li className='item'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='item'>
                        <Link to='/projects'>Projetos</Link>
                    </li>
                    <li className='item'>
                        <Link to='/company'>Empresa</Link>
                    </li>
                    <li className='item'>
                        <Link to='/contact'>Contato</Link>
                    </li>
                </ul>
            </Container>
        </div>
    );
}

export default memo(NavBar);