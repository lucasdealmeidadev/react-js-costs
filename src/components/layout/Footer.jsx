import { memo } from 'react';
import { FaFacebook, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

import './Footer.css';

function Footer() {
    const getCurrentYear = new Date().getFullYear();
    
    return (
        <footer className='footer'>
            <ul className='social-list'>
                <li>
                    <FaFacebook />
                </li>
                <li>
                    <FaInstagram />
                </li>
                <li>
                    <FaLinkedinIn />
                </li>
            </ul>
            <p className='copyright'>
                <span>Costs</span> &copy; {getCurrentYear} | Desenvolvido por Lucas de Almeida Monteiro (:
            </p>
        </footer>
    );
}

export default memo(Footer);