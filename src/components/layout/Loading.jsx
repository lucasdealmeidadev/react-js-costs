import { memo } from 'react';

import loading from '../../img/loading.svg'
import './Loading.css';

function Loading() {
    return (
        <div className='loader-container'>
            <img className='loader' src={loading} alt='Loading'/>
        </div>
    );
}

export default memo(Loading);