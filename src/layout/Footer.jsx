import { memo } from 'react';
import { FaFacebook, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

import './Footer.css';

function Footer() {
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
                <span>Costs</span> &copy; 2021
            </p>
        </footer>
    );
}

export default memo(Footer);