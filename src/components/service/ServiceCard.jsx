import { memo } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

import '../project/ProjectCard.css';

function ServiceCard ({ id, name, cost, description, handleRemove }) {
    const remove = (e) => {
        e.preventDefault();
        handleRemove(id, cost);
    }

    return (
        <div className='project-card'>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R${cost}
            </p>
            <p>{description}</p>
            <div className='project-card-actions'>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    );
}

export default memo(ServiceCard);